import json
import os
import urllib.request
from datetime import datetime, timezone, timedelta
import boto3
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(os.environ["TABLE_NAME"])

ALLOWED_ORIGINS = [
    "https://sanghyun-jun.cloud",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
]


def get_cors_origin(event):
    origin = (event.get("headers") or {}).get("origin", "")
    if origin in ALLOWED_ORIGINS:
        return origin
    return ALLOWED_ORIGINS[0]


def handler(event, context):
    origin = get_cors_origin(event)
    cors_headers = {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("requestContext", {}).get("http", {}).get("method") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    resp = table.update_item(
        Key={"page_id": "sanghyun-jun.cloud"},
        UpdateExpression="ADD visit_count :inc",
        ExpressionAttributeValues={":inc": 1},
        ReturnValues="UPDATED_NEW",
    )
    count = int(resp["Attributes"]["visit_count"])

    kst = datetime.now(timezone(timedelta(hours=9)))
    message = {
        "content": "\U0001f514 **New Visitor!**\n\U0001f464 Total: **{count}**\n\U0001f550 {time} KST".format(
            count=f"{count:,}",
            time=kst.strftime("%Y-%m-%d %H:%M"),
        )
    }
    webhook_url = os.environ.get("DISCORD_WEBHOOK_URL", "")
    if webhook_url:
        try:
            req = urllib.request.Request(
                webhook_url,
                data=json.dumps(message).encode("utf-8"),
                headers={
                    "Content-Type": "application/json",
                    "User-Agent": "DiscordBot (https://sanghyun-jun.cloud, 1.0)",
                },
                method="POST",
            )
            r = urllib.request.urlopen(req, timeout=5)
            logger.info("Discord webhook sent, status: %s", r.status)
        except Exception as e:
            logger.error("Discord webhook failed: %s", str(e))

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"count": count}),
    }
