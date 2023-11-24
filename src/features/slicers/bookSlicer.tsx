// import axios from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import privateAxios from "../../../services/privateAxios";

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await privateAxios.get("posts");
  return response.data;
});

interface Book {
  id: string;
  title: string;
  content: string;
  date: string;
  userId: string;
}

interface BookState {
  books: Book[];
  isLoading: boolean;
  isRejected: boolean;
}

const initialState: BookState = {
  books: [],
  isLoading: false,
  isRejected: false,
};

const bookSlicer = createSlice({
  name: "books",
  initialState,
  reducers: {
    getBooks(state, action) {
      state.books = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchBooks.rejected, (state) => {
        state.isRejected = true;
        state.isLoading = false;
      });
  },
});

export const { getBooks } = bookSlicer.actions;

export default bookSlicer.reducer;
