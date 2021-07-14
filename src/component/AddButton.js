import React from "react";
import { Button } from "semantic-ui-react";
import { useRouteMatch } from "react-router";

const AddButton = () => {
  let param = useRouteMatch("/posts/:postId");
  let param1 = useRouteMatch("/addPost");
  if (param) {
    var { postId } = param.params;
  }

  return (
    !postId &&
    !param1 && (
      <Button animated="fade" color="teal">
        <Button.Content visible>Add Post</Button.Content>
        <Button.Content hidden>+</Button.Content>
      </Button>
    )
  );
};

export default AddButton;
