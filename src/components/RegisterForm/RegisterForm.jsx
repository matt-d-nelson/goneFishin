//---------------------imports---------------------//
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";

function RegisterForm() {
  //---------------------local state---------------------//
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  //---------------------reducer state---------------------//
  const errors = useSelector((store) => store.errors);

  //---------------------imported methods---------------------//
  const dispatch = useDispatch();

  //---------------------event handlers---------------------//
  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
        email: email,
      },
    });
  }; // end registerUser

  //---------------------JSX return---------------------//
  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2 className="registerTitle">Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          <TextField
              variant="outlined"
              placeholder="Username"
              sx={{ mb: 2, mr:5, ml: 5}}
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="email">
          <TextField
              variant="outlined"
              placeholder="Email"
              sx={{ mb: 2, mr:5, ml: 5}}
            type="email"
            name="email"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          <TextField
              variant="outlined"
              placeholder="Password"
              sx={{ mb: 2, mr:5, ml: 5}}
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
      <Button variant="contained"  sx={{ ml: 5}} onClick={registerUser}>Register</Button>
      </div>
    </form>
  );
}

export default RegisterForm;
