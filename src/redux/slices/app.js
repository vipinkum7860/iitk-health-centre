import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  user: {},
  isLoggedIn: true,
  tab: 0, // [0, 1, 2, 3]
  snackbar: {
    open: null,
    severity: null,
    message: null,
  },
  shouldFetch: true,
  appointments: [],
  isLoading: false,
  slotData: {},
  allSlotData: [],
  all_users: [],
  friends: [],
  selected_id: null,
  conversations: [],
};
//   users: [], // all users of app who are not friends and not requested yet
//   all_users: [],
//   friends: [], // all friends
//   friendRequests: [], // all friend requests
//   chat_type: null,
//   room_id: null,
//   call_logs: [],
// };

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    openSnachbar(state, action) {
      state.snackbar.open = true;
      state.snackbar.message = action.payload.message;
      state.snackbar.severity = action.payload.severity;
    },

    closeSnachbar(state, action) {
      state.snackbar.open = false;
      state.snackbar.message = null;
      state.snackbar.severity = null;
    },
    fetchUser(state, action) {
      state.user = action.payload.user;
      state.shouldFetch = false;
    },
    fetchAllUsers(state, action) {
      state.all_users = action.payload.all_users;
    },
    setShouldFetch(state, action) {
      state.shouldFetch = action.payload;
    },
    updateUser(state, action) {
      state.user = action.payload.user;
    },
    fetchAppointments(state, action) {
      state.appointments = action.payload.appointments;
      state.shouldFetch = false;
    },
    updateIsLoading(state, action) {
      state.error = action.payload.error;
      state.isLoading = action.payload.isLoading;
    },
    fetchSlots(state, action) {
      state.slotData = action.payload.slotData;
    },
    eraseDataOnLogout(state, action) {
      state.slotData = {};
      state.appointments = [];
      state.user = {};
      state.allSlotData = [];
      state.friends = [];
      state.selected_id = null;
    },
    fetchAllSlots(state, action) {
      state.allSlotData = action.payload.allSlotData;
    },

    updateAppointment(state, action) {
      const updatedAppointment = action.payload;
      const index = state.appointments.findIndex(
        (appointment) => appointment._id === updatedAppointment._id
      );
      // console.log("hsdoicwso", updatedAppointment);
      if (index !== -1) {
        state.appointments[index] = updatedAppointment;
      }
    },

    pushNewAppointment(state, action) {
      const new_appointment = action.payload;
      const appointments = state.appointments;
      const len = appointments.length;
      console.log("lenght", len);
      console.log("appointment:", appointments);
      // console.log(appointments[len - 1], new_appointment);
      if (len !== 0 && appointments[len - 1]._id === new_appointment._id)
        return;
      state.appointments.push(new_appointment);
    },
    updateSlotData(state, action) {
      if (state.slotData === null) return;
      state.slotData.certified = action.payload.certified;
      state.slotData.category = action.payload.category;
      state.slotData.editFile = action.payload.editFile;
    },

    updateAllUserstoEmpty(state, action) {
      state.all_users = [];
    },

    addFriend(state, action) {
      state.user = action.payload.user;
    },

    getmyFriends(state, action) {
      state.friends = action.payload.friends;
    },

    selectConversation(state, action) {
      state.selected_id = action.payload.selected_id;
    },

    updateFriendStatus(state, action) {
      const friends = state.friends;
      const { id, status } = action.payload;

      // Find the friend with the matching ID and update their status
      const friendIndex = friends.findIndex((friend) => friend._id === id);
      if (friendIndex !== -1) {
        state.friends[friendIndex].status = status;
      }
    },

    getConversations(state, action) {
      let sent = action.payload.sent;
      let received = action.payload.received;

      console.log(sent, received);
      if (!sent) {
        sent = [];
      }
      if (!received) {
        received = [];
      }

      const processedSent = sent.map((message) => ({
        ...message,
        incoming: false,
        outgoing: true,
      }));

      const processedReceived = received.map((message) => ({
        ...message,
        incoming: true,
        outgoing: false,
      }));

      const allMessages = [...processedSent, ...processedReceived];

      allMessages.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      console.log(allMessages);
      state.conversations = allMessages;
    },

    addConversation(state, action) {
      state.conversations.push(action.payload);
    },
    updateFriendData(state, action) {
      const friends = state.friends;
      const { id, lastMessageId } = action.payload;

      // Find the friend with the matching ID and update their status
      const friendIndex = friends.findIndex((friend) => friend._id === id);
      if (friendIndex !== -1) {
        state.friends[friendIndex].lastMessageId = lastMessageId;
      }
    },
  },
});

export default slice.reducer;

// export function AddFriend(friend) {
//   return async (dispach, getState) => {
//     dispach(slice.actions.addFriend({ friend: friend }));
//   };
// }

export const UpdateFriendData = (friend) => {
  return async (dispatch, getState) => {
    // console.log(conversation._doc);
    dispatch(slice.actions.updateFriendData(friend));
  };
};

export const AddConversation = (conversation) => {
  return async (dispatch, getState) => {
    // console.log(conversation._doc);
    dispatch(slice.actions.addConversation(conversation));
  };
};

export const UpdatedUser = (user) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateUser(user));
  };
};

export const GetConversations = (data) => {
  return async (dispatch, getState) => {
    console.log(data);
    dispatch(slice.actions.getConversations(data));
  };
};

export const UpdateFriendStatus = (data) => {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.updateFriendStatus({ id: data.id, status: data.status })
    );
  };
};

export const SelectConversation = ({ selected_id }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.selectConversation({ selected_id }));
  };
};

export function getMyFriends() {
  return async (dispatch, getState) => {
    axios
      .get("/hc/chats/get-my-friends", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        console.log("getmyfriends", response.data.data);
        dispatch(slice.actions.getmyFriends({ friends: response.data.data }));
      })
      .catch((err) => {
        // console.log(err);
      });
  };
}

export function AddFriend(friend) {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/hc/chats/add-friend",
        {
          friend: friend,
        },
        {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        // console.log(response);
        const updatedUser = response.data.data;
        console.log(updatedUser);
        dispatch(slice.actions.addFriend({ user: updatedUser }));
        dispatch(
          ShowSnackbar({ severity: "success", message: response.data.message })
        );
      })
      .catch(function (error) {
        // console.log("hiii", error);
        dispatch(ShowSnackbar({ severity: "error", message: error.message }));
      });
  };
}

export function UpdateSlotData(formValues) {
  return async (dispach, getState) => {
    dispach(slice.actions.updateSlotData(formValues));
  };
}

export function UpdateAllUserstoEmpty() {
  return async (dispach, getState) => {
    dispach(slice.actions.updateAllUserstoEmpty());
  };
}

export function EraseDataOnLogout() {
  return async (dispach, getState) => {
    dispach(slice.actions.eraseDataOnLogout());
  };
}

export function UpdateAppointment(updated_appointment) {
  return async (dispach, getState) => {
    dispach(slice.actions.updateAppointment(updated_appointment));
  };
}

export function PushNewAppointment(new_appointment) {
  return async (dispach, getState) => {
    dispach(slice.actions.pushNewAppointment(new_appointment));
  };
}

export function SetShouldFetch({ value }) {
  return (dispatch, getState) => {
    dispatch(slice.actions.setShouldFetch({ value }));
  };
}

export function ShowSnackbar({ message, severity }) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.openSnachbar({ message, severity }));

    setTimeout(() => {
      dispatch(slice.actions.closeSnachbar());
    }, 4000);
  };
}

export function CloseSnackbar() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.closeSnachbar());
  };
}

export function getSlot() {
  return async (dispatch, getState) => {
    axios
      .get("/hc/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        // console.log(response);
        dispatch(slice.actions.fetchSlots({ slotData: response.data.data }));
      })
      .catch((err) => {
        // console.log(err);
      });
  };
}

export function getAllSlot() {
  return async (dispatch, getState) => {
    axios
      .get("/hc/get-allSlots", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        // console.log(response);
        dispatch(
          slice.actions.fetchAllSlots({ allSlotData: response.data.data })
        );
      })
      .catch((err) => {
        // console.log(err);
      });
  };
}

export function AddSlot(formValues) {
  return async (dispatch, getState) => {
    // console.log(formValues);
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
    await axios
      .post(
        "/hc/profile",
        {
          ...formValues,
        },
        {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        // console.log(response);
        dispatch(
          ShowSnackbar({ severity: "success", message: response.data.message })
        );
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch(function (error) {
        // console.log("hiii", error);
        dispatch(ShowSnackbar({ severity: "error", message: error.message }));
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: true })
        );
      });
  };
}

// export function AddAppoinment(formValues) {
//   return async (dispatch, getState) => {
//     await axios
//       .post(
//         "/hc/dashboard",
//         { ...formValues },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${getState().auth.token}`,
//           },
//         }
//       )
//       .then((response) => {
//         // console.log(response);
//       })
//       .catch((error) => {
//         // console.log(error);
//       });
//   };
// }
export const FetchAppointments = () => {
  return async (dispatch, getState) => {
    axios
      .get("/hc/get-appointments", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        console.log(response);
        dispatch(
          slice.actions.fetchAppointments({ appointments: response.data.data })
        );
      })
      .catch((err) => {
        // console.log(err);
      });
  };
};

export const FetchUserProfile = () => {
  return async (dispatch, getState) => {
    axios
      .get("/hc/get-me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        // console.log(response);
        dispatch(slice.actions.fetchUser({ user: response.data.data }));
      })
      .catch((err) => {
        // console.log(err);
      });
  };
};

export const FetchAllUsers = () => {
  return async (dispatch, getState) => {
    axios
      .get("/hc/get-all-users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        dispatch(
          slice.actions.fetchAllUsers({ all_users: response.data.data })
        );
      })
      .catch((err) => {
        // console.log(err);
      });
  };
};

// export const ApproveRejectAppointment = (data) => {
//   return async (dispatch, getState) => {
//     axios
//       .patch(
//         `/hc/dashboard/${data.id}`,
//         { status: data.status },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${getState().auth.token}`,
//           },
//         }
//       )
//       .then((response) => {
//         // console.log(response);
//         const updated_appointment = response.data.data;
//         dispatch(slice.actions.updateAppointment(updated_appointment));
//         dispatch(
//           ShowSnackbar({ severity: "success", message: response.data.message })
//         );
//       })
//       .catch((err) => {
//         // console.log(err);
//       });
//   };
// };

export function SubmitCertificate(formData) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
    console.log("form data", formData);
    await axios
      .post(
        "/hc/profile/certificate",

        formData,
        {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(function (response) {
        // console.log(response);
        dispatch(
          ShowSnackbar({ severity: "success", message: response.data.message })
        );
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch(function (error) {
        // console.log("hiii", error);
        dispatch(ShowSnackbar({ severity: "error", message: error.message }));
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: true })
        );
      });
  };
}
