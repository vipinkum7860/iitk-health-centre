import React, { useState } from "react";
import {
  Stack,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormHelperText,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NewPassword } from "../../redux/slices/auth";
const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    anger: createColor("#F40B27"),
    apple: createColor("#5DBA40"),
    steelBlue: createColor("#5C76B7"),
    violet: createColor("#BC00A3"),
    new: createColor("#5f9eA0"),
  },
});
function ResetPasswordForm(props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [confirmPasswordHelperText, setConfirmpasswordHelperText] =
    useState("");
  const location = useLocation();
  // const navigate = useNavigate();

  const isValidPassword = (password) =>
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,20}$/i.test(
      password
    );

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function onChangePassword(event) {
    const newPassword = event.target.value;
    if (!isValidPassword(newPassword)) {
      setPasswordError(true);
      setPasswordHelperText(`Password should be of minimum length of 8 characters,
               Password should be of maximum length of 20 characters,
               At least one uppercase letter,
               At least one lowercase letter,
               At least one digit,
               At least one special character.`);
    } else {
      setPasswordError(false);
      setPasswordHelperText("");
    }
    setPassword(newPassword);
  }

  function onChangeConfirmPassword(event) {
    const newConfirmPassword = event.target.value;
    if (password !== newConfirmPassword) {
      setConfirmPasswordError(true);
      setConfirmpasswordHelperText("Passwords do not match.");
    } else {
      setConfirmPasswordError(false);
      setConfirmpasswordHelperText("");
    }
    setConfirmPassword(newConfirmPassword);
  }

  function handleSubmit(e) {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    e.preventDefault();
    console.log(token);
    console.log(confirmPassword);

    try {
      //   Send API Request
      dispatch(NewPassword({ password, confirmPassword, token }));
    } catch (error) {
      console.error(error);
    }
    // axios
    //   .post(
    //     "http://localhost:3001/auth/reset-password",
    //     {
    //       password,
    //       confirmPassword,
    //       token,
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     console.log(response);
    //     props.setSeverity(response.data.status);
    //     props.setShowSnachbar(true);
    //     props.setSnachbarData(response.data.message);
    //     navigate("/auth/login");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     props.setSeverity(err.response.data.status);
    //     props.setShowSnachbar(true);
    //     props.setSnachbarData(err.response.data.message);
    //   });
  }

  return (
    <div className="signupform">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Stack spacing={2} sx={{ width: 300 }}>
          <FormControl
            sx={{ m: 1, width: "25ch" }}
            variant="outlined"
            className="customClass"
          >
            <InputLabel
              htmlFor="outlined-adornment-password"
              error={passwordError}
            >
              Password
            </InputLabel>
            <OutlinedInput
              name="password"
              onChange={onChangePassword}
              value={password}
              error={passwordError}
              sx={{ width: 300 }}
              id="outlined-adornment-password"
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
            <FormHelperText id="outlined-weight-helper-text">
              {passwordHelperText}
            </FormHelperText>
          </FormControl>
          <FormControl
            sx={{ m: 1, width: "25ch" }}
            variant="outlined"
            className="customClass"
          >
            <InputLabel
              htmlFor="outlined-adornment-password"
              error={confirmPasswordError}
            >
              Confirm Password
            </InputLabel>
            <OutlinedInput
              name="passwordConfirm"
              onChange={onChangeConfirmPassword}
              value={confirmPassword}
              error={confirmPasswordError}
              sx={{ width: 300 }}
              id="outlined-adornment-password"
              type={showConfirmPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowConfirmPassword((preValue) => !preValue);
                    }}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="confirm Password"
            />
            <FormHelperText id="outlined-weight-helper-text">
              {confirmPasswordHelperText}
            </FormHelperText>
          </FormControl>

          <ThemeProvider theme={theme}>
            <LoadingButton
              disabled={
                password === "" ||
                confirmPassword === "" ||
                passwordError ||
                confirmPasswordError
              }
              variant="contained"
              color="new"
              type="submit"
              loading={isLoading}
            >
              Reset Password
            </LoadingButton>
          </ThemeProvider>
        </Stack>
      </form>
    </div>
  );
}

export default ResetPasswordForm;
