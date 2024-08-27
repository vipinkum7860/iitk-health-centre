import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { CloseSnackbar } from "../redux/slices/app";
export default function CustomizedSnackbars() {
  const { open, message, severity } = useSelector(
    (state) => state.app.snackbar
  );

  const dispach = useDispatch();

  return (
    <div>
      {message && open ? (
        <Snackbar
          open={open}
          autoHideDuration={8000}
          onClose={() => {
            dispach(CloseSnackbar());
          }}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={() => {
              dispach(CloseSnackbar());
            }}
            severity={severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
    </div>
  );
}
