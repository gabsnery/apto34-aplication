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
import { useNavigate } from "react-router-dom";

const CartOverview: React.FC<React.PropsWithChildren<unknown>> = () => {
  const theme = useTheme();
  const cart = useSelector((st: RootState) => st.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ cart:", cart);
  }, [cart]);
  return (<>
    <div
      style={{
        height: "30vh",
        width: "100%",
        position: "sticky",
      }}
    >
      <div style={{ margin: "20px 0" }}>
        <Text variant="h3" >
          RESUMO DA COMPRA
        </Text>
      </div>
      <div style={{ margin: "20px 0" }}>
        <Text variant="h4" >
          Total: R${cart.total.toFixed(2)}
        </Text>
      </div>
      <Button
        color={"primary"}
        variant={"primary"}
        onClick={() => {
          navigate("/close-order");
        }}
      >
          IR PARA PAGAMENTO
      </Button>
    </div>
  </>
  );
};

export default CartOverview;
