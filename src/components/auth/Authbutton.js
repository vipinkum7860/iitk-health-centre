import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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

function Authbutton(props) {
  return (
    <ThemeProvider theme={theme}>
      <LoadingButton
        disabled={props.isDisabled}
        onClick={props.handleSubmit}
        variant="contained"
        color="new"
      >
        {props.buttonText}
      </LoadingButton>
    </ThemeProvider>
  );
}

export default Authbutton;
