import { Container, List, ListItem, Box, useTheme } from "@mui/material";
import React, { FC, Suspense } from "react";
import Loading from "../Loading";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { Text, Button } from "ui-layout";
import { useAppDispatch } from "../../store/store";
import { clearCart } from "store/slices/cartSlice";

const Banner: React.FC<React.PropsWithChildren<unknown>> = () => {
  const theme = useTheme();
  const cart = useSelector((st: RootState) => st.cart)
  const dispatch = useAppDispatch();

  return (
    <Box sx={{
      height: '400px',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      position: 'relative',
      px:0,
      backgroundImage:"linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://cdn11.bigcommerce.com/s-3uewkq06zr/images/stencil/400x400/products/239/544/fluorescent_pink__47164.1492541091.png?c=2')"
    }}>
      teste
    </Box>
  );
};

export default Banner;

