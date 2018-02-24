export default `
  type Entry {
    # Combined User ID and Create Date (Primary Key)
    id: ID!
    createDate: String!
    content: String
    attachments: [Attachment]
  }
  
  type Attachment {
    position: Int!
    url: String!
  }
  
  input AttachmentInput {
    position: Int!
    url: String!
  }

  type Query {
    entries: [Entry]
    entry(id: ID!): Entry
  }

  type Mutation {
    createEntry(
      content: String!
      attachments: [AttachmentInput]
    ): Entry
    updateEntry(
      id: ID!
      content: String!
      attachments: [AttachmentInput]
    ): Entry
    deleteEntry(
      id: ID!
    ): Entry
  }
`;
