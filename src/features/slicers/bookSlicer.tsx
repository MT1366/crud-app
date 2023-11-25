// import privateAxios from "../../../services/privateAxios";
import axios from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  try {
    const response = await axios.get("http://localhost:4000/posts");
    const book = response.data;
    return book;
  } catch (error: any) {
    // console.log(thunkAPI.rejectWithValue(error.response.data));
    console.log(error.message);
  }
});

export const postBook = createAsyncThunk(
  "books/postBook",
  async (book, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:4000/posts", book, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

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
  isLoading: true,
  isRejected: false,
};

const bookSlicer = createSlice({
  name: "books",
  initialState,
  reducers: {
    getBooks(state, action) {
      state.books = action.payload;
    },
    filterBook(state, action) {
      state.books = state.books.filter((book) =>
        book.title
          .toLowerCase()
          .includes(action.payload ? action.payload.toLowerCase() : "")
      );
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
      })
      .addCase(postBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postBook.fulfilled, (state, action) => {
        console.log(state, action);
        state.books.push(action.payload);
      })
      .addCase(postBook.rejected, (state) => {
        state.isRejected = true;
      });
  },
});

export const { getBooks, filterBook } = bookSlicer.actions;

export default bookSlicer.reducer;
