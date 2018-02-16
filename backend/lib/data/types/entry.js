export default `
  type Entry {
    id: ID!
    userId: String
    content: String
  }

  type Query {
    entries: [Entry]
    entry(id: ID!): Entry
  }

  type Mutation {
    createEntry(
      userId: String
      content: String!
    ): Entry
    updateEntry(
      id: ID!
      content: String!
    ): Entry
    deleteEntry(
      id: ID!
    ): Entry
  }
`;
