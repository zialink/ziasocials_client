import React from "react";
import { Popup } from "semantic-ui-react";

function ShowPopup({ content, children }) {
  return <Popup content={content} trigger={children} inverted />;
}

export default ShowPopup;
