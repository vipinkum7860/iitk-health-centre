import {
  Box,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
// import { Chat_History } from "../Data";
import { DownloadSimple, Image } from "@phosphor-icons/react";
import { useSelector } from "react-redux";

const Timeline = ({ el }) => {
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  let label;
  const dateInMillis = parseInt(el.text, 10); // Convert the string to an integer
  const date = new Date(dateInMillis);
  if (isToday(date)) {
    label = "Today";
  } else {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based, so add 1
    const year = date.getFullYear();
    label = `${day}-${month}-${year}`;
  }
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Divider sx={{ width: "46%" }} />
      <Typography variant="caption">{label}</Typography>
      <Divider sx={{ width: "46%" }} />
    </Stack>
  );
};

const TextMsg = ({ el }) => {
  return (
    <Stack direction={"row"} justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming ? "#fff" : "cadetblue",
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Typography variant="body2" color={!el.incoming && "#fff"}>
          {el.text}
        </Typography>
      </Box>
    </Stack>
  );
};

const ImgMsg = ({ el }) => {
  return (
    <Stack direction={"row"} justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming ? "#fff" : "cadetblue",
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={1}>
          <img
            src={el.img}
            alt={el.message}
            style={{ maxHeight: 210, borderRadius: "10px" }}
          ></img>
          <Typography variant="body2" color={!el.incoming && "#fff"}>
            {el.message}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

const ReplyMsg = ({ el }) => {
  return (
    <Stack direction={"row"} justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming ? "#fff" : "cadetblue",
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={1}
            spacing={2}
            alignItems={"center"}
            sx={{
              backgroundColor: el.incoming ? "cadetblue" : "#fff",
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" color={el.incoming && "#fff"}>
              {el.message}
            </Typography>
          </Stack>
          <Typography variant="body2" color={!el.incoming && "#fff"}>
            {el.reply}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

const LinkMsg = ({ el }) => {
  return (
    <Stack direction={"row"} justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming ? "#fff" : "cadetblue",
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={1}>
          <Stack spacing={1} alignItems={"center"}>
            <img
              src={el.preview}
              alt={el.message}
              style={{
                maxHeight: 210,
                borderRadius: "10px",
                color: !el.incoming && "#fff",
              }}
            ></img>
          </Stack>
          <Stack>
            <Typography variant="subtitle2" color={!el.incoming && "#fff"}>
              Create React App
            </Typography>
            <Typography
              variant="subtitle2"
              component={Link}
              to="//https://youtube.com"
              color={!el.incoming && "#fff"}
            >
              www.youtube.com
            </Typography>
          </Stack>
          <Typography variant="body2" color={!el.incoming && "#fff"}>
            {el.message}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

const DocMsg = ({ el }) => {
  return (
    <Stack direction={"row"} justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming ? "#fff" : "cadetblue",
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={1}
            sx={{ borderRadius: 1 }}
          >
            <Image size={48} color={!el.incoming && "#fff"} />
            <Typography variant="caption" color={!el.incoming && "#fff"}>
              Abstract.png
            </Typography>
            <IconButton>
              <DownloadSimple color={!el.incoming && "#fff"} />
            </IconButton>
          </Stack>
          <Typography variant="body2" color={!el.incoming && "#fff"}>
            {el.message}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

function Message() {
  const { conversations } = useSelector((state) => state.app);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversations]);

  return (
    <Box pl={2} pr={2} sx={{ height: "100%" }}>
      <Stack spacing={3}>
        {conversations.map((el, index) => {
          switch (el.type) {
            case "Divider":
              return <Timeline el={el} key={index} />;
            case "Text":
              switch (el.type) {
                case "img":
                  return <ImgMsg el={el} key={index} />;
                case "doc":
                  return <DocMsg el={el} key={index} />;
                case "link":
                  return <LinkMsg el={el} key={index} />;
                case "reply":
                  return <ReplyMsg el={el} key={index} />;
                default:
                  return <TextMsg el={el} key={index} />;
              }
            default:
              return "";
          }
        })}
        <div ref={messagesEndRef} />
      </Stack>
    </Box>
  );
}

export default Message;
