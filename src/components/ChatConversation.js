import React from "react";
import { Box, Stack } from "@mui/material";
import ChatHeader from "./chats/chatHeader";
import ChatFooter from "./chats/chatFooter";
import Message from "./Message";
import SimpleBar from "simplebar-react";
function ChatConversation() {
  return (
    <Box
      sx={{
        height: "100%",
        width: "75%",
        borderTopRightRadius: 7.2,
        borderBottomRightRadius: 7.2,
      }}
    >
      <Stack justifyContent={"center"} sx={{ height: "100%", width: "100%" }}>
        <ChatHeader />
        <Box
          /* conversation */
          sx={{
            height: "80%",
            width: "100%",
            backgroundImage:
              'url("https://www.transparenttextures.com/patterns/ravenna.png");',
          }}
        >
          <SimpleBar style={{ maxHeight: "100%" }}>
            <Message />
          </SimpleBar>
        </Box>
        <ChatFooter />
      </Stack>
    </Box>
  );
}

export default ChatConversation;
