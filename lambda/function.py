import logging

from spreadsheet import Spreadsheet
from auth_google import AuthGoogleException

logger = logging.getLogger()
logger.setLevel("INFO")


def handler(event, context):
    try:
        spreadsheet = Spreadsheet()

        return {
            "statusCode": 200,
            "body": f"token: {spreadsheet.access_token}",
        }
    except AuthGoogleException as error:
        logger.error(error)
        return {"statusCode": 400, "body": str(error) or "Failed to get info"}
    except Exception as error:
        logger.error(error)
        return {"statusCode": 500, "body": "Failed to get info"}
