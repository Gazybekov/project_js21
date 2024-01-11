import React from "react";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import AboutPage from "../pages/AboutPage";
import NotFoundPage from "../pages/NotFoundPage";
import CartPage from "../pages/CartPage";
import AuthPage from "../pages/AuthPage";
import AdminPage from "../pages/AdminPage";
import EditPage from "../pages/EditPage";
import { Navigate, Route, Routes } from "react-router-dom";
import AddProduct from "../components/product/AddProduct";
import AddCategoryModal from "../components/product/AddCategoryModal";
import { ADMIN } from "../helpers/const";
import { useAuth } from "../components/context/AuthContextProvider";

const MainRoutes = () => {
  const PUBLIC_ROUTES = [
    { id: 1, link: "/", element: <HomePage /> },
    { id: 2, link: "/products", element: <ProductPage /> },
    { id: 3, link: "/about", element: <AboutPage /> },
    { id: 4, link: "*", element: <NotFoundPage /> },
    { id: 5, link: "/cart", element: <CartPage /> },
    { id: 6, link: "/auth", element: <AuthPage /> },
  ];
  const PRIVATE_ROUTES = [
    { id: 7, link: "/admin", element: <AdminPage /> },
    { id: 8, link: "/edit/:id", element: <EditPage /> },
  ];
  const { user } = useAuth();
  return (
    <div>
      <Routes>
        {PUBLIC_ROUTES.map((elem) => (
          <Route path={elem.link} key={elem.id} element={elem.element} />
        ))}
        {user
          ? PRIVATE_ROUTES.map((elem) => (
              <Route
                key={elem.id}
                path={elem.link}
                element={
                  user.email === ADMIN ? elem.element : <Navigate to="*" />
                }
              />
            ))
          : null}
      </Routes>
    </div>
  );
};

export default MainRoutes;
