import {
  ChevronLeft,
  ChevronRight,
  Clear,
  Edit,
  FirstPage,
  LastPage,
  Search
} from "@material-ui/icons";
import MaterialTable from "material-table";
import PropTypes from "prop-types";
import React, { forwardRef, useEffect } from "react";

const tableIcons = {
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
};

// ####################################################
// ###############    Main Component    ###############
// ####################################################
const TableView = ({ data, col_1_name, col_2_name, title }) => {
  useEffect(() => {
    window.onbeforeunload = function () {
      return true;
    };
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  return (
    <MaterialTable
      title={title}
      data={data}
      icons={tableIcons}
      columns={[
        { title: `${col_1_name}`, field: "ngram" },
        { title: `${col_2_name}`, field: "count" },
      ]}
    />
  );
};

export default TableView;

TableView.propTypes = {
  data: PropTypes.array,
  col_1_name: PropTypes.string,
  col_2_name: PropTypes.string,
};
