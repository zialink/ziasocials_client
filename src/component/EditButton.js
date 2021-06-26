import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { Button, Icon, Confirm } from "semantic-ui-react";
import { DELETE_POST_MUTATION, FETCH_POSTS_QUERY } from "../util/graphql";

function EditButton({ postId, onDelete }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(cache) {
      setConfirmOpen(false);
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

      if (onDelete) onDelete();
    },
    variables: { postId },
  });
  return (
    <>
      <Button
        color="teal"
        className="editButton"
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name="edit" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
      ></Confirm>
    </>
  );
}

export default EditButton;
