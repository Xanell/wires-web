import React from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import { Login } from "../src/Pages/Auth/Login";
import { ErrorPage } from "../src/Pages/Error/ErrorPage";
import { Profile } from "../src/Components/Base/Profile";
import { Settings } from "../src/Components/Base/Settings";
import { News } from "./Components/Base/News";
import { Register } from "./Pages/Auth/Register";
import Base from "./Components/Base/Base";

function App(props) {
  let routes = (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register/>} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );

  if (props.isAuth) {
    routes = (
      <>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/news" element={<News />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </>
    );
  }

  return <Base>{routes}</Base>;
}

function mapStateToProps(state) {
  return {
    isAuth: !!state.auth.access_token,
  };
}

export default connect(mapStateToProps)(App);
