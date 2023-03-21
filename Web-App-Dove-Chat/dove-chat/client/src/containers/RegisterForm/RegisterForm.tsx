import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import "./RegisterForm.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import axios from "axios";

type PageType = "LoginPage" | "RegisterSuccessPage";

interface RegisterFormProps {
  setPage: (page: PageType) => void;
}

function RegisterForm({ setPage }: RegisterFormProps) {
  // show password icon
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  //validate username
  const [validateUsername, setValidateUsername] = React.useState({
    usedid: "outlined-start-adornment",
    textHelper: "",
  });
  //validate email
  const [validateEmail, setValidateEmail] = React.useState({
    usedid: "outlined-start-adornment",
    textHelper: "",
  });

  //typed username
  const [typedUsername, setTypedUsername] = React.useState("");
  const handleTypedUsernameChange = (event: any) => {
    setTypedUsername(event.target.value);
  };
  //typed email
  const [typedEmail, setTypedEmail] = React.useState("");
  const handleTypedEmailChange = (event: any) => {
    setTypedEmail(event.target.value);
  };
  //typed password
  const [typedPassword, setTypedPassword] = React.useState("");
  const handleTypedPasswordChange = (event: any) => {
    setTypedPassword(event.target.value);
  };

  function registerUser() {
    const data = {
      username: typedUsername,
      password: typedPassword,
      email: typedEmail,
    };
    axios
      .post("http://localhost:4000/v1/register", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.data.success) {
          setPage("RegisterSuccessPage");
        } else {
          switch (response.data.validationfailed) {
            case "both":
              setValidateEmail({
                usedid: "outlined-error",
                textHelper: "Email already taken",
              });
              setValidateUsername({
                usedid: "outlined-error",
                textHelper: "Username already taken",
              });
              break;
            case "username":
              setValidateUsername({
                usedid: "outlined-error",
                textHelper: "Username already taken",
              });
              setValidateEmail({
                usedid: "outlined-start-adornment",
                textHelper: "",
              });
              break;
            case "email":
              setValidateEmail({
                usedid: "outlined-error",
                textHelper: "Email already taken",
              });
              setValidateUsername({
                usedid: "outlined-start-adornment",
                textHelper: "",
              });
              break;
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <div>
        <TextField
          error={validateUsername.textHelper !== ""}
          label="Username"
          id={validateUsername.usedid}
          sx={{ m: 1, width: "25ch" }}
          className="username"
          onChange={handleTypedUsernameChange}
          helperText={validateUsername.textHelper}
        />
      </div>
      <div>
        <TextField
          error={validateEmail.textHelper !== ""}
          label="E-mail"
          id={validateEmail.usedid}
          sx={{ m: 1, width: "25ch" }}
          onChange={handleTypedEmailChange}
          helperText={validateEmail.textHelper}
        />
      </div>
      <div>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            onChange={handleTypedPasswordChange}
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
        </FormControl>
      </div>
      <div>
        <Button
          id="registerButton"
          size="large"
          variant="contained"
          onClick={registerUser}
        >
          Register
        </Button>
        <Button size="small" onClick={() => setPage("LoginPage")}>
          Already have an account? Login now!
        </Button>
      </div>
    </Box>
  );
}

export default RegisterForm;
