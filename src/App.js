import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";

import Home from "./component/pages/Home";
import Login from "./component/pages/Login";
import Register from "./component/pages/Register";
import Menubar from "./component/Menubar";
import AddPost from "./component/pages/AddPost";
import SinglePost from "./component/pages/SinglePost";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <Menubar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/Login" component={Login} />
          <AuthRoute exact path="/Register" component={Register} />
          <Route exact path="/AddPost" component={AddPost} />
          <Route exact path="/posts/:postId" component={SinglePost} />
        </Container>
      </Router>
    </AuthProvider>
  );
};

export default App;
