import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./features/slicers/bookSlicer";
import authorReducer from "./features/slicers/authorSlicer";
import loginReducer from "./features/slicers/loginSlicer";

const store = configureStore({
  reducer: {
    books: bookReducer,
    author: authorReducer,
    auth: loginReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
