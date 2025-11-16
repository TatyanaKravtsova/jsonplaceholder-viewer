import { createEntityAdapter, createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone?: string;
  website?: string;
}

export const userAdapter = createEntityAdapter<User>({
  sortComparer: (a, b) => a.id - b.id,
});

export interface UserState {
  selectedUserId: number | null;
}

const initialState = userAdapter.getInitialState<UserState>({
  selectedUserId: null,
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedUserId: (state, action: PayloadAction<number | null>) => {
      state.selectedUserId = action.payload;
    },
    addUser: userAdapter.addOne,
    addUsers: userAdapter.addMany,
    updateUser: userAdapter.updateOne,
    removeUser: userAdapter.removeOne,
    clearUsers: userAdapter.removeAll,
  },
});

export const {
  setSelectedUserId,
  addUser,
  addUsers,
  updateUser,
  removeUser,
  clearUsers,
} = userSlice.actions;

export const userSelectors = userAdapter.getSelectors();

export default userSlice.reducer;

