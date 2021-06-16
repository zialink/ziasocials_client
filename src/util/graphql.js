import { gql } from "@apollo/client";

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      title
      caption
      image
      createdAt
      username
      likeCount
      commentCount
      likes {
        username
      }
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($title: String!, $caption: String!, $image: String!) {
    createPost(title: $title, caption: $caption, image: $image) {
      id
      title
      caption
      createdAt
      username
      likeCount
      commentCount
      likes {
        username
      }
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
