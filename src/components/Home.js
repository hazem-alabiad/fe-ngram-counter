import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import NgramForm from "./NgramForm";

// ####################################################
// ###############    Main Component    ###############
// ####################################################
const Home = ({ setNgramCounts }) => {
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

export default Home;

Home.propTypes = {
  setNgramCounts: PropTypes.func,
};
