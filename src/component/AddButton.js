import React from "react";
import { Button } from "semantic-ui-react";
import { useRouteMatch } from "react-router";

const AddButton = () => {
  let param = useRouteMatch("/posts/:postId");
  if (param) {
    var { postId } = param.params;
  }

  return (
    !postId && (
      <Button animated="fade" color="teal">
        <Button.Content visible>Add Post</Button.Content>
        <Button.Content hidden>+</Button.Content>
      </Button>
    )
  );
};

export default AddButton;
