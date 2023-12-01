import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface InitialState {
  users: any;
  isLoading: boolean;
}

const initialState: InitialState = {
  users: [],
  isLoading: false,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});
