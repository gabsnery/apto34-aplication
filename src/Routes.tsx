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
import AboutUs from "pages/AboutUs";
import Loading from "components/Loading";
import ConfirmationModalHandler from "components/ConfirmationModalHandler";
import Orders from "pages/Orders";
//import { GAInitializate } from "utils/functions/googleAnalytics";w

/* const Areas = lazy(
  () =>
    import(
      './pages/Areas'
    )
) */
const AppRoutes = () => {
  return (
    <Suspense >
      <Routes>
        <Route path="/admin/product"  element={<PrivateRoute  path="/login" />}>
          <Route path="/admin/product" element={<ProdAdm />} />
        </Route>
        <Route path="/" element={<PrivateRoute both path="/login" />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<PrivateRoute unprivate path="/login" />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/store/:category" element={<PrivateRoute both />}>
          <Route path="/store/:category" element={<Products />} />
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
        <Route path="/aboutUs" element={<PrivateRoute both />}>
          <Route path="/aboutUs" element={<AboutUs />} />
        </Route>
        <Route path="/orders" element={<PrivateRoute  />}>
          <Route path="/orders" element={<Orders />} />
        </Route>
      </Routes>
      <ConfirmationModalHandler/>
    </Suspense>
  );
};

export default AppRoutes;
