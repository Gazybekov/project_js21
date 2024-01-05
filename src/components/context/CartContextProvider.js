import React, { createContext, useContext, useReducer } from "react";
import { ACTIONS } from "../../helpers/const";
import { getLocalStorage } from "../../helpers/functions";
export const cartContext = createContext();
export const useCart = () => useContext(cartContext);
const INIT_STATE = {
  cart: JSON.parse(localStorage.getItem("cart")),
};
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTIONS.GET_CART:
      return { ...state, cart: action.payload };
    default:
      return state;
  }
};
const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  // функция для получения продуктов добавленных из хранилища
  const getCart = () => {
    const cart = getLocalStorage();
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
    localStorage.setItem("cart", JSON.stringify(cart));
    // обновляем состояние
    dispatch({ type: ACTIONS.GET_CART, payload: cart });
  };
  const values = {
    addProductToCart,
    cart: state.cart,
  };
  return <cartContext.Provider value={values}>{children}</cartContext.Provider>;
};

export default CartContextProvider;
