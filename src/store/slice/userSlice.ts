import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface InitialState {
  data: UserData[];
  filteredUsersData: UserData[];
  selectedUsers: UserData[];
  isLoading: boolean;
  error: null | any;
}

const initialState: InitialState = {
  data: [],
  filteredUsersData: [],
  selectedUsers: [],
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
        filteredUsersData: state.data.filter(
          (user) =>
            user.name.toLowerCase().includes(action.payload.toLowerCase()) ||
            user.email
              .toLocaleLowerCase()
              .includes(action.payload.toLowerCase()),
        ),
      };
    },
    resetUsersData: (state) => {
      return {
        ...state,
        filteredUsersData: state.data,
      };
    },

    deleteUser: (state, action) => {
      const updatedData = state.data.filter(
        (user) => user.id !== action.payload,
      );
      return {
        ...state,
        data: updatedData,
        filteredUsersData: updatedData,
      };
    },
    selectUsers: (state, action) => {
      return {
        ...state,
        selectedUsers: [...state.selectedUsers, action.payload],
      };
    },
    deselectUsers: (state, action) => {
      return {
        ...state,
        selectedUsers: state.selectedUsers.filter(
          (user) => user.id !== action.payload.id,
        ),
      };
    },
    deleteSelectedUsers: (state) => {
      const updatedData: any = state.data.filter(
        (user) =>
          !state.selectedUsers.find(
            (selectedUser) => selectedUser.id === user.id,
          ),
      );
      return {
        ...state,
        data: updatedData,
        filteredUsersData: updatedData,
        selectedUsers: [],
      };
    },
    selectAllUsersOnCrrPage: (state, action) => {
      return {
        ...state,
        selectedUsers: [...action.payload, ...state.selectedUsers],
      };
    },
    deselectAllUsersOnCurrPage: (state, action) => {
      return {
        ...state,
        selectedUsers: state.selectedUsers.filter(
          (selectedUser) =>
            !action.payload.find(
              (user: UserData) => user.id === selectedUser.id,
            ),
        ),
      };
    },
    editUserData: (state, action) => {
      const updatedData = state.data.map((user) =>
        user.id === action.payload.id ? { ...action.payload } : user,
      );
      return {
        ...state,
        data: updatedData,
        filteredUsersData: updatedData,
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

export const {
  search,
  deleteUser,
  resetUsersData,
  selectUsers,
  deselectUsers,
  deleteSelectedUsers,
  selectAllUsersOnCrrPage,
  deselectAllUsersOnCurrPage,
  editUserData,
} = usersSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default usersSlice.reducer;
