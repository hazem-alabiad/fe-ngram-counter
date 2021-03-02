import { Router } from "@reach/router";
import React from "react";
import Main from "./components/Main";
import { MY_ROUTERS } from "./utils/constants";

const App = () => {
  return (
    <Router>
      <Main path={MY_ROUTERS.home} />
    </Router>
  );
};

export default App;
