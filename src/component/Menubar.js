import React, { useContext, useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import AddButton from "./AddButton";

const Menubar = () => {
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "ZiaLink" : pathname.substr(1);

  const { user, logout } = useContext(AuthContext);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <>
      <Menu pointing secondary size="massive" color="teal">
        <Menu.Item
          name="ZiaLink"
          active
          onClick={handleItemClick}
          as={Link}
          to="/"
        />

        <Menu.Menu position="right">
          <Menu.Item
            name="createPost"
            onClick={handleItemClick}
            as={Link}
            to="/addPost"
          >
            <AddButton />
          </Menu.Item>
        </Menu.Menu>

        <Menu.Menu position="right">
          <Menu.Item name={user.username} />
          <Menu.Item name="logout" onClick={logout} />
        </Menu.Menu>
      </Menu>
    </>
  ) : (
    <>
      <Menu pointing secondary size="massive" color="teal">
        <Menu.Item
          name="ZiaLink"
          active={activeItem === "ZiaLink"}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />

        <Menu.Menu position="right">
          <Menu.Item
            name="login"
            active={activeItem === "login"}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
          <Menu.Item
            name="register"
            active={activeItem === "register"}
            onClick={handleItemClick}
            as={Link}
            to="/register"
          />
        </Menu.Menu>
      </Menu>
    </>
  );

  return menuBar;
};

export default Menubar;
