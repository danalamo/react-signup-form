import React from "react";
import ReactDOM from "react-dom";
import SignUpForm from "./SignUpForm";

import "antd/dist/antd.css";
import "./index.css";

ReactDOM.render(<SignUpForm />, document.getElementById("root"));

/*
  The requirements are:
    1. create a form with 3 input fields, for the username, password and confirm password respectively
    2. persist the state of the input fields entries
    3. the password and confirm password input field should validate their entries by comparing both values
    4. output to the user when both field match or dont match
    5. bonus would be to style the form
*/
