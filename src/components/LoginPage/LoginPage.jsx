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

  const onDesign = () => {
    history.push("/design");
  };

  return (
    <div>
      <div className="companyLogo">
        <img src="./image/redwing-lures-mark.transparent.png" />
      </div>
      <LoginForm />

      <center>
        <Button onClick={onRegister}>Register</Button>
        <Button onClick={onDesign}>Design</Button>
      </center>
    </div>
  );
}

export default LoginPage;
