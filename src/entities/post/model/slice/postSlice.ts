import { createEntityAdapter, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Post } from '../types';

export const postAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => b.id - a.id,
});

export interface PostState {
  selectedPostId: number | null;
}

const initialState = postAdapter.getInitialState<PostState>({
  selectedPostId: null,
});

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setSelectedPostId: (state, action: PayloadAction<number | null>) => {
      state.selectedPostId = action.payload;
    },
    addPost: postAdapter.addOne,
    addPosts: postAdapter.addMany,
    updatePost: postAdapter.updateOne,
    removePost: postAdapter.removeOne,
    clearPosts: postAdapter.removeAll,
  },
});

export const {
  setSelectedPostId,
  addPost,
  addPosts,
  updatePost,
  removePost,
  clearPosts,
} = postSlice.actions;

export const postSelectors = postAdapter.getSelectors();

export default postSlice.reducer;

