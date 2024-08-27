import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import IconTabs from "./Tabs";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, socket } from "../../socket";
import {
  PushNewAppointment,
  ShowSnackbar,
  UpdateAppointment,
} from "../../redux/slices/app";
function DashboardLayout() {
  const { isLoggedIn, user_id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoggedIn) {
      // window.onload = function () {
      //   if (!window.location.hash) {
      //     window.location.reload();
      //   }
      // };

      // window.onload();

      if (!socket) {
        console.log("userID:", user_id);
        connectSocket(user_id);
      } else {
        console.log("socket:", socket);
      }
      // connectSocket(user_id);

      socket.on("new_appointment_request", (data) => {
        dispatch(PushNewAppointment(data.data));
        console.log("recieved new Appointment", data.data);
        dispatch(
          ShowSnackbar({
            severity: "success",
            message: data.message,
          })
        );
      });

      socket.on("request_sent", (data) => {
        dispatch(
          ShowSnackbar({ severity: data.status, message: data.message })
        );
      });

      socket.on("approve_reject_recieved", (data) => {
        dispatch(UpdateAppointment(data.data));

        dispatch(
          ShowSnackbar({ severity: data.status, message: data.message })
        );
      });

      socket.on("approve_reject_sent", (data) => {
        dispatch(UpdateAppointment(data.data));

        dispatch(
          ShowSnackbar({ severity: data.status, message: data.message })
        );
      });

      socket.on("remark_sent", (data) => {
        dispatch(UpdateAppointment(data.data));

        dispatch(
          ShowSnackbar({ severity: data.status, message: data.message })
        );
      });

      socket.on("remark_recieved", (data) => {
        dispatch(UpdateAppointment(data.data));

        dispatch(
          ShowSnackbar({ severity: data.status, message: data.message })
        );
      });
    }
  }, [isLoggedIn, user_id, dispatch]);

  if (!isLoggedIn) {
    return <Navigate to={"/auth/login"} />;
  }

  return (
    <div>
      <Header />
      <IconTabs />
      <Outlet />
      <Footer />
    </div>
  );
}

export default DashboardLayout;
