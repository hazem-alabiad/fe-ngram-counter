import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import Animated from "./Animated";
import NgramForm from "./NgramForm";

// ####################################################
// ###############    Main Component    ###############
// ####################################################
const HomeNotAnimated = ({ setNgramCounts }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Grid item xs={10}>
        <NgramForm setNgramCounts={setNgramCounts} />
      </Grid>
    </Grid>
  );
};

const Home = ({ setNgramCounts }) => {
  // ###############    State   ###############
  return (
    <Animated comp={<HomeNotAnimated setNgramCounts={setNgramCounts} />} />
  );
};

export default Home;

Home.propTypes = {
  setNgramCounts: PropTypes.func,
};
