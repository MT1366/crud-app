import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  username: string;
  password: string;
  token: string;
}

const initialState: UserState = {
  id: "",
  firstName: "",
  lastName: "",
  role: "",
  username: "",
  password: "",
  token: "",
};

type LoginPayload = {
  username: string;
  password: string;
  token: string;
};

export const loginUser = createAsyncThunk(
  "user/login",
  async (payload: LoginPayload) => {
    const response = await axios.post("http://localhost:4000/login", payload);
    const userData = response.data;
    console.log(userData);
    return userData;
  }
);

const userSlicer = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser(state, action) {
      state.id = action.payload.id;
      state.firstName = action.payload.firstname;
      state.lastName = action.payload.lastname;
      state.role = action.payload.role;
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      // Access the userData and update the state
      const userData = action.payload;
      state.id = userData.id;
      state.firstName = userData.firstname;
      state.lastName = userData.lastname;
      state.role = userData.role;
      state.username = userData.username;
      state.password = userData.password;
      state.token = userData.token;
    });
  },
});

export const { getUser } = userSlicer.actions;
export default userSlicer.reducer;
