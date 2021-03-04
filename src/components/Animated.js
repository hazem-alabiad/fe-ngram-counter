import React from "react";
import { config } from "react-spring";
import { Spring } from "react-spring/renderprops";

// ####################################################
// ###############    Main Component    ###############
// ####################################################
const Animated = ({ comp }) => {
  // ###############    State   ###############
  return (
    <Spring
      from={{ opacity: 0, marginTop: -500 }}
      to={{ opacity: 1, marginTop: 0 }}
      config={config.slow}
    >
      {(props) => <div style={props}>{comp}</div>}
    </Spring>
  );
};

export default Animated;
