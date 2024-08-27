import React, { useEffect, useRef, useState } from "react";
import { Box, Stack, IconButton, Fab, Tooltip, TextField } from "@mui/material";
import {
  Smiley,
  LinkSimple,
  PaperPlaneRight,
  Image,
  Sticker,
  Camera,
  File,
  User,
} from "@phosphor-icons/react";
import emojiAppleData from "@emoji-mart/data/sets/15/apple.json";
import Picker from "@emoji-mart/react";
// import emojiAppleData from "emoji-datasource-apple";
import { socket } from "../../socket";
import { useSelector } from "react-redux";

const Actions = [
  {
    color: "#4da5fe",
    icon: <Image size={24} />,
    y: 50,
    title: "Photo/Video",
  },
  {
    color: "#1b8cfe",
    icon: <Sticker size={24} />,
    y: 100,
    title: "Stickers",
  },
  {
    color: "#0172e4",
    icon: <Camera size={24} />,
    y: 150,
    title: "Image",
  },
  {
    color: "#0159b2",
    icon: <File size={24} />,
    y: 200,
    title: "Document",
  },
  {
    color: "#013f7f",
    icon: <User size={24} />,
    y: 250,
    title: "Contact",
  },
];

const ChatInput = (props) => {
  const [openAction, SetOpenAction] = useState(false);

  const { selected_id, user } = useSelector((state) => state.app);
  function handleSend() {
    socket.emit("send_message", {
      from: user._id,
      to: selected_id,
      text: props.text,
      type: "Text",
    });
    props.setText("");
  }
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      sx={{ height: "100%", width: "100%" }}
    >
      <IconButton
        onClick={() => {
          props.SetOpenPicker((preValue) => !preValue);
        }}
      >
        <Smiley />
      </IconButton>
      <Stack sx={{ width: "max-content" }}>
        <Stack
          sx={{ position: "relative", display: openAction ? "inline" : "none" }}
        >
          {Actions.map((el) => {
            return (
              <Tooltip title={el.title} placement="right">
                <Fab
                  size="small"
                  sx={{
                    position: "absolute",
                    top: -el.y,
                    backgroundColor: el.color,
                  }}
                >
                  {el.icon}
                </Fab>
              </Tooltip>
            );
          })}
        </Stack>
        <IconButton
          onClick={() => {
            SetOpenAction((preValue) => !preValue);
          }}
          onBlur={() => {
            SetOpenAction((preValue) => !preValue);
          }}
        >
          <LinkSimple />
        </IconButton>
      </Stack>

      <TextField
        type="text"
        placeholder="Type a message"
        fullWidth
        variant="standard"
        value={props.text}
        onChange={(event) => {
          props.setText(event.target.value);
        }}
        InputProps={{
          disableUnderline: true,
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" && props.text !== "") {
            handleSend();
          }
        }}
      />
      <IconButton
        onClick={() => {
          if (props.text !== "") handleSend();
        }}
      >
        <PaperPlaneRight />
      </IconButton>
    </Stack>
  );
};
function ChatFooter() {
  const [openPicker, SetOpenPicker] = useState(false);
  const [text, setText] = useState("");
  const pickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        SetOpenPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEmojiSelect = (e) => {
    console.log(e); // Log the emoji object to debug
    // let sym = e.unified.split("-");
    // let codesArray = [];
    // sym.forEach((el) => codesArray.push("0x" + el));
    // let emoji = String.fromCodePoint(...codesArray);
    setText((prevText) => prevText + e.native);
  };

  return (
    <Box
      /* footer */
      sx={{
        height: "10%",
        width: "100%",
        borderBottomRightRadius: 7.2,
        backgroundColor: "#ecf0f1",
        borderTop: "1px solid rgba(189, 195, 199,1.0)",
      }}
    >
      <Stack>
        <Box
          zIndex={10}
          position={"fixed"}
          bottom={150}
          left={350}
          ref={pickerRef}
        >
          {openPicker && (
            <Picker
              data={emojiAppleData} // Provide the correct data for the Picker
              theme="light"
              onEmojiSelect={handleEmojiSelect}
              set="apple"
            />
          )}
        </Box>
        <ChatInput
          SetOpenPicker={SetOpenPicker}
          key={0}
          text={text}
          setText={setText}
        />
      </Stack>
    </Box>
  );
}

export default ChatFooter;
