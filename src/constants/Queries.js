import gql from "graphql-tag";

export const entriesQuery = gql`
  query JournalEntries {
    entries {
      id
      content
      attachments {
        url
        position
      }
    }
  }
`;
