import React from "react";
import {
  Stack,
  Typography,
  IconButton,
  Box,
  Badge,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { faker } from "@faker-js/faker";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
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
function ChatHeader() {
  const { selected_id, friends } = useSelector((state) => state.app);
  const index = friends.findIndex((friend) => {
    return friend._id === selected_id;
  });
  let my_friend;
  if (index !== -1) {
    my_friend = friends[index];
  }
  return (
    <Box
      // header
      pl={1}
      pr={1}
      sx={{
        height: "10%",
        width: "100%",
        borderTopRightRadius: 7.2,
        backgroundColor: "#ecf0f1",
        borderBottom: "1px solid rgba(189, 195, 199,1.0)",
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ height: "100%", width: "100%" }}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          {my_friend.status === "Online" ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
              sx={{ width: 30, height: 30 }}
            >
              <Avatar
                sx={{ width: 30, height: 30 }}
                src={faker.image.avatar()}
                alt={faker.person.fullName()}
              />
            </StyledBadge>
          ) : (
            <Avatar
              sx={{ width: 30, height: 30 }}
              src={faker.image.avatar()}
              alt={faker.person.fullName()}
            />
          )}

          <Stack alignItems={"start"} spacing={0.1}>
            <Typography variant="title" fontSize={10}>
              {my_friend.name}
            </Typography>
            <Typography variant="caption" fontSize={8}>
              {my_friend.status}
            </Typography>
          </Stack>
        </Stack>
        <IconButton>
          <SearchIcon />
        </IconButton>
      </Stack>
    </Box>
  );
}

export default ChatHeader;
