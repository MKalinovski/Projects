import React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./LoginPage.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormHelperText } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";

type PageType = "LoginPage" | "RegisterForm" | "ChatPage";

interface LoginPageProps {
  setPage: (page: PageType) => void;
}

interface LoginProps {
  setLogged: (logged: "true" | "false") => void;
}

function LoginPage({ setPage }: LoginPageProps, { setLogged }: LoginProps) {
  //validate username
  const [validateUsername, setValidateUsername] = React.useState({
    usedid: "outlined-start-adornment",
    textHelper: "",
  });
  //validate password
  const [validatePassword, setValidatePassword] = React.useState({
    usedid: "outlined-adornment-password",
    textHelper: "",
  });
  //typed username
  const [typedUsername, setTypedUsername] = React.useState("");
  const handleTypedUsernameChange = (event: any) => {
    setTypedUsername(event.target.value);
  };
  //typed password
  const [typedPassword, setTypedPassword] = React.useState("");
  const handleTypedPasswordChange = (event: any) => {
    setTypedPassword(event.target.value);
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  function loginUser() {
    const data = {
      username: typedUsername,
      password: typedPassword,
    };
    axios
      .post("http://localhost:4000/v1/login", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.data.success) {
          setLogged("true");
          Cookies.set("token", response.data.token, { expires: 1 });
        } else {
          switch (response.data.validationfailed) {
            case "username":
              setValidateUsername({
                usedid: "outlined-error",
                textHelper: "Invalid username",
              });
              setValidatePassword({
                usedid: "outlined-password-adornment",
                textHelper: "",
              });
              break;
            case "password":
              setValidatePassword({
                usedid: "outlined-password-adornment",
                textHelper: "Invalid password",
              });
              setValidateUsername({
                usedid: "outlined-start-adornment",
                textHelper: "",
              });
          }
        }
      });
  }

  return (
    <div id="loginPage">
      <div id="credentials">
        <TextField
          label="Username"
          error={validateUsername.textHelper !== ""}
          id={validateUsername.usedid}
          sx={{ m: 1, width: "25ch" }}
          className="username"
          onChange={handleTypedUsernameChange}
          helperText={validateUsername.textHelper}
        />
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id={validatePassword.usedid}
            error={validatePassword.textHelper !== ""}
            onChange={handleTypedPasswordChange}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <FormHelperText id="error">
            {validatePassword.textHelper}
          </FormHelperText>
        </FormControl>
      </div>
      <div id="buttons">
        <div id="remember">
          <FormControlLabel
            id="rememberText"
            control={<Checkbox defaultChecked />}
            label="Remember me"
          />
        </div>
        <Button variant="contained" size="large" id="login" onClick={loginUser}>
          Login
        </Button>
        <Button
          variant="text"
          size="small"
          onClick={() => setPage("RegisterForm")}
        >
          Don't have an account? Register now!
        </Button>
        <Button
          variant="text"
          size="small"
          onClick={() => setPage("LoginPage")}
        >
          Forgot your password?
        </Button>
      </div>
    </div>
  );
}
export default LoginPage;
