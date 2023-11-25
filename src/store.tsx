import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./features/slicers/bookSlicer";
import authorReducer from "./features/slicers/authorSlicer";

const store = configureStore({
  reducer: {
    books: bookReducer,
    author: authorReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
