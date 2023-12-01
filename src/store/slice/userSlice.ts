import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface InitialState {
  users: UserData[];
  isLoading: boolean;
  error: null | any;
}

const initialState: InitialState = {
  users: [],
  isLoading: false,
  error: null,
};
const url: string =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

export const fetchUserData = createAsyncThunk("user", async () => {
  const res = await fetch(url);
  const data = res.json();
  return data;
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchUserData.pending,
      (state, action: PayloadAction<any>) => {
        state.isLoading = true;
      },
    );
    builder.addCase(
      fetchUserData.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.users = action.payload;
      },
    );
    builder.addCase(
      fetchUserData.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.users = [];
        state.error = action.payload;
      },
    );
  },
});

// export const {} = usersSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default usersSlice.reducer;
