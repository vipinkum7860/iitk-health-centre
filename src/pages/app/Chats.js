import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCommentIcon from "@mui/icons-material/AddComment";
// import { ChatList } from "../../Data";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import ChatConversation from "../../components/ChatConversation";
import ChatElement from "../../components/ChatElement";
import AddFriendDialog from "../../components/AddFriendDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  AddConversation,
  FetchAllUsers,
  GetConversations,
  getMyFriends,
  UpdatedUser,
  UpdateFriendData,
  UpdateFriendStatus,
} from "../../redux/slices/app";
import Nochat from "../../assets/illestration/Nochat";
import { socket } from "../../socket";
// import Img from "../../assets/images/Messages-pana.svg";
function Chats() {
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  let myFriendsData = useSelector((state) => state.app.friends);
  const { selected_id } = useSelector((state) => state.app);
  const { user_id } = useSelector((state) => state.auth);

  if (!myFriendsData) {
    myFriendsData = [];
  }
  useEffect(() => {
    try {
      socket.emit("request_toget_myfriends", {
        id: user_id,
      });
    } catch (err) {
      console.log(err);
    }

    socket.emit(
      "get_conversations",
      { id: user_id, friend_id: selected_id },
      (data) => {
        // console.log(data);
        dispatch(GetConversations(data));
      }
    );

    socket.on("new_friend_added", (updated_user) => {
      dispatch(UpdatedUser(updated_user));
    });

    socket.on("friends_data_sent", (data) => {
      dispatch(getMyFriends(data.data));
    });

    socket.on("online_status", (data) => {
      const online_friend_id = data.id;
      dispatch(
        UpdateFriendStatus({ id: online_friend_id, status: data.status })
      );
    });

    socket.on("got_new_message", (data) => {
      // add new message into conversations
      // console.log("got new messages", data.data);
      dispatch(AddConversation(data.data));
    });

    socket.on("update_friendData", (data) => {
      dispatch(UpdateFriendData(data.data));
    });

    return () => {
      socket?.off("new_friend_added");
      socket?.off("friends_data_sent");
      socket?.off("online_status");
      socket?.off("got_new_message");
    };
  }, [dispatch, user_id, selected_id]);

  const handleOpenDialog = () => {
    try {
      dispatch(FetchAllUsers());
    } catch (err) {
      console.log(err);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
    <>
      <Stack alignItems={"center"} justifyContent={"center"} height={500}>
        <Box
          sx={{
            width: "60%",
            height: "90%",
            border: 1,
            borderColor: "cadetblue",
            borderRadius: 2,
            backgroundColor: "white",
          }}
        >
          <Stack direction={"row"} sx={{ height: "100%", width: "100%" }}>
            <Box
              p={2}
              sx={{
                width: "25%",
                height: "100%",
                borderTopLeftRadius: 7.2,
                borderBottomLeftRadius: 7.2,
                backgroundColor: "#ecf0f1",
                borderRight: "1px solid rgba(189, 195, 199,1.0)",
              }}
            >
              <Stack spacing={2} sx={{ height: "100%" }}>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography variant="h6">Chats</Typography>
                  <IconButton
                    onClick={() => {
                      handleOpenDialog();
                    }}
                  >
                    <AddCommentIcon />
                  </IconButton>
                </Stack>
                <div className="search">
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    placeholder="Search..."
                    onChange={(event) => {
                      setSearch(event.target.value);
                    }}
                    sx={{
                      "& .MuiInputBase-root": {
                        height: 25,
                      },
                      "& .MuiInput-underline:after": {
                        borderBottomColor: "cadetblue",
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <Stack direction={"column"} sx={{ flexGrow: 1, height: "79%" }}>
                  <SimpleBar style={{ maxHeight: "100%" }}>
                    <Stack spacing={2}>
                      {myFriendsData
                        .filter((friend) => {
                          return search.toLowerCase() === ""
                            ? friend
                            : friend.name
                                .toLowerCase()
                                .includes(search.toLowerCase());
                        })
                        .map((friend) => {
                          return (
                            <ChatElement
                              key={friend._id}
                              _id={friend._id}
                              status={friend.status}
                              name={friend.name}
                              lastMessageId={friend.lastMessageId}
                            />
                          );
                        })}
                    </Stack>
                  </SimpleBar>
                </Stack>
              </Stack>
            </Box>
            {selected_id !== null ? (
              <ChatConversation />
            ) : (
              <Stack
                sx={{
                  height: "100%",
                  width: "75%",
                  backgroundColor: "#ecf0f1",
                }}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Nochat />
                <Box sx={{ position: "relative", bottom: 150 }}>
                  <Typography variant="subtitle2">
                    Select a conversation or start a new one
                  </Typography>
                </Box>
              </Stack>
            )}
          </Stack>
        </Box>
      </Stack>
      {openDialog && (
        <AddFriendDialog
          open={openDialog}
          handleCloseDialog={handleCloseDialog}
        />
      )}
    </>
  );
}

export default Chats;
