import * as dbEntries from "../../dynamo/entries";

export default {
  Query: {
    entries: (_, args, { userId }) => dbEntries.getEntries(userId),
    entry: (_, { id }, { userId }) => dbEntries.getEntryById(id, userId)
  },
  Mutation: {
    createEntry: (_, args, { userId }) => dbEntries.createEntry(args, userId),
    updateEntry: (_, args, { userId }) => dbEntries.updateEntry(args, userId),
    deleteEntry: (_, args, { userId }) => dbEntries.deleteEntry(args, userId)
  }
};
