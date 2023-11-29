// AdminPanel.test.tsx

import { EnhancedStore, AnyAction } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { RootState } from "../../../../store";

import AdminPanel from "../../../../components/AdminPanel";
import { fetchBooks } from "../../../slicers/bookSlicer";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
type BookAction = AnyAction | AsyncThunkAction<void, void, AsyncThunkConfig>;

describe("AdminPanel Component", () => {
  let store: EnhancedStore<RootState, AnyAction>;

  beforeEach(() => {
    store = mockStore({
      books: {
        books: [
          {
            id: 0,
            title: "redux",
            content: "a very good bood",
            date: "2024",
            userId: 1,
            athor: "will smith",
          },
        ],
        isLoading: false,
        isRejected: false,
      },
      author: {
        author: [
          { id: "0", name: "Dude Lebowski" },
          { id: "1", name: "Neil Young" },
          { id: "2", name: "Dave Gray" },
          { id: "3", name: "Will Smith" },
        ],
      },
      middleware: middlewares,
    });
  });

  it("renders AdminPanel component", async () => {
    render(
      <Provider store={store}>
        <AdminPanel />
      </Provider>
    );

    expect(screen.getByText("Admin Panel")).toBeInTheDocument();

    store.dispatch(fetchBooks() as BookAction);
    await waitFor(() =>
      expect(screen.getByText("LOADING...")).toBeInTheDocument()
    );
  });

  // Add more test cases based on your component's functionality
});
