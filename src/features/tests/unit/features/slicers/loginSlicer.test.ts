import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import userReducer, {
  getUser,
  loginUser,
} from "../../../../slicers/loginSlicer";
import axios from "axios";

jest.mock("axios"); // Assuming you are using axios, you can mock it

describe("userSlicer", () => {
  let store: EnhancedStore;

  beforeEach(() => {
    store = configureStore({
      reducer: { user: userReducer },
    }) as EnhancedStore;
  });

  it("should login user successfully", async () => {
    const mockUser = {
      id: "1",
      firstname: "John",
      lastname: "Doe",
      role: "user",
      username: "john_doe",
      password: "password",
      token: "some-token",
    };

    (axios.post as jest.Mock).mockResolvedValue({ data: mockUser });

    // Dispatch loginUser action
    await store.dispatch(
      loginUser({
        username: "john_doe",
        password: "password",
        token: "some-token",
      }) as any
    );

    // Check the state after the action is fulfilled
    const state = store.getState().user;
    expect(state).toEqual(mockUser);
  });

  it("should get user details", () => {
    const mockUser = {
      id: "1",
      firstname: "John",
      lastname: "Doe",
      role: "user",
      username: "john_doe",
      password: "password",
      token: "some-token",
    };

    // Dispatch getUser action
    store.dispatch(getUser(mockUser));

    // Check the state after the action is dispatched
    const state = store.getState().user;
    expect(state).toEqual(mockUser);
  });
});
