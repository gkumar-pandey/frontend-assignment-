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
  data: UserData[];
  filteredUsersData: UserData[];
  isLoading: boolean;
  error: null | any;
}

const initialState: InitialState = {
  data: [],
  filteredUsersData: [],
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
  reducers: {
    search: (state, action) => {
      return {
        ...state,
        filteredUsersData: state.data.filter((user) =>
          user.name.toLocaleLowerCase().includes(action.payload.toLowerCase()),
        ),
      };
    },
  },
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
        state.data = action.payload;
        state.filteredUsersData = action.payload;
      },
    );
    builder.addCase(
      fetchUserData.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = [];
        state.error = action.payload;
      },
    );
  },
});

export const { search } = usersSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default usersSlice.reducer;
