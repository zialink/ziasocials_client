import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition } from "semantic-ui-react";

import PostCard from "../PostCard";
import { FETCH_POST_QUERY } from "../../util/graphql";
import { AuthContext } from "../../context/auth";
import CommentCard from "../CommentCard";

function SinglePost(props) {
  const { postId } = props.match.params;
  const [postData, setPostData] = useState({});
  const { user } = useContext(AuthContext);

  const { data: getPost } = useQuery(FETCH_POST_QUERY, {
    variables: { postId },
  });

  useEffect(() => {
    getPost && setPostData(getPost);
  }, [getPost]);

  const goHome = () => {
    props.history.push("/");
  };

  return (
    <Grid>
      <Grid.Row centered>
        <Transition animation="fade up" duration={500}>
          <Grid.Column centered style={{ margin: 20 }}>
            {postData.getPost && (
              <>
                <PostCard
                  post={postData.getPost}
                  user={user}
                  onDelete={goHome}
                  page="singlePost"
                />
                <CommentCard
                  comments={postData.getPost.comments}
                  user={user}
                  postId={postData.getPost.id}
                />
              </>
            )}
          </Grid.Column>
        </Transition>
      </Grid.Row>
    </Grid>
  );
}

export default SinglePost;
