import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import { useHistory } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const onRegister = () => {
    dispatch({
      type: "OPEN_MODAL",
      payload: { type: "register", open: "true" },
    });
  };

  const onLogin = () => {
    dispatch({
      type: "OPEN_MODAL",
      payload: { type: "login", open: "true" },
    });
  };

  return (
    <div>
      <div></div>
      <div className="companyLogo">
        <img src="./image/redwing-lures-mark.transparent.png" />
      </div>
      <LoginForm />

      <center>
        <Button onClick={onRegister}>Register</Button>
      </center>
    </div>
  );
}

export default LoginPage;
