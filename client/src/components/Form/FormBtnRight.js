import React from "react";

export const FormBtnRight = props => (
  <button {...props} style={{ background: "purple" }} className="btn btn-secondary ml-auto">
    {props.children}
  </button>
);
