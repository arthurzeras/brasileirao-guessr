import os
import json
import logging

import boto3
import requests
from google.oauth2 import service_account
from botocore.exceptions import ClientError

AWS_REGION = os.getenv("AWS_REGION") or "us-east-1"
SERVICE_ACCOUNT_SECRET_NAME = os.getenv("SERVICE_ACCOUNT_SECRET_NAME")

GOOGLE_OAUTH2_JWT_URL = "https://oauth2.googleapis.com/token"


class AuthGoogleException(Exception):
    pass


class AuthGoogle:
    """
    This class is responsible to get service account from secrets manager and
    generate an access token (JWT) to use in any API integrations of
    GCP resources
    """

    access_token = None
    __grant_scopes = []
    __google_service_account = {}

    logger = logging.getLogger()

    def __init__(self, scopes):
        self.__grant_scopes = scopes
        self.__get_google_service_account()
        self.__get_token()
        self.logger.setLevel("INFO")

    def __get_google_service_account(self):
        session = boto3.session.Session()

        try:
            client = session.client(
                service_name="secretsmanager", region_name=AWS_REGION
            )
            secret_response = client.get_secret_value(
                SecretId=SERVICE_ACCOUNT_SECRET_NAME
            )
        except ClientError as error:
            self.logger.error(
                "Failed to get Google Service Account on Secrets Manager"
            )
            self.logger.error(error)
            raise AuthGoogleException()

        self.__google_service_account = secret_response["SecretString"]

    def __get_grant_token(self):
        credential = service_account.Credentials.from_service_account_info(
            info=json.loads(self.__google_service_account),
            scopes=self.__grant_scopes,
        )

        grant_token = credential._make_authorization_grant_assertion().decode(
            "utf8"
        )

        return grant_token

    def __get_token(self):
        grant_token = self.__get_grant_token()

        payload = (
            "grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer"
            f"&assertion={grant_token}"
        )

        headers = {"Content-Type": "application/x-www-form-urlencoded"}
        response = requests.post(
            GOOGLE_OAUTH2_JWT_URL, headers=headers, data=payload
        )

        if response.status_code != 200:
            self.logger.error("Failed to get Google OAuth2 token")
            self.logger.error(response.text)
            raise AuthGoogleException()

        self.access_token = response.json()["access_token"]
