import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition } from "semantic-ui-react";

import PostCard from "../PostCard";
import { FETCH_POSTS_QUERY } from "../../util/graphql";
import { AuthContext } from "../../context/auth";

const Home = () => {
  const [postData, setPostData] = useState({});
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);
  const { user } = useContext(AuthContext);

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
          <h2>Loading Posts...</h2>
        ) : (
          <Transition.Group>
            {postData.getPosts &&
              postData.getPosts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} user={user} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
