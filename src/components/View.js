import {
  AppBar,
  Box,
  Button,
  makeStyles,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import ChartView from "./ChartView";
import TableView from "./TableView";
import HomeIcon from "@material-ui/icons/Home";
import { navigate } from "@reach/router";
import { _ROUTERS } from "../constants/routes";

// ####################################################
// ###################    Helpers   ###################
// ####################################################
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

// ####################################################
// ###############    Main Component    ###############
// ####################################################
const View = ({ ngramCounts }) => {
  // ###############    State   ###############
  const [value, setValue] = useState(0);
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    window.onbeforeunload = function () {
      return true;
    };
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  return (
    <Container>
      <Typography variant="h3" className="text-center my-3" component="h2">
        Results
      </Typography>
      <Box textAlign="center" marginBottom={3}>
        <Button
          variant="contained"
          color="default"
          startIcon={<HomeIcon />}
          onClick={() => navigate(_ROUTERS.home)}
        >
          Go Home
        </Button>
      </Box>
      <div className={classes.root}>
        <AppBar position="relative" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Table View" {...a11yProps(0)} />
            <Tab label="Chart View" {...a11yProps(0)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <TableView
            data={ngramCounts}
            col_1_name="N-Gram"
            col_2_name="Count"
            title="Ngram Counter"
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ChartView
            data={ngramCounts}
            argumentField="ngram"
            valueField="count"
            title="Ngram Counter"
          />
        </TabPanel>
      </div>
    </Container>
  );
};

export default View;

View.propTypes = {
  ngramCounts: PropTypes.array,
};
