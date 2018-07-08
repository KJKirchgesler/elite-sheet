import React from "react";

export const FormBtnLeft = props => (
  <button {...props} style={{ float: "left", background: "purple" }} className="btn btn-secondary">
    {props.children}
  </button>
);
