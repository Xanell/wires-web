import { API } from "../../Helpers/apiClient";
import { createSlice } from "@reduxjs/toolkit";
import { GetPostByInterests } from "../../Redux/Slice/PostSlice";
import Avatar from "../../Assets/svg/Avatar.svg"

const initialState = {
  id: null,
  username: "",
  first_name: "",
  last_name: "",
  email: "",
  avatar_url: Avatar,
  interests: [],
  user_error: false,
  error_message: "",
  success_message: "",
  posts: [],
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    UserLoadData(state, action) {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.email = action.payload.email;
      state.avatar_url = action.payload.avatar_url;
      state.interests = action.payload.interests;
    },
    UserFaildLoadData(state, action) {
      state.user_error = action.payload.error;
      state.error_message = action.payload.error_message;
    },
    UserUpdateInfo(state, action){
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
    },
    UserFaildUpdateInfo(state, action){
      state.user_error = action.payload.error;
      state.error_message = action.payload.error_message;
    },
    UserChangePasswordError(state, action){
      state.user_error = action.payload.error;
      state.error_message = action.payload.error_message;
    },
    SuccessUpdatePassword(state, action){
      state.success_message = action.payload.success_message;
    },
    getCurrentUserPosts(state, action){
      state.posts = action.payload.posts;
    },
  },
});

const { UserLoadData, UserFaildLoadData } = user.actions;
export function UserLoad() {
  return async (dispatch) => {
    try {
      const response = await API.get("/user");
      const data = response.data;

      const id = data.data.id;
      const username = data.data.username;
      const email = data.data.email;
      const avatar_url = data.data.avatar.url;
      const first_name = data.data.first_name;
      const last_name = data.data.last_name;
      const interests = data.data.interests;

      dispatch(
        UserLoadData({
          id: id,
          username: username,
          email: email,
          avatar_url: avatar_url,
          first_name: first_name,
          last_name: last_name,
          interests: interests,
        }),
        dispatch(GetCurrentUserPosts(id)),
        dispatch(GetPostByInterests())
      );
    } catch (e) {
      const error = e.response;
      let error_message = null;

      if (error) {
        if (error.status === 401) error_message = "Wrong data!";
      } else error_message = "No connection to the server!";
      dispatch(
        UserFaildLoadData({
          user_error: true,
          error_message,
        })
      );
    }
  };
}

const { UserUpdateInfo, UserFaildUpdateInfo } = user.actions;
export function UserUpdate(first_name, last_name) {
  return async (dispatch) => {
    const formData = new FormData();
    const UserInfo = {
      first_name,
      last_name,
    }
    formData.append("update_params", JSON.stringify(UserInfo))
    try {
      await API.put("/user/update", formData)
        dispatch(
          UserUpdateInfo({
            first_name: first_name,
            last_name: last_name,
          })
        );
    } catch(e) {
      const error = e.response;

      let error_message = null;

      if (error) {
        if (error.status === 401) error_message = "Пользователь не авторизован!";
        else if (error.status === 400 ) error_message = "Некорректные параметры обновления!"
      } else error_message = "No connection to the server!";
      dispatch(
        UserFaildUpdateInfo({
          user_error: true,
          error_message,
        })
      );
    }
  }
}

const { UserChangePasswordError, SuccessUpdatePassword } = user.actions;
export function UserUpdatePassword(old_password_hash, new_password_hash){
  return async (dispatch) => {
    const UserPasswords ={
      old_password_hash,
      new_password_hash
    }
    try {
      const response = await API.put("/user/change_password", UserPasswords)
        let success_message = null;
        if(response.status === 200) success_message = "Успешная смена пароля"
        dispatch(
          SuccessUpdatePassword({
            success_message: success_message,
          })
        )
    } catch(e){
      const error = e.response;

      let error_message = null;

      if(error){
        if(error.status === 401) error_message = "Старый пароль неверный!"
        else if (error.status === 400) error_message = "Некорректные параметры!"
      }
      dispatch(
        UserChangePasswordError({
          user_error: true,
          error_message,
        })
      )
    }
  }
}

const { getCurrentUserPosts } = user.actions;
export function GetCurrentUserPosts(id){
  return  async(dispatch) => {
    try{
      const response = await API.get("/user/"+ id +"/posts", {
        params: {
          limit: 10,
          offset: 0,
        }
      })
      const data = response.data;
      const posts = data.data;

      dispatch(
        getCurrentUserPosts({
          posts: posts,
        })
      );
    } catch(e){
      console.log(e)
    }
  }
}

export default user.reducer;
