import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import {
  Autocomplete,
  Chip,
  Fab,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import ClearIcon from "@mui/icons-material/Clear";
// import dayjs from "dayjs";
import DateRangeIcon from "@mui/icons-material/DateRange";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { AddSlot, SubmitCertificate } from "../../redux/slices/app";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
const Allcategory = [
  { id: 0, label: "OBGY" },
  { id: 1, label: "Paediatric" },
  { id: 2, label: "Skin OPD" },
  { id: 3, label: "Psychiatric" },
  { id: 4, label: "Orthopaedic" },
  { id: 5, label: "Ophthalmology" },
  { id: 6, label: "Medicine" },
  { id: 7, label: "ENT" },
  { id: 8, label: "Homeopathy" },
  { id: 9, label: "Dental OPD" },
  { id: 10, label: "Vaccination (Paediatrician)" },
];

const days = [
  { id: 0, label: "Monday" },
  { id: 1, label: "Tuesday" },
  { id: 2, label: "Wednesday" },
  { id: 3, label: "Thursday" },
  { id: 4, label: "Friday" },
  { id: 5, label: "Saturday" },
  { id: 6, label: "Sunday" },
];

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function Item(props) {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <DateRangeIcon />
        </Avatar>
      </ListItemAvatar>

      <ListItemText primary={props.slot} />
      {props.editSlots && (
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => {
            console.log(props.id);
            props.setAllSlots((preValue) => {
              return preValue.filter((item, index) => {
                return props.id !== index;
              });
            });
          }}
        >
          <DeleteIcon />
        </IconButton>
      )}
    </ListItem>
  );
}

function Profile() {
  // const [value, setValue] = React.useState(dayjs());
  const [slot, setSlot] = useState({
    day: "",
    from: "",
    to: "",
  });

  const [dayError, setDayError] = useState(false);
  const [dayHelperText, setDayHelperText] = useState("");

  const [editSlots, setEditSlots] = useState(false);
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.app);
  let { slotData } = useSelector((state) => state.app);

  if (slotData === null) {
    slotData = {
      slots: [],
      category: "",
      certified: false,
      editFile: true,
    };
  }
  const [allSlots, setAllSlots] = useState(slotData.slots);
  const [category, setCategory] = useState(slotData.category);
  const [certified, setCertified] = useState(slotData.certified);
  const [editFile, setEditFile] = useState(slotData.editFile);
  function handleAdd() {
    if (slot.day === "") {
      setDayError(true);
      setDayHelperText("Day is Required");
      return;
    }
    let slotString = "";
    slotString += slot.day + " from " + slot.from + " to " + slot.to;
    console.log(slotString);
    setAllSlots((preValue) => {
      return [...preValue, slotString];
    });
    console.log(allSlots);
    setSlot((preValue) => {
      return {
        ...preValue,
        day: "",
      };
    });
  }

  function handleSave() {
    setEditSlots(false);
    try {
      dispatch(
        AddSlot({
          id: user._id,
          name: user.name,
          slots: allSlots,
        })
      );
    } catch (err) {
      console.log(err);
    }
  }

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  function handleSubmit() {
    console.log(category, file);
    const formData = new FormData();
    formData.append("category", category);
    formData.append("file", file); // file should be a File object
    formData.append("id", user._id);
    formData.append("editFile", false);
    formData.append("certified", true);
    formData.append("name", user.name);
    try {
      dispatch(
        SubmitCertificate(formData)
        // SubmitCertificate({
        //   id: user._id,
        //   category,
        //   file,
        //   editFile: false,
        //   certified: true,
        //   name: user.name,
        // })
      );

      setCertified(true);
      setEditFile(false);
    } catch (err) {
      console.log(err);
    }

    setFile(null);
  }

  return (
    <div className="profile">
      <Paper elevation={3} className="profile-paper">
        <Stack spacing={4}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <h1>Profile</h1>
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <Chip
                label={certified ? "Certified" : "Not Certified"}
                color={certified ? "success" : "error"}
                variant="outlined"
                icon={certified ? <TaskAltIcon /> : <ClearIcon />}
              />
            </Stack>
          </Stack>
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
              value={user.contactNo}
              disabled
            />
            <TextField
              id="standard-basic"
              label="Designation"
              variant="standard"
              className="customClass"
              sx={{ width: 300 }}
              name="designation"
              value={user.designation}
              disabled
            />
          </Stack>

          <>
            {" "}
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-evenly"}
            >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={Allcategory}
                disabled={!editFile}
                sx={{
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "cadetblue",
                  },
                  width: 300,
                }}
                onChange={(event, value) => {
                  const newValue = value.label;
                  setCategory(newValue);
                }}
                value={category}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Category"
                    name="category"
                  />
                )}
              />
              <Stack sx={{ width: 300 }}>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  sx={{ width: 200 }}
                  disabled={!editFile}
                >
                  Upload file
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf, .png, .jpg, .jpeg"
                  />
                </Button>
                {file && <p>Selected file: {file.name}</p>}
              </Stack>
            </Stack>
            <Stack alignItems={"center"} justifyContent={"center"}>
              <LoadingButton
                variant="contained"
                color="success"
                onClick={handleSubmit}
                sx={{ width: 700 }}
                disabled={(category === "" || !file) && !editFile}
              >
                Submit
              </LoadingButton>
            </Stack>{" "}
          </>

          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <h1 style={{ paddingTop: "20px" }}>Your appointments slots</h1>

            <Tooltip title={certified ? "" : "You are not certified"}>
              <span>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => {
                    setEditSlots(true);
                  }}
                  size="small"
                  disabled={!certified}
                >
                  Edit Slots
                </Button>
              </span>
            </Tooltip>
          </Stack>

          {editSlots && (
            <>
              {" "}
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-evenly"}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["TimePicker"]}>
                    <TimePicker
                      label="from"
                      className="customClass"
                      sx={{ width: 300 }}
                      onChange={(newValue) => {
                        let hour = newValue.$H;
                        let minutes = newValue.$m;
                        let meredian = " am";
                        if (hour > 12) {
                          meredian = " pm";
                          hour %= 12;
                        }

                        if (Math.log10(hour) < 1) {
                          hour = "0" + hour;
                        }

                        if (Math.log10(minutes) < 1) {
                          minutes = "0" + minutes;
                        }
                        let time = "";
                        time += hour + ":" + minutes + meredian;
                        setSlot((preValue) => {
                          return {
                            ...preValue,
                            from: time,
                          };
                        });
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["TimePicker"]}>
                    <TimePicker
                      label="to"
                      className="customClass"
                      sx={{ width: 300 }}
                      onChange={(newValue) => {
                        let hour = newValue.$H;
                        let minutes = newValue.$m;
                        let meredian = " am";
                        if (hour > 12) {
                          meredian = " pm";
                          hour %= 12;
                        }

                        if (Math.log10(hour) < 1) {
                          hour = "0" + hour;
                        }

                        if (Math.log10(minutes) < 1) {
                          minutes = "0" + minutes;
                        }
                        let time = "";
                        time += hour + ":" + minutes + meredian;
                        setSlot((preValue) => {
                          return {
                            ...preValue,
                            to: time,
                          };
                        });
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={45}
                justifyContent={"center"}
              >
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={days}
                  sx={{
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "cadetblue",
                    },
                    width: 300,
                  }}
                  onChange={(event, value) => {
                    const newValue = value.label;
                    if (newValue !== "") {
                      setDayError(false);
                      setDayHelperText("");
                    }
                    setSlot((preValue) => {
                      return {
                        ...preValue,
                        day: newValue,
                      };
                    });
                  }}
                  value={slot.day}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Day"
                      name="day"
                      value={slot.day}
                      error={dayError}
                      helperText={dayHelperText}
                    />
                  )}
                />
                <Fab onClick={handleAdd} color="secondary" size="medium">
                  <AddIcon />
                </Fab>
              </Stack>
            </>
          )}
          {certified ? (
            allSlots.length === 0 && !editSlots ? (
              <h1 style={{ fontSize: "15px", fontWeight: "2px" }}>
                You haven't added your available slots. Please Edit to add the
                slots
              </h1>
            ) : (
              <List
                sx={{
                  width: "100%",
                  maxWidth: 800,
                  bgcolor: "background.paper",
                  paddingLeft: "100px",
                }}
              >
                {allSlots.map((slot, index) => {
                  return (
                    <Item
                      key={index}
                      id={index}
                      slot={slot}
                      setAllSlots={setAllSlots}
                      editSlots={editSlots}
                    />
                  );
                })}
              </List>
            )
          ) : (
            <h1 style={{ fontSize: "15px", fontWeight: "2px" }}>
              You are not certified doctor. Please upload your certificate to
              get certified
            </h1>
          )}
          {editSlots && (
            <Stack alignItems={"center"} justifyContent={"center"}>
              <LoadingButton
                loading={isLoading}
                variant="contained"
                color="success"
                onClick={handleSave}
                sx={{ width: 700 }}
              >
                Save
              </LoadingButton>
            </Stack>
          )}
        </Stack>
      </Paper>
    </div>
  );
}

export default Profile;
