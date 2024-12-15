import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface UserState {
  _id?: string;
  username: string;
  email: string;
  profilePic: string;
}

// Define the initial state using that type
const initialState: UserState = {
  _id: "",
  username: "",
  email: "",
  profilePic: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedUser: (state, action: PayloadAction<UserState>) => {
      state._id = action.payload._id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.profilePic = action.payload.profilePic;
    },
  },
});

export const { setLoggedUser } = userSlice.actions;

export const isLoggedUser = (state: RootState) => !!state.user.username;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
