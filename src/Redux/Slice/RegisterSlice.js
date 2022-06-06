import { API } from "../../Helpers/apiClient";
import { createSlice } from "@reduxjs/toolkit";
import { LogIn } from "./AuthSlice";


const initialState = {
  register_status: false,
  register_error: false,
  error_message: "",
};

const register = createSlice({
  name: "register",
  initialState,
  reducers: {
    RegisterSuccess(state, action) {
      state.register_status = action.payload.register_status;
    },
    RegisterError(state, action) {
      state.register_error = action.payload.error;
      state.error_message = action.payload.error_message;
    },
  },
});

const { RegisterSuccess, RegisterError } = register.actions;

export function RegisterUser(username, email, password_hash) {
  return async (dispatch) => {
    const RegisterData = {
      username,
      email,
      password_hash,
    };
    try {
      const response = await API.post("/user/register", RegisterData);
      if (response.status === 201) {
        dispatch(
          RegisterSuccess({
            register_status: true,
          })
        );
        dispatch(LogIn(email, password_hash));
      }
    } catch (e) {
      const error = e.response;
      let error_message = null;

      if (error) {
        if (error.status === 400)
          error_message = "Пользователь с таким Именем уже существует!";
      } else error_message = "Повторите запрос позже!";
      dispatch(
        RegisterError({
          register_error: true,
          error_message,
        })
      );
    }
  };
}

export default register.reducer;
