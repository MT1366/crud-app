import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import axios, { AxiosError } from "axios";

export const fetchAuthor = createAsyncThunk(
  "authors/fetchAuthors",
  async () => {
    try {
      const response = await axios.get("http://localhost:4000/authors");
      const author = response.data;
      return author;
    } catch (error: any) {
      console.log(error);
    }
  }
);

interface Author {
  id: string;
  name: string;
  content: string;
}

interface AuthorState {
  author: Author[];
  isLoading: boolean;
  isRejected: boolean;
  authorName: string;
}

const initialState: AuthorState = {
  author: [],
  isLoading: true,
  isRejected: false,
  authorName: "",
};

const authorSlicer = createSlice({
  name: "author",
  initialState,
  reducers: {
    getAuthor(state, action) {
      state.author = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAuthor.fulfilled, (state, action) => {
        state.author = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAuthor.rejected, (state) => {
        state.isRejected = true;
      });
  },
});

export const { getAuthor } = authorSlicer.actions;
export default authorSlicer.reducer;
