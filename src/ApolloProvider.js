import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import App from "./App";

const URI = "http://localhost:4000";

const client = new ApolloClient({
  uri: URI,
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
