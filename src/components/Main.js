import { Router } from "@reach/router";
import React, { useState } from "react";
import { _ROUTERS } from "../constants/routes";
import Home from "./Home";
import View from "./View";

// ####################################################
// ###############    Main Component    ###############
// ####################################################
const Main = () => {
  // ###############    State   ###############
  const [ngramCounts, setNgramCounts] = useState([]);

  return (
    <Router>
      <Home path={_ROUTERS.home} setNgramCounts={setNgramCounts} />
      <View path={_ROUTERS.view} ngramCounts={ngramCounts} />
    </Router>
  );
};

export default Main;
