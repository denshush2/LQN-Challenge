import React from "react";

import Header from "../../components/header";
import CardContainer from "../../containers/cardContainer";
import "./style.scss";

const HomePage = () => (
  <div className="page-home">
    <Header />
    <CardContainer />
  </div>
);

export default HomePage;
