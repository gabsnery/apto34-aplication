import { useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "store";
import { Button, Text } from "ui-layout";
import { useAppDispatch } from "../../store/store";
import { useCheckAvailabilityMutation } from "store/api/product";
import { setSnackbar } from "store/slices/snackbarSlice";

const CartOverview: React.FC<React.PropsWithChildren<unknown>> = () => {
  const theme = useTheme();
  const cart = useSelector((st: RootState) => st.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [checkAvailability, { data }] = useCheckAvailabilityMutation();

  useEffect(() => {
    
  if(data===true){
    navigate("/close-order");
  }else if(data===false){
    dispatch(setSnackbar({
      type: 'error',
      message: `um dos itens está fora de estoque, atualize a tela`,
      duration: 4000
    }))
  }
  }, [data]);
  return (
    <>
      <div
        style={{
          height: "30vh",
          width: "100%",
          position: "sticky",
        }}
      >
        <div style={{ margin: "20px 0" }}>
          <Text variant="h3">{t("purchaseSummary")}</Text>
        </div>
        <div style={{ margin: "20px 0" }}>
          <Text variant="h4">
            {t("totalAmount", { value: cart.total.toFixed(2) })}
          </Text>
        </div>
        <Button
          variant={"action"}
          disabled={cart.total === 0}
          onClick={() => {
            checkAvailability(
              cart.items.map((item) => ({
                id: item.product.id,
                quantidade: item.quantity,
                idColor: item.idColor,
                idSize: item.idSize,
              }))
            );
            /*  */
          }}
        >
          {t("proceedToCheckout")}
        </Button>
      </div>
    </>
  );
};

export default CartOverview;
