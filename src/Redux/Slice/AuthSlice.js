import { API } from "../../Helpers/apiClient";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access_token: localStorage.getItem('access_token'),
  login_error: false,
  error_message: "",
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LogInSuccess(state, action) {
      state.access_token = action.payload.access_token;
    },
    FaildLogIn(state, action) {
      state.login_error = action.payload.error;
      state.error_message = action.payload.error_message;
    },
  },
});

const { LogInSuccess, FaildLogIn } = auth.actions;
export function LogIn(email, password_hash) {
  return async (dispatch) => {
    const LogInData = {
      email,
      password_hash,
    };
    try {
      const response = await API.post("/user/login", LogInData);
      const token = response.data.data.token;

      localStorage.setItem("access_token", token);

      dispatch(
        LogInSuccess({
          access_token: token,
        })
      );
    } catch (e) {
      const error = e.response;
      let error_message = null;

      if (error) {
        if (error.status === 401) error_message = "Wrong data!";
      } else error_message = "No connection to the server!";
      dispatch(
        FaildLogIn({
          login_error: true,
          error_message,
        })
      );
    }
  };
}

export default auth.reducer;
