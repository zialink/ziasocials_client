import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Grid } from "semantic-ui-react";

import PostCard from "../PostCard";

const Home = () => {
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);
  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {error && <p>Error...</p>}
        {loading ? (
          <h1>Loading Posts...</h1>
        ) : (
          data.getPosts &&
          data.getPosts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
};

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
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

export default Home;
