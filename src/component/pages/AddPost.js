import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { Form, Button } from "semantic-ui-react";
import Compress from "compress.js";

import { AuthContext } from "../../context/auth";
import { useForm } from "../../util/hooks";
import { FETCH_POSTS_QUERY, CREATE_POST } from "../../util/graphql";

const AddPost = (props) => {
  const { user } = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const initialState = {
    title: "",
    caption: "",
    image: "",
  };

  const compress = new Compress();
  async function fileUpload(e) {
    const file = e.target.files[0];
    try {
      const resizedImage = await compress.compress([file], {
        size: 4, // the max size in MB, defaults to 2MB
        quality: 1, // the quality of the image, max is 1,
        maxWidth: 300, // the max width of the output image, defaults to 1920px
        maxHeight: 300, // the max height of the output image, defaults to 1920px
        resize: true, // defaults to true, set false if you do not want to resize the image width and height
      });
      const img = resizedImage[0];
      const base64str = img.prefix + img.data;
      //const imgExt = img.ext;
      //const resizedFile = Compress.convertBase64ToFile(base64str, imgExt);
      setValues({ ...values, image: base64str });
    } catch (error) {
      console.log(error);
    }
  }

  const { onChange, onSubmit, values, setValues } = useForm(
    createPostCallback,
    initialState
  );

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    update(cache, result) {
      const data = cache.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      cache.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      data && props.history.push("/");
    },
    onError(err) {
      setErrors(
        err && err.graphQLErrors[0]
          ? err.graphQLErrors[0].extensions.exception.errors
          : {}
      );
    },
    variables: values,
  });

  function createPostCallback() {
    createPost();
  }

  return user ? (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1 className="page-title">Create Post</h1>
        <Form.Input
          label="Title"
          placeholder="Title"
          name="title"
          type="text"
          value={values.title}
          onChange={onChange}
        />
        <Form.Input
          label="Caption"
          placeholder="Caption"
          name="caption"
          type="text"
          value={values.caption}
          onChange={onChange}
        />
        <Form.Input
          accept="image/*"
          type="file"
          name="image"
          label="Image"
          onChange={(e) => fileUpload(e)}
        />

        <Button type="submit" color="teal">
          Create Post
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
  ) : (
    <h2>Sign in to create a post</h2>
  );
};

export default AddPost;
