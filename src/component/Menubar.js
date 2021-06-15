import React, { useContext, useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";

const Menubar = () => {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "ZiaChat" : pathname.substr(1);

  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <div>
      <Menu pointing secondary size="massive" color="teal">
        <Menu.Item
          name="ZiaChat"
          active
          onClick={handleItemClick}
          as={Link}
          to="/"
        />

        <Menu.Menu position="right">
          <Menu.Item name={user.username} />
          <Menu.Item name="logout" onClick={logout} />
        </Menu.Menu>
      </Menu>
    </div>
  ) : (
    <div>
      <Menu pointing secondary size="massive" color="teal">
        <Menu.Item
          name="ZiaChat"
          active={activeItem === "ZiaChat"}
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
    </div>
  );

  return menuBar;
};

export default Menubar;
