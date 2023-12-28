import os
import logging
from datetime import datetime, timedelta

import requests

import constants
from auth_google import AuthGoogle

SPREADSHEET_ID = os.getenv("SPREADSHEET_ID")

GOOGLE_SPREADSHEET_API_URL = "https://sheets.googleapis.com/v4/spreadsheets"
SPREADSHEET_SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]


class SpreadsheetException(Exception):
    pass


class Spreadsheet:
    __access_token = None
    logger = logging.getLogger()

    def __init__(self):
        self.logger.setLevel("INFO")
        self.__get_access_token()

    def __get_access_token(self):
        auth_google = AuthGoogle(SPREADSHEET_SCOPES)
        self.__access_token = auth_google.access_token

    def __format_values(self, spreadsheet_data):
        values_formatted = {}

        for value in spreadsheet_data.get("values")[1:]:
            values_formatted[value[constants.SHEET_GAME_DATE_COLUMN]] = {
                "team": value[constants.SHEET_TEAM_NAME_COLUMN],
                "year": value[constants.SHEET_LEAGUE_YEAR_COLUMN],
                "state": value[constants.SHEET_TEAM_STATE_COLUMN],
                "position": value[constants.SHEET_TEAM_POSITION_COLUMN],
                "foundation_year": value[
                    constants.SHEET_TEAM_FOUNDATION_COLUMN
                ],
                "top_scorer": {
                    "name": value[constants.SHEET_TOP_SCORER_NAME_COLUMN],
                    "goals": value[constants.SHEET_TOP_SCORER_GOALS_COLUMN],
                },
                "top_win": {
                    "goals_scored": value[
                        constants.SHEET_BEST_WIN_GOALS_SCORED_COLUMN
                    ],
                    "goals_conceded": value[
                        constants.SHEET_BEST_WIN_GOALS_CONCEDED_COLUMN
                    ],
                    "against_to": value[
                        constants.SHEET_BEST_WIN_AGAINST_TO_COLUMN
                    ],
                },
                "last_league_postion": {
                    "position": value[
                        constants.SHEET_TEAM_LAST_LEAGUE_POSITION_POSITION_COLUMN
                    ],
                    "division": value[
                        constants.SHEET_TEAM_LAST_LEAGUE_POSITION_DIVISION_COLUMN
                    ],
                },
            }

        return values_formatted

    def get_sheet_content(self):
        """
        Return all lines (daily games) from spreadsheet
        """
        response = requests.get(
            f"{GOOGLE_SPREADSHEET_API_URL}/{SPREADSHEET_ID}/values/2024!A:M",
            headers={"Authorization": f"Bearer {self.__access_token}"},
        )

        if response.status_code != 200:
            self.logger.error("Failed to get content from Google Sheets")
            self.logger.error(response.text)
            raise SpreadsheetException()

        return self.__format_values(response.json())

    def get_day_values(self, day):
        """
        Get daily game filtered by day expression in format DD/MM/YYYY
        """
        content = self.get_sheet_content()

        if not len(content.keys()):
            raise SpreadsheetException("No values found")

        if not day:
            # Convert to America/SaoPaulo timezone
            today = datetime.now() - timedelta(hours=3)
            day = today.strftime("%d/%m/%Y")

        if day not in content.keys():
            raise SpreadsheetException("Invalid day")

        return {"day": day, **content.get(day)}

    def save_to_file(self, file_path, content):
        open(file_path or "data.json", "w").write(content)
