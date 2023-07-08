import { Container, List, ListItem, ListItemText, useTheme } from "@mui/material";
import React, { FC, Suspense } from "react";
import Loading from "../Loading";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { Text,Button } from "ui-layout";
import { useAppDispatch } from "../../store/store";
import { clearCart } from "store/slices/cartSlice";

const CartList: React.FC<React.PropsWithChildren<unknown>> = () => {
  const theme = useTheme();
  const cart = useSelector((st: RootState) => st.cart)
  const dispatch = useAppDispatch();

  return (
    <>
    <Button variant='text' color="primary" onClick={()=>{
                  dispatch(clearCart())

    }}> apaga </Button>
      <List >
        {cart.items.map((item, idx) => {
          return (
            <React.Fragment key={idx}>
              <ListItem title="list-item" divider >
                <ListItemText>{item.product.name}</ListItemText>
                <ListItemText>{item.product.value}</ListItemText>
                <ListItemText>{item.quantity}</ListItemText>
              </ListItem>
            </React.Fragment>)
        })}
      </List>
      <Text variant="body" color="primary">{cart.total}</Text>
    </>
  );
};

export default CartList;

