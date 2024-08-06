import DeleteIcon from "@mui/icons-material/Delete";
import { Grid, IconButton } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { deleteProduct } from "store/slices/cartSlice";
import { RootState } from "store/store";
import { Text } from "ui-layout";
import { useAppDispatch } from "../../store/store";
import { useTheme } from "styled-components";
import CartListItem from "./cartListItem";

const CartList: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { t } = useTranslation(["product", "translation"]);

  const theme = useTheme();
  const cart = useSelector((st: RootState) => st.cart);
  const dispatch = useAppDispatch();
  return (
    <>
      <Grid container sx={{ width: "100%" }} direction={"column"}>
        {cart.items.map((item, idx) => {
          return <CartListItem item={item.product} quantity={item.quantity} idx={idx} />;
        })}
      </Grid>
    </>
  );
};

export default CartList;
