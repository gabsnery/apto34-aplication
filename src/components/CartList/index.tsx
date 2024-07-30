import {
  Container,
  List,
  ListItem,
  useTheme,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  Grid,
  IconButton,
} from "@mui/material";
import React, { FC, Suspense, useEffect } from "react";
import Loading from "../Loading";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { Text, Button } from "ui-layout";
import { useAppDispatch } from "../../store/store";
import { clearCart, deleteProduct } from "store/slices/cartSlice";
import DeleteIcon from "@mui/icons-material/Delete";

const CartList: React.FC<React.PropsWithChildren<unknown>> = () => {
  const theme = useTheme();
  const cart = useSelector((st: RootState) => st.cart);
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("🚀 ~ useEffect ~ cart:", cart);
  }, [cart]);
  return (
    <>
      <Grid container sx={{ width: "100%" }} direction={"column"}>
        {cart.items.map((item, idx) => {
          return (
            <Grid item container key={idx}>
              <Grid item xs={4} sm={2}>
                {item.product.thumbnails.length > 0 && (
                  <img
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
                  />
                )}
              </Grid>
              <Grid container item xs={8} sm={10}>
                <Grid item xs={12} sm={6} alignContent={'center'}>
                  <Text variant={'h5'}>{item.product.nome}</Text>
                  
                </Grid>
                <Grid item xs={12} sm={2} alignContent={'center'}>
                  <Text variant={'h5'}>R${(+item.product.valor_produto).toFixed(2)}</Text>
                  
                </Grid>
                <Grid item xs={12} sm={2} alignContent={'center'}>
                <Text variant={'h5'}>{item.quantity}</Text>
                </Grid>
                <Grid item xs={12} sm={2} alignContent={'center'}>
                  <IconButton
                    sx={{ cursor: "pointer", justifyContent: "end" }}
                    onClick={() => {
                      dispatch(deleteProduct(item.product));
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default CartList;
