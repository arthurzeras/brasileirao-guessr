import json
import logging

from auth_google import AuthGoogleException
from spreadsheet import Spreadsheet, SpreadsheetException

logger = logging.getLogger()
logger.setLevel("INFO")


def get_filter(event, filter_name):
    query_filter = None
    query_string_params = event.get("queryStringParameters", {})

    if query_string_params:
        query_filter = query_string_params.get(filter_name)

    # This will evaluates to true only running the container locally
    if filter_name in event:
        query_filter = event.get(filter_name)

    return query_filter


def handler(event, context):
    day_filter = get_filter(event, "day")
    number_filter = get_filter(event, "number")

    try:
        spreadsheet = Spreadsheet()
        response = spreadsheet.get_day_values(day_filter, number_filter)
        all_teams = spreadsheet.get_all_available_teams()
        logger.info(f"Response: {response}")

        return {
            "statusCode": 200,
            "body": json.dumps({"game": response, "all_teams": all_teams}),
        }
    except (AuthGoogleException, SpreadsheetException) as error:
        logger.error(error)
        return {
            "statusCode": 400,
            "body": json.dumps(
                {"message": str(error) or "Failed to get daily game"}
            ),
        }
    except Exception as error:
        logger.error(error)
        return {
            "statusCode": 500,
            "body": json.dumps({"message": "Failed to get daily game"}),
        }
