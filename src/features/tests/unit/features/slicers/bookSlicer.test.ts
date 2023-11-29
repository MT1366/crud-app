import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { RootState } from "../../../../../store";
import loginReducer from "../../../../slicers/loginSlicer";
import authorReducer from "../../../../slicers/authorSlicer";

import bookReducer, {
  getBooks,
  fetchBooks,
  postBook,
  deleteBook,
  editBook,
} from "../../../../slicers/bookSlicer";

const mockBooks = [
  {
    id: "1",
    title: "Learning Redux Toolkit",
    content: "I've heard good things.",
    date: "",
    userId: "0",
  },
  {
    id: "2",
    title: "Slices...",
    content: "The more I say slice, the more I want pizza.",
    date: "",
    userId: "1",
  },
  {
    id: "3",
    title: "You don't know js, yet",
    content: "Learn JS.",
    date: "",
    userId: "2",
  },
  {
    id: "4",
    title: "Algorithms",
    content: "Learning JS is in my life algorithm.",
    date: "",
    userId: "",
  },
  {
    id: "5",
    title: "Material-tailwind",
    content: "The New Library.",
    date: "",
    userId: "1",
  },
  {
    id: "6",
    title: "Bootstrap",
    content: "Life is now.",
    date: "",
    userId: "3",
  },
  {
    id: "7",
    title: "reducers...",
    content: "The more I say reducer, the more I want .",
    date: "",
    userId: "",
  },
];

jest.mock("../../../services/privateAxios", () => ({
  __esModule: true,
  default: {
    get: jest.fn(() => Promise.resolve({ data: mockBooks })),
  },
}));

describe("bookSlicer", () => {
  let store: EnhancedStore<RootState>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        books: bookReducer,
        author: authorReducer,
        auth: loginReducer,
      },
    }) as EnhancedStore<RootState>;
  });

  it("should fetch books successfully", async () => {
    await store.dispatch(fetchBooks() as any);

    const state = store.getState().books;
    expect(state.isLoading).toBe(false);
    expect(state.isRejected).toBe(false);
  });

  it("should post a book successfully", async () => {
    const newBook = {
      id: "1",
      title: "New Book",
      content: "Some content",
      date: "2023-01-01",
      userId: "1",
    };
    await store.dispatch(postBook(newBook) as any);
    const state = store.getState().books;
    expect(state.books.length).toBe(1);
  });

  it("should delete a book successfully", async () => {
    const bookIdToDelete = "1";
    await store.dispatch(deleteBook(bookIdToDelete) as any);
    const state = store.getState().books;
    expect(state.books.length).toBe(0);
    // Add more expectations based on your state structure
  });

  it("should edit a book successfully", async () => {
    const updatedBook = {
      id: "1",
      title: "Updated Book",
      content: "Updated content",
      date: "2023-01-01",
      userId: "1",
    };
    await store.dispatch(editBook(updatedBook) as any);
    const state = store.getState().books;
    const editedBook = state.books.find((book) => book.id === "1");
    expect(editedBook?.title).toBe("Updated Book");
    // Add more expectations based on your state structure
  });

  it("should get books successfully", () => {
    store.dispatch(
      getBooks([
        {
          id: "1",
          title: "Book 1",
          content: "Content 1",
          date: "2023-01-01",
          userId: "1",
        },
      ])
    );
    const state = store.getState().books;
    expect(state.books.length).toBe(1);
  });
});
