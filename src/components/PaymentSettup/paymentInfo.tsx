import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { Select, TextField, Text } from "ui-layout";

import { getPaymentMethods } from "@mercadopago/sdk-react/coreMethods";
import { PaymentMethods } from "@mercadopago/sdk-react/coreMethods/getPaymentMethods/types";
import { PayerCost } from "@mercadopago/sdk-react/coreMethods/util/types";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { Grid } from "@mui/material";
import { useTheme } from "styled-components";
import { useGetClientQuery } from "store/api/Client";
import { CreditCardComponent } from "./PaymentDataInput/CreditCard";
import { IPayment } from "store/api/payment/mercadoPago.interface";
interface Props {
  setPaymentInfo: (value: IPayment) => void;
  paymentInfo?: IPayment;
  setAllowFinish: (value: boolean) => void;
}
const PaymentInfo: React.FC<React.PropsWithChildren<Props>> = ({
  setPaymentInfo,
  paymentInfo,
  setAllowFinish,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [installments, setInstallments] = useState<PayerCost[]>([]);
  const [email, setEmail] = useState<string>("");
  const cart = useSelector((st: RootState) => st.cart);
  const disabled = true;
  const { data: clientData, refetch } = useGetClientQuery();

  const [type, setType] = useState<
    undefined | "CreditCard" | "PIX" | "Invoice"
  >();

  useEffect(() => {
    if (type === "Invoice") {
      const today = new Date();
      setPaymentInfo({
        payer: {
          email: clientData?.email || "",
          first_name: clientData?.nome || "",
          last_name: clientData?.sobrenome || "",
          identification: {
            type: "CPF",
            number: clientData?.cpf || "02570199010",
          },
        },
        payment_method_id: "bolbradesco",
        transaction_amount: 200,
        date_of_expiration: new Date(today.setDate(today.getDate() + 3)),
      });
      setAllowFinish(true);
    } else if (type === "PIX") {
      setPaymentInfo({
        payer: {
          email: clientData?.email || "",
          first_name: clientData?.nome || "",
          last_name: clientData?.sobrenome || "",
          identification: {
            type: "CPF",
            number: clientData?.cpf || "02570199010",
          },
        },
        payment_method_id: "pix",
        transaction_amount: 0.1,
      });
      setAllowFinish(true);
    }
  }, [type]);

  return (
    <>
      <FormControl sx={{ width: "100%" }}>
        <Text variant={"h4"}>{t("paymentType")}</Text>

        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          value={type}
          onChange={(event) => {
            setType(
              (event.target as HTMLInputElement).value as
                | "CreditCard"
                | "PIX"
                | "Invoice"
            );
          }}
        >
          <FormControlLabel
            sx={{ color: theme.text.primary }}
            value="CreditCard"
            control={<Radio />}
            label="CreditCard"
          />
          <FormControlLabel
            sx={{ color: theme.text.primary }}
            value="PIX"
            control={<Radio />}
            label="PIX"
          />
          <FormControlLabel
            sx={{ color: theme.text.primary }}
            value="Invoice"
            control={<Radio />}
            label="Invoice"
          />
        </RadioGroup>
      </FormControl>
      {process.env.REACT_APP_ENV !== "production" && type !== undefined && (
        <Text variant="body" color={"error"}>
          {t(`payment_type_detail_${type}`)}
        </Text>
      )}

      <Grid container columnSpacing={2} margin={"10px 0"}>
        {process.env.REACT_APP_ENV !== "production" && type !== undefined && (
          <Text variant="body">{t(`email_sended`)}</Text>
        )}
      </Grid>
      <Grid container columnSpacing={2} margin={"10px 0"}>
        {process.env.REACT_APP_ENV !== "production" && type !== undefined && (
          <Text variant="body">{t(`sorry_message`)}</Text>
        )}
      </Grid>
      {type === "CreditCard" && (
        <CreditCardComponent
          setAllowFinish={setAllowFinish}
          setPaymentInfo={({
            token,
            installments,
            payment_method_id,
            issuer_id,
          }) => {
            setPaymentInfo({
              installments: installments || paymentInfo?.installments, //parcelas
              payer: {
                email: email,
                first_name: clientData?.nome || "",
                last_name: clientData?.sobrenome || "",
                identification: { type: "CPF", number: clientData?.cpf || "" },
              },
              payment_method_id:
                payment_method_id || paymentInfo?.payment_method_id,
              issuer_id: issuer_id || paymentInfo?.issuer_id,
              card_token: token || paymentInfo?.card_token,
              transaction_amount: cart.total,
            });
          }}
        />
      )}
    </>
  );
};

export default PaymentInfo;
