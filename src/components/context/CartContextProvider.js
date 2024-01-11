import React, { createContext, useContext, useReducer } from "react";
import { ACTIONS } from "../../helpers/const";
import {
  calcSubPrice,
  calcTotalPrice,
  getLocalStorage,
  getProductsCountInCart,
} from "../../helpers/functions";
export const cartContext = createContext();
export const useCart = () => useContext(cartContext);
const INIT_STATE = {
  cart1: JSON.parse(localStorage.getItem("cart")),
  cartLength: getProductsCountInCart(),
};
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTIONS.GET_CART:
      return { ...state, cart1: action.payload };
    default:
      return state;
  }
};
const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  // функция для получения продуктов добавленных из хранилища
  const getCart = () => {
    let cart = getLocalStorage();
    //проверка на наличие данных под ключом cart в localStorage
    if (!cart) {
      localStorage.setItem(
        "cart",
        JSON.stringify({ products: [], totalPrice: 0 })
      );
      // перезаписываем переменную cart с null на обект
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    dispatch({ type: ACTIONS.GET_CART, payload: cart });
  };
  // функция для добавления товара в корзину
  const addProductToCart = (product) => {
    //получаем содержимое из хранилища под ключом cart
    let cart = getLocalStorage();
    //проверка на сущесвтование данных в хранилище под ключом cart
    if (!cart) {
      cart = { products: [], totalPrice: 0 };
    }
    let newProduct = {
      item: product,
      count: 1,
      subPrice: +product.price,
    };
    // проверяем есть ли уже продукт, который хотим добавить в корзину
    let productToFind = cart.products.filter(
      (elem) => elem.item.id === product.id
    );
    //если товар уже добавлен в корзину, то удаляем его из массива cart.prodcuts через фильтр, в противном случае добавляем его в cart.products
    if (productToFind.length === 0) {
      cart.products.push(newProduct);
    } else {
      cart.products = cart.products.filter(
        () => (elem) => elem.item.id !== product.id
      );
    }
    // обновляем данные в localStorage
    cart.totalPrice = calcTotalPrice(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));
    // обновляем состояние
    dispatch({ type: ACTIONS.GET_CART, payload: cart });
  };
  // функция для проверки на наличие товара в корзине
  const checkProductInCart = (id) => {
    let cart = getLocalStorage();
    console.log(cart);
    if (cart) {
      let newCart = cart.products.filter((elem) => elem.item.id == id);
      return newCart.length > 0 ? true : false;
    }
  };

  // пересчитываем totalPrice, так как кол-во поменялось
  // функция для изменения кол-ва товаров в корзине
  const changeProductCount = (id, count) => {
    // получаем данные корзины из localStorage
    let cart = getLocalStorage();
    // перебираем массив с продуктами из корзины, и у продукта, у которого id совпадает  с тем id, что передали при вызове, перезаписываем кол-во и subPrice
    cart.products = cart.products.map((product) => {
      if (product.item.id === id) {
        product.count = count;
        product.subPrice = calcSubPrice(product);
      }
      return product;
    });
    cart.totalPrice = calcTotalPrice(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({ type: ACTIONS.GET_CART, payload: cart });
  };
  // !delete
  const deleteProductFromCart = (id) => {
    let cart = getLocalStorage();
    // фильтруем массив products, и оставляем только те продукты, у которых id не совпадает с id переданным при вызове функции
    cart.products = cart.products.filter((elem) => {
      return elem.item.id !== id;
    });
    cart.totalPrice = calcTotalPrice(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: ACTIONS.GET_CART,
      payload: cart,
    });
  };

  const values = {
    addProductToCart,
    cart: state.cart1,
    getCart,
    checkProductInCart,
    changeProductCount,
    deleteProductFromCart,
    getProductsCountInCart,
  };
  return <cartContext.Provider value={values}>{children}</cartContext.Provider>;
};

export default CartContextProvider;
