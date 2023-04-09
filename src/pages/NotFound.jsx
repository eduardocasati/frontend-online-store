import React, { Component } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/logo.svg";

import ShoppingCartButton from "../components/ShoppingCartButton";

export default class NotFound extends Component {
  state = {
    shoppingCartSize: "",
  };

  componentDidMount() {
    this.setState({
      shoppingCartSize: localStorage.getItem("shoppingCartSize"),
    });
  }

  render() {
    const { shoppingCartSize } = this.state;
    return (
      <>
        <header className="header">
          <div className="header__container">
            <Link to="/">
              <img src={logo} alt="Logo" className="logo-img" />
            </Link>
            <ShoppingCartButton shoppingCartSize={shoppingCartSize} />
          </div>
        </header>
        <div className="not-found">
          <h1>Página não encontrada</h1>
        </div>
      </>
    );
  }
}
