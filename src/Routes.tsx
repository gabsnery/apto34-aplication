import Products from "pages/Products";
import PrivateRoute from "./components/PrivateRoute";
//import I18nInstance from "i18n";
import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "pages/Login";
import Cart from "pages/Cart";
import Home from "pages/Home";
import {Product as ProdAdm} from "pages/Admin/Product" ;
import Product from "pages/Product" ;
//import { GAInitializate } from "utils/functions/googleAnalytics";w

/* const Areas = lazy(
  () =>
    import(
      './pages/Areas'
    )
) */
const AppRoutes = () => {
  return (
    <Suspense fallback={<div>carregando</div>}>
      <Routes>
        <Route path="/admin/product" element={<PrivateRoute path="/login" />}>
          <Route path="/admin/product" element={<ProdAdm />} />
        </Route>
        <Route path="/" element={<PrivateRoute unprivate path="/login" />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<PrivateRoute unprivate path="/login" />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/store" element={<PrivateRoute unprivate />}>
          <Route path="/store" element={<Products />} />
        </Route>
        <Route path="/cart" element={<PrivateRoute unprivate />}>
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="/product/:id" element={<PrivateRoute unprivate />}>
          <Route path="/product/:id" element={<Product />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
