import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./features/slicers/bookSlicer";

const store = configureStore({
  reducer: {
    books: bookReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
