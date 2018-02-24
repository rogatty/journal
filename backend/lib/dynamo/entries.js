import * as db from "./dynamo";
import * as attachments from "./attachments";

const TableName = "entries";

const idGlue = "::";

function decorateEntryWithId(userId, createDate) {
  return entry => {
    let date = entry.createDate;
    if (!date) {
      date = createDate;
    }

    entry.id = `${userId}${idGlue}${date}`;

    return entry;
  };
}

export function getEntries(userId) {
  const params = {
    TableName,
    ProjectionExpression: ["createDate", "content", "hasAttachments"],
    FilterExpression: "userId = :userId",
    ExpressionAttributeValues: { ":userId": userId }
    // TODO order by
  };

  // TODO Use query
  return db
    .scan(params)
    .then(entries => {
      entries.forEach(decorateEntryWithId(userId));

      return entries;
    })
    .then(entries => {
      // TODO use BatchGetItem instead
      const promises = [];

      entries.forEach(entry => {
        if (entry.hasAttachments) {
          promises.push(
            attachments.getAttachments(entry.id).then(attachments => {
              entry.attachments = attachments;
            })
          );
        }
      });

      return Promise.all(promises).then(() => {
        return entries;
      });
    });
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
  const createDate = new Date().toISOString();
  const hasAttachments = args.attachments && args.attachments.length;

  const params = {
    TableName,
    Item: {
      userId: userId,
      createDate,
      content: args.content,
      hasAttachments
    }
  };

  return db
    .createItem(params)
    .then(decorateEntryWithId(userId, createDate))
    .then(entry => {
      if (args.attachments && args.attachments.length) {
        // TODO use BatchWriteItem
        attachments.createAttachment(entry.id, args.attachments[0]);
      }
      return entry;
    });
}

export function updateEntry(args, userId) {
  const createDate = args.id.split(idGlue)[1];

  const params = {
    TableName,
    Key: {
      userId,
      createDate
    },
    ExpressionAttributeValues: {
      ":content": args.content
    },
    UpdateExpression: "SET content = :content",
    ReturnValues: "ALL_NEW"
  };

  return db.updateItem(params, args);
}

export function deleteEntry(args, userId) {
  const createDate = args.id.split(idGlue)[1];

  const params = {
    TableName,
    Key: {
      userId,
      createDate
    }
  };

  // TODO delete attachments
  return db.deleteItem(params, args);
}
