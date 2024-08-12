import {
  useTheme
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "store/store";
import { Button, Text } from "ui-layout";
import { useAppDispatch } from "../../store/store";

const CartOverview: React.FC<React.PropsWithChildren<unknown>> = () => {
  const theme = useTheme();
  const cart = useSelector((st: RootState) => st.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();


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
          {t('purchaseSummary')}
        </Text>
      </div>
      <div style={{ margin: "20px 0" }}>
        <Text variant="h4" >
        {t('totalAmount',{value:cart.total.toFixed(2)})}
        </Text>
      </div>
      <Button
        variant={"action"}
        /* disabled={cart.total===0 } */
        disabled={true}
        onClick={() => {
          navigate("/close-order");
        }}
      >
         {t('proceedToCheckout')}
      </Button>
    </div>
  </>
  );
};

export default CartOverview;
