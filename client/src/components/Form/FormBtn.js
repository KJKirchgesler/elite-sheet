import React from "react";

export const FormBtn = props => (
  <button {...props} style={{background: "purple" }} className="btn btn-secondary">
    {props.children}
  </button>
);
