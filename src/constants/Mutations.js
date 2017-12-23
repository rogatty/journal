import gql from "graphql-tag";

export const createEntryMutation = gql`
  mutation createEntry($content: String!) {
    createEntry(content: $content) {
      id
      content
    }
  }
`;

export const deleteEntryMutation = gql`
  mutation deleteEntry($id: ID!) {
    deleteEntry(id: $id) {
      id
    }
  }
`;

export const updateEntryMutation = gql`
  mutation updateEntry($id: ID!, $content: String!) {
    updateEntry(id: $id, content: $content) {
      id
      content
    }
  }
`;
