//---------------------imports---------------------//
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import { useHistory } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  //---------------------imported methods---------------------//
  const history = useHistory();
  const dispatch = useDispatch();

  //---------------------event handlers---------------------//
  const onRegister = () => {
    dispatch({
      type: "OPEN_MODAL",
      payload: { type: "register", open: "true" },
    });
  };

  const onDesign = () => {
    history.push("/design");
  };

  //---------------------JSX return---------------------//
  return (
    <div>
      <div className="companyLogo">
        <img src="./image/redwing-lures-mark.transparent.png" />
      </div>
      <LoginForm />

      <center>
        <Button variant="contained"  sx={{ mr: 2, mt:2}} onClick={onRegister}>Register</Button>
        <Button  variant="contained"  sx={{ mt:2}}onClick={onDesign}>Design</Button>
      </center>
    </div>
  );
}

export default LoginPage;
