import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PhoneIcon from "@mui/icons-material/Phone";
import LogoutIcon from "@mui/icons-material/Logout";
import { ChatTeardropText } from "@phosphor-icons/react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { LogoutUser } from "../../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { EraseDataOnLogout, getMyFriends } from "../../redux/slices/app";
import { socket } from "../../socket";
export default function IconTabs(props) {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();
  const { user_id } = useSelector((state) => state.auth);

  async function handleLogoutClick() {
    // navigate("/auth/login");
    try {
      dispatch(LogoutUser());
    } catch (err) {
      console.log(err);
    }
    try {
      dispatch(EraseDataOnLogout());
    } catch (err) {
      console.log(err);
    }
    socket.emit("end", { user_id });
  }

  function handleProfileClick() {
    navigate("/hc/profile");
  }

  function handleDashClick() {
    navigate("/hc/dashboard");
  }

  function handleContactsClick() {
    navigate("/hc/contacts");
  }

  function handleChatClick() {
    try {
      dispatch(getMyFriends());
    } catch (err) {
      console.log(err);
    }
    navigate("/hc/chats");
  }
  return (
    <div className="dashboard">
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="icon position tabs example"
      >
        <Tab
          icon={<DashboardIcon />}
          iconPosition="start"
          label="Dashboard"
          onClick={handleDashClick}
        />
        <Tab
          icon={<AccountCircleIcon />}
          iconPosition="start"
          label="Profile"
          onClick={handleProfileClick}
        />
        <Tab
          icon={<PhoneIcon />}
          iconPosition="start"
          label="Contacts"
          onClick={handleContactsClick}
        />
        <Tab
          icon={<ChatTeardropText size={24} weight="fill" />}
          iconPosition="start"
          label="Chats"
          onClick={handleChatClick}
        />
        <Tab
          icon={<LogoutIcon />}
          iconPosition="start"
          label="Logout"
          onClick={handleLogoutClick}
        />
      </Tabs>
    </div>
  );
}
