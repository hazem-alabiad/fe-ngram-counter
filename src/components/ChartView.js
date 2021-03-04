import { Animation } from "@devexpress/dx-react-chart";
import {
  ArgumentAxis,
  BarSeries,
  Chart,
  Title,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import Paper from "@material-ui/core/Paper";
import * as React from "react";

const ChartView = ({ data, valueField, argumentField, title }) => {
  console.log(data);
  return (
    <Paper>
      <Chart data={data}>
        <ArgumentAxis />
        <ValueAxis max={15} />
        <BarSeries valueField={valueField} argumentField={argumentField} />
        <Title text={title} />
        <Animation />
      </Chart>
    </Paper>
  );
};

export default ChartView;
