import uuid from "uuid/v1";
import * as db from "./dynamo";

const TableName = "entries";

export function getEntries() {
  const params = {
    TableName,
    AttributesToGet: ["id", "content"]
  };

  return db.scan(params);
}

export function getEntryById(id) {
  const params = {
    TableName,
    Key: {
      id
    }
  };

  return db.get(params);
}

export function createEntry(args) {
  const params = {
    TableName,
    Item: {
      id: uuid(),
      content: args.content
    }
  };

  return db.createItem(params);
}

export function updateEntry(args) {
  const params = {
    TableName: "entries",
    Key: {
      id: args.id
    },
    ExpressionAttributeValues: {
      ":content": args.content
    },
    UpdateExpression: "SET content = :content",
    ReturnValues: "ALL_NEW"
  };

  return db.updateItem(params, args);
}

export function deleteEntry(args) {
  const params = {
    TableName,
    Key: {
      id: args.id
    }
  };

  return db.deleteItem(params, args);
}
