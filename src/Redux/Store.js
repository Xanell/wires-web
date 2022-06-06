import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./Slice/AuthSlice";
import regReducer from "./Slice/RegisterSlice";
import userReducer from "./Slice/UserSlice";
import postReducer from "./Slice/PostSlice";

const reducer = combineReducers({
  auth: authReducer,
  register: regReducer,
  user: userReducer,
  post: postReducer,
});

export default configureStore({
  reducer,
});
