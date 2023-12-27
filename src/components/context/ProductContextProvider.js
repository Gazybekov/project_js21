import React, { createContext, useContext, useEffect, useReducer } from "react";
import { ACTIONS, API } from "../../helpers/const";
import axios from "axios";
export const productContext = createContext();
export const useProducts = () => useContext(productContext);

const INIT_STATE = {
  products: [],
  oneProduct: null,
  categories: [],
};
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTIONS.GET_PRODUCTS:
      return { ...state, products: action.payload };
    case ACTIONS.GET_ONE_PRODUCT:
      return { ...state, oneProduct: action.payload };
    case ACTIONS.GET_CATEGORIES:
      return { ...state, categories: action.payload };
  }
};

const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  //! CREATE
  const addProduct = async (newProduct) => {
    await axios.post(API, newProduct);
  };
  //! READ
  const getProducts = async () => {
    const { data } = await axios(API);
    dispatch({
      type: ACTIONS.GET_PRODUCTS,
      payload: data,
    });
  };

  const values = {
    addProduct,
    getProducts,
    products: state.products,
  };
  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
};

export default ProductContextProvider;
