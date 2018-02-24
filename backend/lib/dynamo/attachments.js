import * as db from "./dynamo";

const TableName = "attachments";

export function getAttachments(entryId) {
  const params = {
    TableName,
    ProjectionExpression: ["#url", "#position"],
    FilterExpression: "entryId = :entryId",
    ExpressionAttributeValues: { ":entryId": entryId },
    ExpressionAttributeNames: {
      // Reserved words
      "#position": "position",
      "#url": "url"
    }
  };

  // TODO Use query
  return db.scan(params);
}

export function createAttachment(entryId, { position, url }) {
  const params = {
    TableName,
    Item: {
      entryId,
      position,
      url
    }
  };

  return db.createItem(params);
}
