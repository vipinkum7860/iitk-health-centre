import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { SetShouldFetch } from "../../redux/slices/app";
import { socket } from "../../socket";
const Allappoinment = [
  { label: "general consultation" },
  { label: "specific health concern" },
];

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

// const Alldoctors = [
//   [{ id: 0, label: "Dr. Shubha Agarwal" }],
//   [
//     { id: 1, label: "Dr. K.K. Dokania" },
//     { id: 2, label: "Dr. Vivek Saxena" },
//   ],
//   [{ id: 3, label: "Dr. Gopal Singh Dhanik" }],
//   [{ id: 4, label: "Dr. Alok Bajpai" }],
//   [
//     { id: 5, label: "Dr. Nadeem Faruqui" },
//     { id: 6, label: "Dr. Sanjai Rastogi" },
//   ],
//   [
//     { id: 7, label: "Dr. Ashish Agrawal" },
//     { id: 8, label: "Dr. Shekhar Rastogi" },
//   ],
//   [{ id: 9, label: "Dr. Rakesh Chandra" }],
//   [{ id: 10, label: "Dr. Rajan Bhargava" }],
//   [{ id: 11, label: "Dr. S. K. Mishra" }],
//   [{ id: 12, label: "Madhuraj Hospital Pvt Ltd (MHPL)" }],
//   [{ id: 13, label: "Dr. Gaurav Arya" }],
// ];

// const Allslots = [
//   [{ label: "Tuesday 04:30 pm to 06:00 pm" }],
//   [{ label: "Tuesday 05:00 pm to 06:00 pm" }],
//   [{ label: "Thursday 05:30 pm to 06:30 pm" }],
//   [{ label: "Wednesday 05:30 pm to 06.30 pm" }],
//   [{ label: "Thursday 11:00 am to 01:00 pm" }],
//   [{ label: "Thursday 01:00 pm to 02:00 pm" }],
//   [{ label: "Saturday 09:30 am to 10:30 am" }],
//   [{ label: "Thursday 05:00 pm to 06:00 pm" }],
//   [{ label: "Saturday 10:00 am to 11.00 am" }],
//   [{ label: "Saturday 10:00 am to 11.00 am" }],
//   [{ label: "Saturday 03:00 pm to 04:00 pm" }],

//   [
//     { label: "Monday 09:00 am to 12:00 noon" },
//     { label: "Tuesday 09:00 am to 12:00 noon" },
//     { label: "Wednesday 09:00 am to 12:00 noon" },
//     { label: "Thursday 09:00 am to 12:00 noon" },
//     { label: "Friday 09:00 am to 12:00 noon" },
//     { label: "Saturday 09:00 am to 12:00 noon" },
//   ],
//   [
//     { label: "Tuesday 11:00 am to 03:00 pm" },
//     { label: "Wednesday 11:00 am to 03:00 pm" },
//     { label: "Thursday 11:00 am to 03:00 pm" },
//     { label: "Friday 11:00 am to 03:00 pm" },
//     { label: "Saturday 11:00 am to 03:00 pm" },
//   ],
//   [
//     { label: "Second Wednesday 11:00 am to 12:30 pm" },
//     { label: "Fourth Wednesday 11:00 am to 12:30 pm" },
//   ],
// ];

function Form() {
  const appointmentList = useSelector((state) => state.app.appointments);
  const currentId = appointmentList.length;

  const [doctors, SetDoctors] = useState([]);
  const [slots, SetSlots] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [appointment, SetAppointment] = useState({
    id: currentId,
    appointmentType: "",
    category: "",
    doctorName: "",
    preferredSlot: "",
    reasonForAppointment: "",
    status: "Pending",
  });
  const [filterData, setFilterData] = useState([]);
  const dispatch = useDispatch();
  const { user, allSlotData } = useSelector((state) => state.app);
  const [doctorId, setDoctorId] = useState(0);
  useEffect(() => {
    SetAppointment((preValue) => {
      return {
        ...preValue,
        id: currentId,
      };
    });
  }, [currentId]);
  async function handleSubmit(event) {
    event.preventDefault();
    //Api call to backend
    try {
      // dispatch(
      //   AddAppoinment({
      // ...appointment,
      // from: user._id,
      // to: doctorId,
      // studentName: user.name,
      //   })
      // );

      socket.emit("appointment_request", {
        ...appointment,
        from: user._id,
        to: doctorId,
        studentName: user.name,
      });
    } catch (error) {
      console.log(error);
    }
    dispatch(SetShouldFetch(true));
    // SetAppointmentList((preValue) => {
    //   return [...preValue, appointment];
    // });

    SetAppointment((preValue) => {
      return {
        id: preValue.id + 1,
        appointmentType: "",
        category: "",
        doctorName: "",
        preferredSlot: "",
        reasonForAppointment: "",
        status: "Pending",
      };
    });
  }

  return (
    <div>
      <form className="create-note">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4} className="customClass">
            <Grid item xs={6}>
              {isExpanded && (
                <Autocomplete
                  sx={{
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "cadetblue",
                    },
                    width: 300,
                  }}
                  disablePortal
                  id="combo-box-demo"
                  options={Allappoinment}
                  onChange={(event, value) => {
                    let newValue;
                    if (value === null) {
                      newValue = "";
                    } else {
                      newValue = value.label;
                    }

                    SetAppointment((preValue) => {
                      return {
                        ...preValue,
                        appointmentType: newValue,
                      };
                    });
                    // console.log(props.appointment);
                  }}
                  value={appointment.appointmentType}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Appoinment Type"
                    />
                  )}
                />
              )}
            </Grid>
            <Grid item xs={6}>
              {isExpanded && (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={Allcategory}
                  sx={{
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "cadetblue",
                    },
                    width: 300,
                  }}
                  onChange={(event, value) => {
                    let newValue;
                    if (value === null) {
                      newValue = "";
                    } else {
                      newValue = value.label;
                    }
                    const Data = allSlotData.filter((el) => {
                      return el.category === newValue;
                    });

                    setFilterData(Data);
                    const newDoctors = Data.map((el) => {
                      return el.name;
                    });

                    SetDoctors(newDoctors);
                    SetAppointment((preValue) => {
                      return {
                        ...preValue,
                        category: newValue,
                      };
                    });
                    // console.log(appointment);
                  }}
                  value={appointment.category}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Category"
                    />
                  )}
                />
              )}
            </Grid>
            {isExpanded && (
              <Grid item xs={6}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={doctors}
                  sx={{
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "cadetblue",
                    },
                    width: 300,
                  }}
                  onChange={(event, value) => {
                    // console.log(filterData);
                    // console.log(value);
                    let newValue;
                    if (value === null) {
                      newValue = "";
                    } else {
                      newValue = value;
                    }

                    const Data = filterData.filter((el) => {
                      return el.name === newValue;
                    });
                    console.log(filterData, Data);
                    if (Data.length !== 0) {
                      SetSlots(Data[0].slots);
                      setDoctorId(Data[0].id);
                    }

                    SetAppointment((preValue) => {
                      return {
                        ...preValue,
                        doctorName: value,
                      };
                    });
                    // console.log(appointment);
                  }}
                  value={appointment.doctorName}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Doctor's Name"
                    />
                  )}
                />
              </Grid>
            )}

            {isExpanded && (
              <Grid item xs={6}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={slots}
                  sx={{
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "cadetblue",
                    },
                    width: 300,
                  }}
                  onChange={(event, value) => {
                    const newValue = value;
                    SetAppointment((preValue) => {
                      return {
                        ...preValue,
                        preferredSlot: newValue,
                      };
                    });
                  }}
                  value={appointment.preferredSlot}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Preferred Slot"
                    />
                  )}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <TextField
                fullWidth
                sx={{
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "cadetblue",
                  },
                }}
                onClick={() => {
                  setIsExpanded(true);
                }}
                onChange={(event) => {
                  const newValue = event.target.value;
                  SetAppointment((preValue) => {
                    return {
                      ...preValue,
                      reasonForAppointment: newValue,
                    };
                  });
                }}
                id="standard-basic"
                label={
                  isExpanded
                    ? "Reason for Appointment"
                    : "Lodge A New Appointment..."
                }
                variant="standard"
                value={appointment.reasonForAppointment}
              />
            </Grid>
          </Grid>
        </Box>

        <Zoom in={isExpanded}>
          <Fab onClick={handleSubmit}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default Form;
