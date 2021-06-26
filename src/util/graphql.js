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
        id
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

export const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      title
      caption
      image
      username
      createdAt
      likeCount
      commentCount
      likes {
        id
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

export const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;
