import React, { Fragment } from "react";

import Hero from "../components/Hero";
import Content from "../components/Content";
import MainComponent from "../components/login-flow/MainComponent";

const Home = (props) => {
  return props?.response.AccessToken ? (
    <MainComponent {...props} />
  ) : (
    <Fragment>
      <Hero />
      <hr />
      <Content />
    </Fragment>
  );
};

export default Home;
