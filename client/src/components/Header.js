import React from "react";
import logo from "../static/img/logo.svg";
export const Header = () => {
  return (
    <div className="container-fluid bubble bg-light d-inline-flex align-items-center border-bottom">
      <img src={logo} className="logo"></img>
      <h1>
        <a href="/">Bubble</a>
      </h1>
      <input
        type="text"
        className="search p-2 rounded"
        placeholder="Looking for something ?"
      ></input>
      <div></div>
    </div>
  );
};
