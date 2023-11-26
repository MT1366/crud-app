import privateAxios from "../../../services/privateAxios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  try {
    const response = await privateAxios.get("http://localhost:4000/posts");
    const book = response.data;
    return book;
  } catch (error) {
    // console.log(thunkAPI.rejectWithValue(error.response.data));
    console.log(error);
  }
});

export const postBook = createAsyncThunk(
  "books/postBook",
  async (book, thunkAPI) => {
    try {
      const response = await privateAxios.post(
        "http://localhost:4000/posts",
        book,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
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
        console.log(state);
        state.isLoading = true;
      })
      .addCase(postBook.fulfilled, (state, action) => {
        state.books = [...state.books, action.payload];
        console.log(state.books, action);
      })
      .addCase(postBook.rejected, (state) => {
        state.isRejected = true;
      });
  },
});

export const { getBooks } = bookSlicer.actions;

export default bookSlicer.reducer;
