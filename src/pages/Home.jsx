import React from "react";
import { TbSquareRoundedArrowUpFilled } from "react-icons/tb";
import { Link } from "react-scroll";
import { MoonLoader } from "react-spinners";
import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from "../services/api";

import hero1 from '../assets/hero-1.png';
import hero2 from '../assets/hero-2.png';
import logo from "../assets/logo.svg";
import "../style/Home.css";

import ProductCard from "../components/ProductCard";
import Search from "../components/Search";
import ShoppingCartButton from "../components/ShoppingCartButton";
import { addProductToCart } from "../services/localStorage";

export default class Home extends React.Component {
  state = {
    isLoading: false,
    categoriesList: [],
    searchInput: "",
    categoryInput: "",
    productsList: [],
    shoppingCartSize: "",
    showCategoriesList: false,
  };

  async componentDidMount() {
    const data = await getCategories();
    this.setState({
      categoriesList: data,
      shoppingCartSize: localStorage.getItem("shoppingCartSize"),
    });
  }

  searchProductsByName = async () => {
    const { searchInput } = this.state;
    this.setState({
      isLoading: true,
    });
    const data = await getProductsFromCategoryAndQuery("", searchInput);
    this.setState({
      productsList: data.results,
      isLoading: false,
    });
  };

  searchProductsByCategory = ({ target }) => {
    const { value } = target;
    this.setState(
      {
        categoryInput: value,
        showCategoriesList: false,
        isLoading: true,
      },
      async () => {
        const { categoryInput } = this.state;
        const data = await getProductsFromCategoryAndQuery(categoryInput, "");
        this.setState({
          productsList: data.results,
          isLoading: false,
        });
      }
    );
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [ name ]: value,
    });
  };

  addProduct = (product) => {
    addProductToCart(product);
    this.setState({
      shoppingCartSize: localStorage.getItem("shoppingCartSize"),
    });
  };

  toggleCategoriesList = () => {
    const { showCategoriesList } = this.state;
    this.setState({
      showCategoriesList: !showCategoriesList,
    });
  };

  render() {
    const {
      isLoading,
      categoriesList,
      searchInput,
      productsList,
      shoppingCartSize,
      showCategoriesList,
    } = this.state;
    return (
      <>
        <header name="header" className="header">
          <div className="header__container">
            <img src={logo} alt="Logo" className="header__logo" />
            <Search
              searchInput={searchInput}
              handleChange={this.handleChange}
              onClick={this.searchProductsByName}
              toggleCategoriesList={this.toggleCategoriesList}
              showCategoriesList={showCategoriesList}
              categoriesList={categoriesList}
              searchProductsByCategory={this.searchProductsByCategory}
            />
            <ShoppingCartButton shoppingCartSize={shoppingCartSize} />
          </div>
        </header>
        {isLoading ? (
          <div className="searching-loading">
            <MoonLoader size={72} color="#12ACE2" />
          </div>
        ) : productsList.length === 0 ? (
          <div className="hero">
            <img src={hero1} alt="Frontend Online Store" className="hero__fos" />
            <img src={hero2} alt="Frontend Online Store" className="hero__vector" />
          </div>
        ) : (
          <main className="main">
            <div name="products-list" className="products">
              <ProductCard
                productsList={productsList}
                addProduct={this.addProduct}
              />
            </div>
          </main>
        )}
        {productsList.length !== 0 && (
          <Link to="header">
            <TbSquareRoundedArrowUpFilled
              size={32}
              className="scroll-up-button"
            />
          </Link>
        )}
      </>
    );
  }
}
