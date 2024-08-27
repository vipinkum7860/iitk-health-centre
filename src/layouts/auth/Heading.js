import { Stack } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Heading() {
  return (
    <div className="heading">
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack>
          <h1>Health Appointment Centre</h1>
          <h2>Indian Institute of Technology, Kanpur</h2>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} spacing={4}>
          <Link to="/auth/login">Sign In</Link>
          <Link to="/auth/register">Sign Up</Link>
          <Link to="/auth/credits">Credits</Link>
        </Stack>
      </Stack>
    </div>
  );
}

export default Heading;
