import { Grid } from "@material-ui/core";
import React from "react";
import NgramForm from "./NgramForm";

const Main = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Grid item xs={10}>
        <NgramForm />
      </Grid>
    </Grid>
  );
};

export default Main;
