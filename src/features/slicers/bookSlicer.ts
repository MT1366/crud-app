import privateAxios from "../services/privateAxios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  try {
    const response = await privateAxios.get("http://localhost:4000/posts");
    const book = response.data;
    return book;
  } catch (error) {
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
      toast.success(`You added a new book 📗`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBook = createAsyncThunk("books/deleteBook", async (id) => {
  try {
    const response = await privateAxios.delete(
      `http://localhost:4000/posts?id=${id}`
    );
    const bookId = response;
    toast.success(`You deleted a book 📕`);

    return bookId;
  } catch (error) {
    console.log(error);
  }
});

export const editBook = createAsyncThunk(
  "books/editBook",
  async (book, thunkAPI) => {
    try {
      const response = await privateAxios.put(
        `http://localhost:4000/posts?_post=${book}`,
        book,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(`You have edited a book 📚`);

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
        state.isLoading = false;
      })
      .addCase(postBook.rejected, (state) => {
        state.isRejected = true;
      })
      .addCase(deleteBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        const deletedBookId = action.payload?.data;
        if (deletedBookId !== undefined) {
          state.books = state.books.filter((book) => book.id !== deletedBookId);
        }
        state.isLoading = false;
      })
      .addCase(deleteBook.rejected, (state) => {
        state.isRejected = true;
        state.isLoading = false;
      })
      .addCase(editBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editBook.fulfilled, (state, action) => {
        const bookIndex = state.books.findIndex(
          (book) => book.id === action.payload.id
        );
        if (bookIndex !== -1) {
          state.books[bookIndex] = action.payload;
        }
        state.isLoading = false;
      })
      .addCase(editBook.rejected, (state) => {
        state.isRejected = true;
      });
  },
});

export const { getBooks } = bookSlicer.actions;

export default bookSlicer.reducer;
