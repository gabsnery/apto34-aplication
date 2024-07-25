import {
  Container,
  List,
  ListItem,
  ListItemText,
  useTheme,
  ListItemAvatar,
} from "@mui/material";
import React, { FC, Suspense, useEffect } from "react";
import Loading from "../Loading";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { Text, Button } from "ui-layout";
import { useAppDispatch } from "../../store/store";
import { clearCart } from "store/slices/cartSlice";

const CartList: React.FC<React.PropsWithChildren<unknown>> = () => {
  const theme = useTheme();
  const cart = useSelector((st: RootState) => st.cart);
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("🚀 ~ useEffect ~ cart:", cart);
  }, [cart]);
  return (
    <>
      <Button
        variant="text"
        color="primary"
        onClick={() => {
          dispatch(clearCart());
        }}
      >
        {" "}
        apaga{" "}
      </Button>
      <List>
        {cart.items.map((item, idx) => {
          return (
            <React.Fragment key={idx}>
              <ListItem title="list-item" divider>
                <ListItem sx={{width:"200px"}}>
                 { item.product.thumbnails.length>0&& <img
                    style={{
                      backgroundImage: `url(${
                        item.product.thumbnails.length > 0
                          ? item.product.thumbnails[0]
                          : "https://www.futuraexpress.com.br/blog/wp-content/uploads/2020/03/JPG-Alta-Qualidade.jpg"
                      })`,
                      width: "100%",
                      height: "150px",
                      backgroundPosition: "top",
                      backgroundSize: "cover",
                    }}
                  />}
                </ListItem>
                <ListItemText>{item.product.nome}</ListItemText>
                <ListItemText>{item.product.valor_produto}</ListItemText>
                <ListItemText>{item.quantity}</ListItemText>
              </ListItem>
            </React.Fragment>
          );
        })}
      </List>
    </>
  );
};

export default CartList;
