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
import {Admin} from "pages/Admin" ;
import CloseOrder from "pages/CloseOrder";
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
        <Route path="/admin/product"  element={<PrivateRoute admin={true} path="/login" />}>
          <Route path="/admin/product" element={<ProdAdm />} />
        </Route>
        <Route path="/" element={<PrivateRoute both path="/login" />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<PrivateRoute unprivate path="/login" />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/store" element={<PrivateRoute both />}>
          <Route path="/store" element={<Products />} />
        </Route>
        <Route path="/cart" element={<PrivateRoute both />}>
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="/close-order" element={<PrivateRoute both />}>
          <Route path="/close-order" element={<CloseOrder />} />
        </Route>
        <Route path="/product/:id" element={<PrivateRoute both />}>
          <Route path="/product/:id" element={<Product />} />
        </Route>
        <Route path="/admin" element={<PrivateRoute admin />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
