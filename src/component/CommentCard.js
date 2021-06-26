import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import moment from "moment";
import { Card, Form } from "semantic-ui-react";

import DeleteButton from "./DeleteButton";
import { CREATE_COMMENT_MUTATION } from "../util/graphql";

function CommentCard({ comments, user, postId }) {
  const [userComment, setUserComment] = useState("");

  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    update() {
      setUserComment("");
    },
    variables: {
      postId,
      body: userComment,
    },
  });

  return (
    <div>
      {user && (
        <Card fluid>
          <Card.Content>
            <p>Post a Comment</p>
            <Form>
              <div className="ui action input fluid">
                <input
                  type="text"
                  placeholder="Comment"
                  name="comment"
                  value={userComment}
                  onChange={(event) => setUserComment(event.target.value)}
                />
                <button
                  type="submit"
                  className="ui button teal"
                  disabled={userComment.trim() === ""}
                  onClick={createComment}
                >
                  Submit
                </button>
              </div>
            </Form>
          </Card.Content>
        </Card>
      )}
      {comments &&
        comments.map((comment) => {
          return (
            <Card fluid key={comment.id}>
              <Card.Content>
                {user && user.username === comment.username && (
                  <DeleteButton postId={postId} commentId={comment.id} />
                )}
                <Card.Header>{comment.username}</Card.Header>
                <Card.Meta>{moment(comment.createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>{comment.body}</Card.Description>
              </Card.Content>
            </Card>
          );
        })}
    </div>
  );
}

export default CommentCard;
