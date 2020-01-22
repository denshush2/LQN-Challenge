import React from "react";
import { ApolloProvider } from "@apollo/client";

import client from "./apollo";

import "./App.css";
import "antd/dist/antd.css";

import Routes from "./routes";

const App = () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

export default App;
