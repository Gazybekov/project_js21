import React from "react";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import AboutPage from "../pages/AboutPage";
import NotFoundPage from "../pages/NotFoundPage";
import CartPage from "../pages/CartPage";
import AuthPage from "../pages/AuthPage";
import AdminPage from "../pages/AdminPage";
import EditPage from "../pages/EditPage";
import { Route, Routes } from "react-router-dom";
import AddProduct from "../components/product/AddProduct";

const MainRoutes = () => {
  const PUBLIC_ROUTES = [
    { id: 1, link: "/", element: <HomePage /> },
    { id: 2, link: "/products", element: <ProductPage /> },
    { id: 3, link: "/about", element: <AboutPage /> },
    { id: 4, link: "*", element: <NotFoundPage /> },
    { id: 5, link: "/cart", element: <CartPage /> },
    { id: 6, link: "/auth", element: <AuthPage /> },
    { id: 7, link: "/addProduct", element: <AddProduct /> },
    { id: 8, link: "/edit/:id", element: <EditPage /> },
  ];
  const PRIVATE_ROUTES = [{ id: 7, link: "/admin", element: <AdminPage /> }];
  return (
    <div>
      <Routes>
        {PUBLIC_ROUTES.map((elem) => (
          <Route path={elem.link} key={elem.id} element={elem.element} />
        ))}
      </Routes>
    </div>
  );
};

export default MainRoutes;
