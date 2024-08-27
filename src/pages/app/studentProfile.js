import React from "react";
import Paper from "@mui/material/Paper";
import { Stack, TextField } from "@mui/material";
import { useSelector } from "react-redux";

function StudentProfile() {
  const { user } = useSelector((state) => state.app);
  return (
    <div className="profile">
      <Paper elevation={3} className="profile-paper">
        <Stack spacing={4}>
          <h1>Profile</h1>

          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
          >
            <TextField
              id="standard-basic"
              label="Name"
              variant="standard"
              className="customClass"
              sx={{ width: 300 }}
              name="name"
              value={user.name}
              disabled
            />
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              className="customClass"
              sx={{ width: 300 }}
              name="email"
              value={user.email}
              disabled
            />
          </Stack>

          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
          >
            <TextField
              id="standard-basic"
              label="Contact No"
              variant="standard"
              className="customClass"
              sx={{ width: 300 }}
              name="contactNo"
              value={user.contactNo ? user.contactNo : ""}
              disabled
            />
            <TextField
              id="standard-basic"
              label="Designation"
              variant="standard"
              className="customClass"
              sx={{ width: 300 }}
              name="designation"
              value={user.designation ? user.designation : ""}
              disabled
            />
          </Stack>

          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
          >
            <TextField
              id="standard-basic"
              label="DOB"
              variant="standard"
              className="customClass"
              sx={{ width: 300 }}
              name="contactNo"
              value={user.dob ? user.dob : ""}
              disabled
            />
            <TextField
              id="standard-basic"
              label="Gender"
              variant="standard"
              className="customClass"
              sx={{ width: 300 }}
              name="designation"
              value={user.gender ? user.gender : ""}
              disabled
            />
          </Stack>

          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
          >
            <TextField
              id="standard-basic"
              label="Blood Group"
              variant="standard"
              className="customClass"
              sx={{ width: 300 }}
              name="contactNo"
              value={user.bloodGroup ? user.bloodGroup : ""}
              disabled
            />
            <TextField
              id="standard-basic"
              label="IITK Address"
              variant="standard"
              className="customClass"
              sx={{ width: 300 }}
              name="designation"
              value={user.iitkAddress ? user.iitkAddress : ""}
              disabled
            />
          </Stack>
        </Stack>
      </Paper>
    </div>
  );
}

export default StudentProfile;
