import uuid from "uuid/v1";
import * as db from "./dynamo";

const TableName = "entries";

export function getEntries(userId) {
  const params = {
    TableName,
    ProjectionExpression: ["id", "content"],
    FilterExpression: "userId = :userId",
    ExpressionAttributeValues: { ":userId": userId }
  };

  return db.scan(params);
}

export function getEntryById(id, userId) {
  const params = {
    TableName,
    Key: {
      id
    },
    FilterExpression: "userId = :userId",
    ExpressionAttributeValues: { ":userId": userId }
  };

  return db.get(params);
}

export function createEntry(args, userId) {
  const params = {
    TableName,
    Item: {
      id: uuid(),
      userId: userId,
      content: args.content
    }
  };

  return db.createItem(params);
}

export function updateEntry(args, userId) {
  const params = {
    TableName: "entries",
    Key: {
      id: args.id
    },
    ConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":content": args.content,
      ":userId": userId
    },
    UpdateExpression: "SET content = :content",
    ReturnValues: "ALL_NEW"
  };

  return db.updateItem(params, args);
}

export function deleteEntry(args, userId) {
  const params = {
    TableName,
    Key: {
      id: args.id
    },
    ConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": userId
    }
  };

  return db.deleteItem(params, args);
}
