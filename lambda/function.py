import json
import logging

from auth_google import AuthGoogleException
from spreadsheet import Spreadsheet, SpreadsheetException

logger = logging.getLogger()
logger.setLevel("INFO")


def get_day_filter(event):
    day_filter = None
    query_string_params = event.get("queryStringParameters", {})

    if query_string_params:
        day_filter = query_string_params.get("day")

    # This will evaluates to true only running the container locally
    if "day" in event:
        day_filter = event.get("day")

    return day_filter


def handler(event, context):
    day_filter = get_day_filter(event)

    try:
        spreadsheet = Spreadsheet()
        response = spreadsheet.get_day_values(day_filter)
        all_teams = spreadsheet.get_all_available_teams()
        logger.info(f"Response: {response}")

        return {
            "statusCode": 200,
            "body": json.dumps({"game": response, "all_teams": all_teams}),
        }
    except (AuthGoogleException, SpreadsheetException) as error:
        logger.error(error)
        return {"statusCode": 400, "body": str(error) or "Failed to get info"}
    except Exception as error:
        logger.error(error)
        return {"statusCode": 500, "body": "Failed to get info"}
