import React, { useState } from "react";
import {
  Box,
  Stack,
  Tabs,
  Tab,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import LoadingButton from "@mui/lab/LoadingButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useDispatch, useSelector } from "react-redux";
import { RegisterUser, UpdateRole } from "../../redux/slices/auth";
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

function Signupform(props) {
  const [showPassword, setShowPassword] = React.useState(false);
  const isEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(email);
  const isRoll = (rollNo) => /^[0-9]{5,}$/.test(rollNo);

  const isValidPassword = (password) =>
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,20}$/i.test(
      password
    );

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const { role } = useSelector((state) => state.auth);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [error, setError] = useState({
    name: false,
    rollNo: false,
    email: false,
    password: false,
  });
  const [helperText, setHelperText] = useState({
    name: "",
    rollNo: "",
    email: "",
    password: "",
  });
  const [student, SetStudent] = useState({
    name: "",
    rollNo: "",
    email: "",
    password: "",
    contactNo: "",
    designation: "",
  });

  const handleChange = (event, newValue) => {
    dispatch(UpdateRole(newValue));
    SetStudent({
      name: "",
      rollNo: "",
      email: "",
      password: "",
      contactNo: "",
      designation: "",
    });
  };

  function changeRollNo(event) {
    const newValue = event.target.value;
    if (!isRoll(newValue) || newValue.length < 5) {
      setError((preValue) => {
        return {
          ...preValue,
          rollNo: true,
        };
      });
      setHelperText((preValue) => {
        return {
          ...preValue,
          rollNo: "Invalid Roll No",
        };
      });
    } else {
      setError((preValue) => {
        return {
          ...preValue,
          rollNo: false,
        };
      });
      setHelperText((preValue) => {
        return {
          ...preValue,
          rollNo: "",
        };
      });
    }
    SetStudent((preValue) => {
      return {
        ...preValue,
        rollNo: newValue,
      };
    });
  }

  function changeEmail(event) {
    const newValue = event.target.value;
    if (!isEmail(newValue)) {
      setError((preValue) => {
        return {
          ...preValue,
          email: true,
        };
      });
      setHelperText((preValue) => {
        return {
          ...preValue,
          email: "Invalid Email",
        };
      });
    } else {
      setError((preValue) => {
        return {
          ...preValue,
          email: false,
        };
      });
      setHelperText((preValue) => {
        return {
          ...preValue,
          email: "",
        };
      });
    }
    SetStudent((preValue) => {
      return {
        ...preValue,
        email: newValue,
      };
    });
  }

  function changePassword(event) {
    const newPassword = event.target.value;

    if (!isValidPassword(newPassword)) {
      setError((preValue) => {
        return {
          ...preValue,
          password: true,
        };
      });
      setHelperText((preValue) => {
        return {
          ...preValue,
          password: `Password should be of minimum length of 8 characters,
               Password should be of maximum length of 20 characters,
               At least one uppercase letter,
               At least one lowercase letter,
               At least one digit,
               At least one special character.`,
        };
      });
    } else {
      setError((preValue) => {
        return {
          ...preValue,
          password: false,
        };
      });
      setHelperText((preValue) => {
        return {
          ...preValue,
          password: "",
        };
      });
    }
    SetStudent((preValue) => {
      return {
        ...preValue,
        password: newPassword,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // submit data to backend
      dispatch(
        RegisterUser({
          ...student,
          role: role,
        })
      );
    } catch (error) {
      console.error(error);
    }
    // await axios
    //   .post(
    //     "http://localhost:3001/auth/register",
    //     {
    //       ...student,
    //       email: student.email,
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     console.log(response.data.message);
    //     navigate("/auth/verify");
    //     props.setSeverity(response.data.status);
    //     props.setShowSnachbar(true);
    //     props.setSnachbarData(response.data.message);
    //   })
    //   .catch((err) => {
    //     console.log("hiiii");
    //     console.log(err);
    //     props.setSeverity(err.response.data.status);
    //     props.setShowSnachbar(true);
    //     props.setSnachbarData(err.response.data.message);
    //   });
  }

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={role}
          onChange={handleChange}
          aria-label="secondary tabs example"
        >
          <Tab value="student" label="Students" />
          <Tab value="doctor" label="Doctors" />
          <Tab value="staff" label="Staff" />
        </Tabs>
      </Box>
      <div className="signupform">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <Stack spacing={2} sx={{ width: 300 }} className="customClass">
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              value={student.name}
              onChange={(event) => {
                const newValue = event.target.value;
                SetStudent((preValue) => {
                  return {
                    ...preValue,
                    name: newValue,
                  };
                });
              }}
            ></TextField>

            {role === "student" && (
              <TextField
                name="rollNo"
                label="Roll No"
                variant="outlined"
                value={student.rollNo}
                error={error.rollNo}
                helperText={helperText.rollNo}
                onChange={changeRollNo}
              ></TextField>
            )}

            {(role === "doctor" || role === "staff") && (
              <TextField
                name="contactNo"
                label="Contact No"
                variant="outlined"
                value={student.contactNo}
                onChange={(event) => {
                  const newValue = event.target.value;
                  SetStudent((preValue) => {
                    return {
                      ...preValue,
                      contactNo: newValue,
                    };
                  });
                }}
              ></TextField>
            )}

            {(role === "doctor" || role === "staff") && (
              <TextField
                name="designation"
                label="Designation"
                variant="outlined"
                value={student.designation}
                onChange={(event) => {
                  const newValue = event.target.value;
                  SetStudent((preValue) => {
                    return {
                      ...preValue,
                      designation: newValue,
                    };
                  });
                }}
              ></TextField>
            )}

            <TextField
              name="email"
              label="Email ID"
              variant="outlined"
              value={student.email}
              error={error.email}
              helperText={helperText.email}
              onChange={changeEmail}
            ></TextField>
            <FormControl
              sx={{ m: 1, width: "25ch" }}
              variant="outlined"
              className="customClass"
            >
              <InputLabel
                htmlFor="outlined-adornment-password"
                error={error.password}
              >
                Password
              </InputLabel>
              <OutlinedInput
                name="password"
                onChange={changePassword}
                value={student.password}
                error={error.password}
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
                {helperText.password}
              </FormHelperText>
            </FormControl>
            <ThemeProvider theme={theme}>
              <LoadingButton
                disabled={
                  role === "student"
                    ? student.name === "" ||
                      student.rollNo === "" ||
                      student.email === "" ||
                      student.password === "" ||
                      error.name ||
                      error.rollNo ||
                      error.email ||
                      error.password
                    : student.name === "" ||
                      student.email === "" ||
                      student.password === "" ||
                      error.name ||
                      error.email ||
                      error.password ||
                      student.contactNo === "" ||
                      student.designation === ""
                }
                onClick={handleSubmit}
                variant="contained"
                color="new"
                type="submit"
                loading={isLoading}
              >
                Sign Up
              </LoadingButton>
            </ThemeProvider>
          </Stack>
        </form>
      </div>
    </div>
  );
}
export default Signupform;
