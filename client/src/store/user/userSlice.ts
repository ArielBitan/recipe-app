import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface UserState {
  username: string;
  email: string;
  profilePic: string;
}

// Define the initial state using that type
const initialState: UserState = {
  username: "",
  email: "",
  profilePic: "",
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLoggedUser: (state, action: PayloadAction<UserState>) => {
      console.log(action.payload);
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.profilePic = action.payload.profilePic;
    },
  },
});

export const { setLoggedUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
