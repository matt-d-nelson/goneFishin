import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";

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
      <LoginForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push("/registration");
          }}
        >
          Register
        </button>
        <Button onClick={onRegister}>Register</Button>
        <Button onClick={onLogin}>Login</Button>
      </center>
    </div>
  );
}

export default LoginPage;
