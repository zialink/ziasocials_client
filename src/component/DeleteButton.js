import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { Button, Icon, Confirm } from "semantic-ui-react";
import {
  DELETE_POST_MUTATION,
  FETCH_POSTS_QUERY,
  DELETE_COMMENT_MUTATION,
} from "../util/graphql";

function DeleteButton({ postId, commentId, onDelete }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrComment] = useMutation(mutation, {
    update(cache) {
      setConfirmOpen(false);
      if (!commentId) {
        const data = cache.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        //data.getPosts = data.getPosts.filter((p) => p.id !== postId);
        cache.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: {
            getPosts: data.getPosts.filter((p) => p.id !== postId),
          },
        });
      }

      if (onDelete) onDelete();
    },
    variables: { postId, commentId },
  });
  return (
    <>
      <Button
        color="red"
        className="deleteButton"
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrComment}
      ></Confirm>
    </>
  );
}

export default DeleteButton;
