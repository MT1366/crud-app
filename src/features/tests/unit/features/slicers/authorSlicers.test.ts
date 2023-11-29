import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import authorReducer, {
  fetchAuthor,
  getAuthor,
} from "../../../../slicers/authorSlicer";
import { RootState } from "../../../../../store";

const mockAuthors = [
  { id: "1", name: "Author 1", content: "Content 1" },
  { id: "2", name: "Author 2", content: "Content 2" },
];

// Mock privateAxios module
jest.mock("../../../services/privateAxios", () => ({
  __esModule: true,
  default: {
    get: jest.fn(() => Promise.resolve({ data: mockAuthors })),
  },
}));

describe("authorSlicer", () => {
  let store: EnhancedStore<RootState>;

  beforeEach(() => {
    store = configureStore({
      reducer: { author: authorReducer },
    }) as EnhancedStore<RootState>;
  });

  it("should handle fetchAuthor", async () => {
    await store.dispatch(fetchAuthor() as any);
    const state = store.getState();

    expect(state.author.isLoading).toBe(false);
    expect(state.author.isRejected).toBe(false);
    expect(state.author.author).toEqual(mockAuthors);
  });

  it("should handle getAuthor", () => {
    const action = getAuthor(mockAuthors);
    const state = authorReducer(undefined, action);

    expect(state.author).toEqual(mockAuthors);
  });
});
