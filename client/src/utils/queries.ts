import { gql } from '@apollo/client';

// GraphQL Query to Fetch Logged-in User Data
export const GET_ME = gql`
  query Me {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        title
        description
        image
        link
      }
    }
  }
`;
