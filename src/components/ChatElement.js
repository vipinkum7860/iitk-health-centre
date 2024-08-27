import React from "react";
import { Box, Stack, Avatar, Typography, Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import { faker } from "@faker-js/faker";
import { useDispatch, useSelector } from "react-redux";
import { SelectConversation } from "../redux/slices/app";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",

      right: 0.0001,
      bottom: 0.0001,
      width: "80%",
      height: "80%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
// msg, time, unread, pinned, online;

function ChatElement(props) {
  // const msg = faker.music.songName();
  let shortMsg;
  if (props.lastMessageId) {
    if (props.lastMessageId.text.length > 12)
      shortMsg = props.lastMessageId.text.substr(0, 12) + "...";
    else {
      shortMsg = props.lastMessageId.text;
    }
  } else {
    shortMsg = "";
  }

  const img = faker.image.avatar();
  // const time = "9:36";
  function CovertTime(data) {
    const date = new Date(data);
    const hour = date.getHours() % 12;
    const minutes = date.getMinutes();
    return `${hour}:${minutes}`;
  }
  let time;
  if (props.lastMessageId) {
    time = CovertTime(props.lastMessageId.created_at);
  } else {
    time = "";
  }

  const dispatch = useDispatch();
  const { selected_id } = useSelector((state) => state.app);
  return (
    <Box
      p={1}
      sx={{
        width: "100%",
        borderRadius: 2,
        backgroundColor: selected_id === props._id ? "cadetblue" : "#fff",
      }}
      onClick={() => {
        dispatch(SelectConversation({ selected_id: props._id }));
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack spacing={2} direction={"row"} alignItems={"center"}>
          {props.status === "Online" ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
              sx={{ width: 30, height: 30 }}
            >
              <Avatar sx={{ width: 30, height: 30 }} alt="A" src={img} />
            </StyledBadge>
          ) : (
            <Avatar sx={{ width: 30, height: 30 }} alt="A" src={img} />
          )}

          <Stack>
            <Typography
              variant="subtitle2"
              fontSize={14}
              color={selected_id === props._id && "#fff"}
            >
              {props.name}
            </Typography>
            <Typography
              variant="caption"
              fontSize={11}
              color={selected_id === props._id && "#fff"}
            >
              {shortMsg}
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={1} alignItems={"center"}>
          <Typography
            variant="caption"
            fontWeight={600}
            color={props.SelectedId === props._id && "#fff"}
          >
            {time}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

export default ChatElement;
