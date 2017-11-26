import * as dbEntries from "../../dynamo/entries";

export default {
  Query: {
    entries: () => dbEntries.getEntries(),
    entry: (_, args) => dbEntries.getEntryById(args.id)
  },
  Mutation: {
    createEntry: (_, args) => dbEntries.createEntry(args),
    updateEntry: (_, args) => dbEntries.updateEntry(args),
    deleteEntry: (_, args) => dbEntries.deleteEntry(args)
  }
};
