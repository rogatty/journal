import * as entries from "../dynamo/entries";

export default {
  Query: {
    entries: (_, args, { userId }) => entries.getEntries(userId),
    entry: (_, { id }, { userId }) => entries.getEntryById(id, userId)
  },
  Mutation: {
    createEntry: (_, args, { userId }) => entries.createEntry(args, userId),
    updateEntry: (_, args, { userId }) => entries.updateEntry(args, userId),
    deleteEntry: (_, args, { userId }) => entries.deleteEntry(args, userId)
  }
};
