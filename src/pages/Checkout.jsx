import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { AiOutlineBarcode } from "react-icons/ai";
import { FaCcMastercard, FaCcVisa, FaCreditCard } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { clearShoppingCart, readShoppingCart } from "../services/localStorage";

import "../style/Checkout.css";

import logo from "../assets/logo.svg";

import ShoppingCartButton from "../components/ShoppingCartButton";

export default class Checkout extends Component {
  state = {
    cartProducts: [],
  };

  componentDidMount() {
    const data = readShoppingCart();
    this.setState({
      cartProducts: data,
      shoppingCartSize: localStorage.getItem("shoppingCartSize"),
      fullName: "",
      email: "",
      cpf: "",
      phone: "",
      cep: "",
      address: "",
      paymentMethod: "",
      invalidInfo: false,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [ name ]: value,
    });
  };

  validateForm = () => {
    const { history } = this.props;
    const { fullName, email, cpf, phone, cep, address, paymentMethod } =
      this.state;

    if (
      fullName === "" ||
      email === "" ||
      cpf === "" ||
      phone === "" ||
      cep === "" ||
      address === "" ||
      paymentMethod === ""
    ) {
      return this.setState({ invalidInfo: true });
    }
    this.setState({ invalidInfo: false });
    clearShoppingCart();
    Swal.fire({
      confirmButtonColor: '#068dc3',
      text: "Compra finalizada com sucesso!",
      icon: "success",
      confirmButtonText: "Ok",
    });
    history.push("/");
  };

  render() {
    const {
      cartProducts,
      shoppingCartSize,
      fullName,
      email,
      cpf,
      phone,
      cep,
      address,
      invalidInfo,
    } = this.state;

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
        <div className="container checkout">
          <div className="checkout__form">
            <h2>Preencha as informações</h2>
            <div className="checkout__form__container">
              <input
                value={fullName}
                onChange={this.handleChange}
                type="text"
                name="fullName"
                id="fullName"
                placeholder="Nome completo"
                className="checkout__form__name"
              />
              <input
                value={cpf}
                onChange={this.handleChange}
                type="text"
                name="cpf"
                id="cpf"
                placeholder="CPF"
                className="checkout__form__cpf"
              />
            </div>
            <div className="checkout__form__container">
              <input
                value={email}
                onChange={this.handleChange}
                type="email"
                name="email"
                id="email"
                placeholder="Email"
              />
              <input
                value={phone}
                onChange={this.handleChange}
                type="text"
                name="phone"
                id="phone"
                placeholder="Telefone"
              />
            </div>
            <div className="checkout__form__container">
              <input
                value={address}
                onChange={this.handleChange}
                type="text"
                name="address"
                id="address"
                placeholder="Endereço"
                className="checkout__form__address"
              />
              <input
                value={cep}
                onChange={this.handleChange}
                type="text"
                name="cep"
                id="cep"
                placeholder="CEP"
                className="checkout__form__cep"
              />
            </div>
            <div className="checkout__form__payment-method">
              <span>Método de pagamento:</span>
              <div className="payment-methods">
                <div>
                  <input
                    value="Boleto"
                    onChange={this.handleChange}
                    type="radio"
                    name="paymentMethod"
                    id="paymentMethod"
                  />
                  Boleto <AiOutlineBarcode size={16} />
                </div>
                <div>
                  <input
                    value="Visa"
                    onChange={this.handleChange}
                    type="radio"
                    name="paymentMethod"
                    id="paymentMethod"
                  />
                  Visa <FaCcVisa size={16} />
                </div>
                <div>
                  <input
                    value="MasterCard"
                    onChange={this.handleChange}
                    type="radio"
                    name="paymentMethod"
                    id="paymentMethod"
                  />
                  MasterCard <FaCcMastercard size={16} />
                </div>
                <div>
                  <input
                    value="Elo"
                    onChange={this.handleChange}
                    type="radio"
                    name="paymentMethod"
                    id="paymentMethod"
                  />
                  Elo <FaCreditCard size={16} />
                </div>
              </div>
            </div>
            <div className="checkout__form__checkout-button">
              <button onClick={this.validateForm} type="button">
                Finalizar
              </button>
              {invalidInfo && (
                <span className="invalid-info">Preencha todos os campos</span>
              )}
            </div>
          </div>
          <div className="checkout__products">
            <h3>Resumo da compra</h3>
            {cartProducts.map((product) => (
              <div
                className="checkout__products__product-card"
                key={product.id}
              >
                <div className="checkout__product-card__image">
                  <img src={product.thumbnail} alt={product.title} />
                </div>
                <div className="checkout__product-card__info">
                  <h3>
                    <span>
                      &#40;
                      {product.quantity}
                      &#41;
                    </span>{" "}
                    {product.title}
                  </h3>
                  <span>
                    {(product.price * product.quantity).toLocaleString(
                      "pt-br",
                      {
                        style: "currency",
                        currency: "BRL",
                      }
                    )}
                  </span>
                </div>
              </div>
            ))}
            Total &#40;{shoppingCartSize}{" "}
            {shoppingCartSize === 1 ? "item" : "itens"}
            &#41;:{" "}
            <span>
              {cartProducts
                .reduce(
                  (accumulator, product) =>
                    accumulator + product.price * product.quantity,
                  0
                )
                .toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
            </span>
          </div>
        </div>
      </>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
