import { Drawer, Grid } from "@mui/material";
//import { Link } from 'react-router-dom'
import CategorySelector from "components/CategorySelector";
import FilterBar from "components/FilterBar";
import OrderList from "components/OrderList";
import ProductsGrid from "components/ProductGrid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetCategoriasQuery } from "store/api/category";
import { addFilter, clearOneFilter, setFilter } from "store/slices/sessionFilterSlice";
import { RootState, useAppDispatch } from "store/store";
import { useTheme } from "styled-components";
import { Button } from "ui-layout";
import { lightTheme } from "ui-layout/theme";
// import ReCAPTCHA from 'react-google-recaptcha'
// import { add, isAfter } from 'date-fns'

const Orders: React.FC<React.PropsWithChildren<unknown>> = () => {

  return (
<OrderList/>
  );
};
export default Orders;
