import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Grid } from "semantic-ui-react";

import PostCard from "../PostCard";
import { FETCH_POSTS_QUERY } from "../../util/graphql";

const Home = () => {
  const [postData, setPostData] = useState({});
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);

  useEffect(() => {
    data && setPostData(data);
  }, [data]);
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
          postData.getPosts &&
          postData.getPosts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
