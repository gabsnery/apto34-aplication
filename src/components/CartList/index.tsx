import DeleteIcon from "@mui/icons-material/Delete";
import {
  Grid,
  IconButton
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { deleteProduct } from "store/slices/cartSlice";
import { RootState } from "store/store";
import { Text } from "ui-layout";
import { useAppDispatch } from "../../store/store";
import { useTheme } from "styled-components";

const CartList: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { t } = useTranslation(['product',  'translation']);

  const theme = useTheme();
  const cart = useSelector((st: RootState) => st.cart);
  const dispatch = useAppDispatch();
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
                  <Text variant={'h5'}>{t(`product:name_${item.product.id}`)}</Text>
                  
                </Grid>
                <Grid item xs={12} sm={2} alignContent={'center'}>
                  <Text variant={'h5'}>{(+item.product.valor_produto).toFixed(2)}</Text>
                  
                </Grid>
                <Grid item xs={12} sm={2} alignContent={'center'}>
                <Text variant={'h5'}>{item.quantity}</Text>
                </Grid>
                <Grid item xs={12} sm={2} alignContent={'center'}>
                  <IconButton
                    sx={{ cursor: "pointer", justifyContent: "end",color:theme.text.primary
           }}
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
