//---------------------imports---------------------//
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Button,  TextField } from "@mui/material";
import "./LoginForm.css";

function LoginForm() {
  //---------------------local state---------------------//
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //---------------------reducer state---------------------//
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  //---------------------JSX return---------------------//
  return (
    <form className="formPanel" onSubmit={login}>
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          <TextField
          variant="outlined"
          placeholder="Username"
          sx={{ mb: 2}}
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          <TextField
          variant="outlined"
          placeholder="Password"
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <Button onClick={login} variant="contained" sx={{ mt: 3}}>Log In</Button>
      </div>
    </form>
  );
}

export default LoginForm;
