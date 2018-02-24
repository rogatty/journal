import gql from "graphql-tag";

export const createEntryMutation = gql`
  mutation createEntry($content: String!, $attachments: [AttachmentInput]) {
    createEntry(content: $content, attachments: $attachments) {
      id
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
    }
  }
`;
