export default `
  type Entry {
    id: ID!
    content: String
  }

  type Query {
    entries: [Entry]
    entry(id: ID!): Entry
  }

  type Mutation {
    createEntry(
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
