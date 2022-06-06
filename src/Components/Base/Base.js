import React from "react";
import { connect } from "react-redux";
import Header from "../Header";

const Base = (props) => {
  return (
    <div>
      <Header />
      {props.isAuth}
      {props.children}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    isAuth: !!state.auth.access_token,
  };
}

export default connect(mapStateToProps)(Base);
