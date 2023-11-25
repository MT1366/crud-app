// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";

// interface LoginState {
//   token: string | null;
//   role: string | null;
//   error: string | null;
// }
// const initialState: LoginState = {
//   token: null,
//   role: null,
//   error: null,
// };

// const loginSlice = createSlice({
//   name: "login",
//   initialState,
//   reducers: {
//     loginStart: (state) => {
//       state.error = null;
//     },
//     loginSuccess: (
//       state,
//       action: PayloadAction<{ token: string; role: string }>
//     ) => {
//       state.token = action.payload.token;
//       state.role = action.payload.role;
//     },
//     loginFailure: (state, action: PayloadAction<string>) => {
//       state.error = action.payload;
//     },
//   },
// });
// export const { loginStart, loginSuccess, loginFailure } = loginSlice.actions;

// export const login =
//   (username: string, password: string) => async (dispatch: any) => {
//     dispatch(loginStart());
//     try {
//       const response = await axios.post("http://localhost:4000/login", {
//         username,
//         password,
//       });
//       const { token, role } = response.data;
//       dispatch(loginSuccess({ token, role }));
//     } catch (error) {
//       dispatch(loginFailure(error.message));
//     }
//   };

// export default loginSlice.reducer;
