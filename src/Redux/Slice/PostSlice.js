import { API } from "../../Helpers/apiClient";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const post = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPosts(state, action) {
      state.posts = action.payload.posts;
    },
  },
});

const { getPosts } = post.actions;
export function GetPostByInterests() {
  return async (dispatch) => {
    try {
      const response = await API.get("/posts", {
        params: {
          limit: 10,
          offset: 0,
        },
      });
      const data = response.data;
      const posts = data.data;

      dispatch(
        getPosts({
          posts: posts,
        })
      );
    } catch (e) {
      console.log(e)
    }
  };
}

export default post.reducer;
