import React from "react";
import { Card, Icon, Label, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

import LikeButton from "./LikeButton";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import ShowPopup from "./ShowPopup";

const PostCard = ({
  post: {
    title,
    caption,
    image,
    createdAt,
    id,
    username,
    likeCount,
    commentCount,
    likes,
    comments,
  },
  user,
  onDelete,
  page,
}) => {
  return (
    <Card fluid>
      <Card.Content as={Link} to={`/posts/${id}`}>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>
          <Image src={image} fluid className="image-max-height" />

          <div style={{ marginTop: 20 }}>
            <h3 style={{ color: "teal" }}>{title}</h3>
            {caption}
          </div>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton post={{ id, likes, likeCount }} user={user} />
        <ShowPopup content="Comment on post">
          <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
            <Button color="teal" basic>
              <Icon name="comments" />
            </Button>
            <Label basic color="blue" pointing="left">
              {commentCount}
            </Label>
          </Button>
        </ShowPopup>

        {user && user.username === username && (
          <>
            <DeleteButton postId={id} onDelete={onDelete} />
            <EditButton postId={id} />
          </>
        )}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
