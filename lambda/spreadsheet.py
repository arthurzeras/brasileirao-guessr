import logging

from auth_google import AuthGoogle

SPREADSHEET_SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]


class Spreadsheet:
    access_token = None
    logger = logging.getLogger()

    def __init__(self):
        self.logger.setLevel("INFO")
        self.get_access_token()

    def get_access_token(self):
        auth_google = AuthGoogle(SPREADSHEET_SCOPES)
        self.access_token = auth_google.access_token
