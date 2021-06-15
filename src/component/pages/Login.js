import React, { useContext, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Form, Button } from "semantic-ui-react";

import { AuthContext } from "../../context/auth";
import { useForm } from "../../util/hooks";

const Login = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const initialState = {
    username: "",
    password: "",
  };

  const { onChange, onSubmit, values } = useForm(loginUser, initialState);

  const [login_User, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.exception.errors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUser() {
    login_User();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1 className="page-title">Login</h1>

        <Form.Input
          label="Username"
          placeholder="Username or Email"
          name="username"
          type="text"
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      name
      username
      email
      createdAt
      token
    }
  }
`;
export default Login;
