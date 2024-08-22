import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { Select, TextField, Text, Button } from "ui-layout";

import {
  getIssuers,
  getPaymentMethods,
} from "@mercadopago/sdk-react/coreMethods";
import { PaymentMethods } from "@mercadopago/sdk-react/coreMethods/getPaymentMethods/types";
import { PayerCost } from "@mercadopago/sdk-react/coreMethods/util/types";
import { createCardToken } from "@mercadopago/sdk-react/coreMethods";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { Grid } from "@mui/material";
import { useTheme } from "styled-components";
import { useGetClientQuery } from "store/api/Client";

export const CreditCardComponent = (props: {
  setAllowFinish: (value: boolean) => void;
  setPaymentInfo: (props: {
    token?: string;
    installments?: number;
    payment_method_id?: string;
    issuer_id?: string;
  }) => void;
}) => {
  const { setAllowFinish, setPaymentInfo } = props;
  const [installments, setInstallments] = useState<PayerCost[]>([]);
  const [installment, setInstallment] = useState<number>(0);
  const [issuerId, setIssuerId] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [payment_method_id, setPayment_method_id] = useState<string>("");
  const cart = useSelector((st: RootState) => st.cart);
  const { t } = useTranslation();
  const theme = useTheme();
  const [formData, setFormData] = useState<{
    CREDIT_CARD_NUMBER: string;
    CARDHOLDER_NAME: string;
    cardExpirationMonth: string;
    cardExpirationYear: string;
    securityCode: string;
    identity: string;
    installments: number;
  }>({
    CREDIT_CARD_NUMBER: "5031 4332 1540 6351",
    CARDHOLDER_NAME: "APRO",
    cardExpirationMonth: "11",
    cardExpirationYear: "25",
    securityCode: "123",
    identity: "12345678909",
    installments: 0,
  });
  useEffect(() => {
    if (
      installment !== 0 &&
      issuerId !== "" &&
      token !== "" &&
      payment_method_id !== ""
    ) {
      setPaymentInfo({
        token,
        installments: installment,
        payment_method_id: payment_method_id,
        issuer_id: issuerId,
      });
      setAllowFinish(true);
    }
  }, [installment, issuerId, token, payment_method_id]);
  const disabled = true;
  useEffect(() => {
    getPaymentMethods({
      bin: formData.CREDIT_CARD_NUMBER.replaceAll(" ", ""),
    }).then((methods?: PaymentMethods) => {
      if (methods) {
        setInstallments(methods?.results[0].payer_costs || []);
        getIssuers({
          paymentMethodId: methods?.results[0].id,
          bin: formData.CREDIT_CARD_NUMBER.replaceAll(" ", ""),
        }).then((issuer) => {
          if (issuer) {
            setPayment_method_id(methods?.results[0].id);
            setIssuerId(issuer[0].id);
          }
        });
      }
    });
    if (formData.CREDIT_CARD_NUMBER.length > 6)
      createCardToken({
        cardNumber: formData.CREDIT_CARD_NUMBER.replaceAll(" ", ""),
        securityCode: formData.securityCode,
        cardExpirationMonth: formData.cardExpirationMonth,
        cardExpirationYear: formData.cardExpirationYear,
        cardholderName: formData.CARDHOLDER_NAME,
        identificationType: "CPF",
        identificationNumber: formData.identity,
      })
        .then((card_token) => {
          if (card_token?.id) setToken(card_token?.id.toString());
        })
        .catch((err) => {
          console.log("🚀 ~ useEffect ~ err:", err);
        });
  }, [formData]);
  useEffect(() => {}, [formData]);

  return (
    <Grid container columnSpacing={2}>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          label={t("card.name")}
          onChange={(ev) =>
            setFormData({ ...formData, CARDHOLDER_NAME: ev.target.value })
          }
          disabled={disabled}
          value={formData.CARDHOLDER_NAME || ""}
          required
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          label={t("card.number")}
          onChange={(ev) =>
            setFormData({
              ...formData,
              CREDIT_CARD_NUMBER: ev.target.value,
            })
          }
          disabled={disabled}
          value={formData.CREDIT_CARD_NUMBER || ""}
          required
        />
      </Grid>
      <Grid item xs={6} sm={6} md={4}>
        <TextField
          label={`${t("card.expiryDate")} (${t("month")})`}
          onChange={(ev) =>
            setFormData({
              ...formData,
              cardExpirationMonth: ev.target.value,
            })
          }
          disabled={disabled}
          value={formData.cardExpirationMonth || ""}
          required
        />
      </Grid>
      <Grid item xs={6} sm={6} md={4}>
        <TextField
          label={`${t("card.expiryDate")} (${t("year")})`}
          onChange={(ev) =>
            setFormData({
              ...formData,
              cardExpirationYear: ev.target.value,
            })
          }
          disabled={disabled}
          value={formData.cardExpirationYear || ""}
          required
        />
      </Grid>
      <Grid item xs={4} sm={3} md={4}>
        <TextField
          label={t("card.cvv")}
          onChange={(ev) =>
            setFormData({ ...formData, securityCode: ev.target.value })
          }
          disabled={disabled}
          value={formData.securityCode || ""}
          required
        />
      </Grid>
      <Grid item xs={8} sm={5} md={6}>
        <TextField
          label={t("card.identity")}
          onChange={(ev) =>
            setFormData({ ...formData, identity: ev.target.value })
          }
          disabled={disabled}
          value={formData.identity || ""}
          required
        />
      </Grid>
      {installments.length > 0 && (
        <Grid item xs={12} sm={4} md={6}>
          <Select
            name={"installments"}
            label={t("installments")}
            value={formData.installments.toString()}
            onChange={(e) => {
              if (+(e.target.value as string) > 0) {
                setAllowFinish(true);

                setFormData({
                  ...formData,
                  installments: +(e.target.value as string),
                });
                setInstallment(+(e.target.value as string));
              }
            }}
            options={
              installments
                .filter(
                  (i) => cart.total / i.installments >= i.min_allowed_amount
                )
                ?.map((item) => ({
                  value: item.installments.toString(),
                  label:
                    item.installments === 0
                      ? ""
                      : `${item.installments} parcela (${
                          item.installment_rate
                        }%) (${item.installments} * ${
                          cart.total / item.installments +
                          (cart.total / item.installments) *
                            (item.installment_rate / 100)
                        }) (${cart.total * (item.installment_rate / 100 + 1)})`,
                })) || []
            }
          />
        </Grid>
      )}
    </Grid>
  );
};
