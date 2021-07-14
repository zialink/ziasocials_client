import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";

import ShowPopup from "./ShowPopup";

function EditButton({ postId }) {
  //const [id, setId] = useState(null);

  //useEffect(() => setId(postId), [postId]);
  return (
    <>
      <ShowPopup content="Edit Post">
        <Button
          color="teal"
          className="editButton"
          as={Link}
          to={{ pathname: "/addPost", state: { postId: postId } }}
        >
          <Icon name="edit" style={{ margin: 0 }} />
        </Button>
      </ShowPopup>
    </>
  );
}

export default EditButton;
