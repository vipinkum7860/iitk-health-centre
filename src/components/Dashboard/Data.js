import React, { useState } from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import {
  Button,
  Chip,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
// import { ApproveRejectAppointment } from "../../redux/slices/app";
import { socket } from "../../socket";
import SendIcon from "@mui/icons-material/Send";
const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  "& .ant-empty-img-1": {
    fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
  },
  "& .ant-empty-img-2": {
    fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
  },
  "& .ant-empty-img-3": {
    fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
  },
  "& .ant-empty-img-4": {
    fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
  },
  "& .ant-empty-img-5": {
    fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
    fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
  },
}));

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        style={{ flexShrink: 0 }}
        width="340"
        height="150"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>No Rows</Box>
    </StyledGridOverlay>
  );
}

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton color="new" />

      <GridToolbarFilterButton />
      <GridToolbarDensitySelector
        slotProps={{ tooltip: { title: "Change density" } }}
        style={{ color: "red" }}
      />
      <GridToolbarExport
        slotProps={{
          tooltip: { title: "Export data" },
        }}
        style={{ color: "red" }}
      />
    </GridToolbarContainer>
  );
}

// const rows = [
//   {
//     id: 1,
//     category: "OPD",
//     type: "general consultance",
//     doctorName: "Ashutosh Modi",
//     slot: "Wednesday 05:30 pm to 06",
//     status: "Request Sent",
//     reason: "Bimar hun",
//   },
//   {
//     id: 2,
//     appoinmentType: "specific health concern",
//     category: "Vaccination (Paeditritian",
//     doctorName: "Rohit Sahrtma",
//     preferredSlot: "Tuesday 11am",
//     status: "Request Sent",
//     reasonForAppoinment: "Bimar hun",
//   },
// ];

export default function Data() {
  const { user, appointments } = useSelector((state) => state.app);
  const role = user.role;

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "appointmentType", headerName: "Appointment Type", width: 250 },
    { field: "category", headerName: "Category", width: 250 },
    {
      field: role === "doctor" ? "studentName" : "doctorName",
      headerName: role === "doctor" ? "Student Name" : "Doctor Name",
      width: 250,
    },
    {
      field: "preferredSlot",
      headerName: role === "doctor" ? "Chosen Slot" : "Preferred Slot",
      width: 250,
    },
    {
      field: "reasonForAppointment",
      headerName: "Reason For Appoinment",
      width: 250,
    },
    {
      field: "status",
      headerName: "Status",
      width: 250,
      renderCell: (params) => (
        <Chip
          icon={
            params.row.status === "Pending" ? (
              <AutorenewIcon />
            ) : params.row.status === "Approved" ? (
              <CheckCircleOutlineIcon />
            ) : (
              <ErrorOutlineIcon />
            )
          }
          label={params.row.status}
          variant="outlined"
          color={
            params.row.status === "Pending"
              ? "warning"
              : params.row.status === "Approved"
              ? "success"
              : "error"
          }
        />
      ),
    },
  ];

  // const dispach = useDispatch();

  const handleApprove = (row) => {
    // console.log("Approved: ", row.status);
    try {
      // dispach(
      //   ApproveRejectAppointment({
      //     id: row._id,
      //     status: "Approved",
      //   })
      // );

      socket.emit("approve_reject_appointment", {
        id: row._id,
        status: "Approved",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleReject = (row) => {
    // console.log("Rejected: ", row);

    try {
      // dispach(
      //   ApproveRejectAppointment({
      //     id: row._id,
      //     status: "Rejected",
      //   })
      // );

      socket.emit("approve_reject_appointment", {
        id: row._id,
        status: "Rejected",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemark = (row) => {
    try {
      socket.emit("add_remark", {
        id: row._id,
        remark: remark,
      });
      console.log(" row id", row._id);
    } catch (err) {
      console.log(err);
    }
  };

  if (role === "doctor") {
    columns.splice(2, 1);
    columns.push({
      field: "GetApprove",
      headerName: "Approve / Reject",
      width: 250,
      renderCell: (params) => (
        <Stack direction={"row"} alignItems={"center"}>
          {params.row.status === "Pending" && (
            <>
              {" "}
              <Button
                variant="outlined"
                color="success"
                size="small"
                onClick={() => handleApprove(params.row)}
                sx={{ marginTop: "10px" }}
              >
                Approve
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="small"
                sx={{ marginTop: "10px", marginLeft: "10px" }}
                onClick={() => handleReject(params.row)}
              >
                Reject
              </Button>
            </>
          )}
        </Stack>
      ),
    });
    // console.log(columns);
  }

  const [remark, setRemark] = useState("");

  columns.push({
    field: "remark",
    headerName: role === "doctor" ? "Send Remark" : "Received Remark",
    width: 250,
    renderCell: (params) =>
      params.row.remark ? (
        <div> {params.row.remark} </div>
      ) : (
        role === "doctor" && (
          <TextField
            id="outlined-basic"
            variant="outlined"
            onChange={(event) => {
              setRemark(event.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="send"
                    color="primary"
                    onClick={() => {
                      handleRemark(params.row);
                    }}
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                borderRadius: "20px",
                height: "30px",
              },
            }}
            size="small"
            sx={{ marginTop: "10px" }}
            onKeyDown={(e) => {
              if (e.key === " ") {
                e.stopPropagation();
              }
            }}
          />
        )
      ),
  });

  const reversedAppointments = [...appointments].reverse();
  console.log(reversedAppointments);

  return (
    <div className="data">
      <DataGrid
        rows={reversedAppointments}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        sx={{
          "&.MuiDataGrid-root": {
            borderColor: "cadetblue",
          },
          "& .MuiDataGrid-iconSeparator": {
            visibility: "visible",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-root": {
            color: "cadetblue",
          },
        }}
        pageSizeOptions={[5, 10]}
        slots={{
          toolbar: CustomToolbar,
          noRowsOverlay: CustomNoRowsOverlay,
        }}
      />
    </div>
  );
}
