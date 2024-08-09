import {
  getIdentificationTypes,
  getIssuers,
  initMercadoPago,
} from "@mercadopago/sdk-react";
import { Drawer, Grid, Step, StepLabel, Stepper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAddOrderMutation } from "store/api/Order";
import {
  useAddPaymentMutation,
  useAddPreferenceMutation,
  useGetCardTokenMutation,
} from "store/api/payment";
import { RootState } from "store/store";
import { Button, Text } from "ui-layout";
import { useAppDispatch } from "../../store/store";

import { getPaymentMethods } from "@mercadopago/sdk-react/coreMethods";
import { PaymentMethods } from "@mercadopago/sdk-react/coreMethods/getPaymentMethods/types";
import { useTypedSelector } from "hooks";
import { setSnackbar } from "store/slices/snackbarSlice";
import AddreddInfo from "./addreddInfo";
import DeliverInfo from "./deliverInfo";
import PaymentInfo from "./paymentInfo";
import PersonalInfo from "./personalInfo";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";
import { clearCart } from "store/slices/cartSlice";
import { useGetClientQuery } from "store/api/Client";
const steps = ["identity", "deliver", "payment"];

const Payment_: React.FC<React.PropsWithChildren<unknown>> = () => {
  const cart = useSelector((st: RootState) => st.cart);
  const [getCardToken, { data: cardToken }] = useGetCardTokenMutation();
  const [activeStep, setActiveStep] = React.useState(0);
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const { email } = useTypedSelector(({ auth }) => auth);
  const token = useTypedSelector(({ auth }) => auth.token);
  const { id: userID } = useTypedSelector(({ auth }) => auth);
  const {data:clientData} = useGetClientQuery()
  const navigate = useNavigate();

  const [paymentInfo, setPaymentInfo] = useState<any>();
  const [personalInfoData, setPersonalInfoData] = useState<any>({});
  const [addressInfoData, setAddressInfoData] = useState<any>({});
  const [allowFinish, setAllowFinish] = useState<boolean>(false);
  const [addPreference, { isSuccess, data }] = useAddPreferenceMutation();
  const [addOrder, { data: orderResponse }] = useAddOrderMutation();
  const [addPayment, { data: payment }] = useAddPaymentMutation();
  const [qr_code_base64, setqQr_code_base64] = useState<string>("");

  const handleNext = () => {
    activeStep < steps.length - 1 &&
      setActiveStep((prevActiveStep) => prevActiveStep + 1);

    if (activeStep === steps.length - 1) {
      getIdentificationTypes().then((e) => {
        console.log("eee", e);
      });

      addOrder({
        clienteId: userID,
        total: cart.total,
        produtos: cart.items.map((product) => ({
          id: product.product.id,
          quantidade: product.quantity,
        })),
        endereco: {
          cep: "13400690",
          logradouro: "rua aqui",
          numero: "55",
          complemento: "qq",
          bairro: "qqs",
        },
      });
    }
  };
  useEffect(() => {
    if (data) {
      if (data.init_point) window.open(data.init_point, "_blank");
    }
  }, [data]);
  const handleBack = () => {
    activeStep > 0 && setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  useEffect(() => {
    if (process.env.REACT_APP_MERCADOLIVRE_TOKEN)
      initMercadoPago(process.env.REACT_APP_MERCADOLIVRE_TOKEN);
  }, []);
  useEffect(() => {
    if (payment?.pix_qrcode !== "") setqQr_code_base64(payment?.pix_qrcode);
    if (payment) dispatch(clearCart());
  }, [payment]);
  useEffect(() => {
    if (orderResponse) {
      if (
        paymentInfo.hasOwnProperty("CREDIT_CARD_NUMBER") &&
        paymentInfo.hasOwnProperty("cardExpirationMonth") &&
        paymentInfo.hasOwnProperty("cardExpirationYear") &&
        paymentInfo.hasOwnProperty("CARDHOLDER_NAME") &&
        paymentInfo.hasOwnProperty("identity")
      )
        getCardToken({
          card_number: paymentInfo.CREDIT_CARD_NUMBER.replaceAll(" ", ""),
          security_code: paymentInfo.securityCode,
          card_expiration_month: paymentInfo.cardExpirationMonth,
          card_expiration_year: paymentInfo.cardExpirationYear,
          card_holder_name: paymentInfo.CARDHOLDER_NAME,
          identification_type: "CPF",
          identification_number: paymentInfo.identity,
        });
      else {
        addPayment({ ...paymentInfo, id: orderResponse.id || 1 });
      }
      addPreference({
        payer: {
          name: clientData?.nome||'',
          surname: clientData?.sobrenome||'',
          email: clientData?.email||'',
          address: {
            street_name: addressInfoData.street_name || "",
            street_number: +addressInfoData.street_number,
            zip_code: "5700",
          },
        },
        items: cart.items.map((item: any) => ({
          id: item.product.id.toString(),
          title: item.product.nome,
          currency_id: "BRL",
          description: item.product.nome,
          category_id: item.product.produtoSubcategoria[0]
            ? item.product.produtoSubcategoria[0].id.toString()
            : undefined,
          quantity: +item.quantity,
          unit_price: +item.product.valor_produto,
        })),
      });
    }
  }, [orderResponse]);
  useEffect(() => {
    if (cardToken && orderResponse) {
      if (paymentInfo) {
        getPaymentMethods({
          bin: paymentInfo.CREDIT_CARD_NUMBER.replaceAll(" ", ""),
        })
          .then((value) => {
            const methods: PaymentMethods = value as PaymentMethods;
            methods &&
              getIssuers({
                paymentMethodId: methods.results[0].id,
                bin: paymentInfo.CREDIT_CARD_NUMBER.replaceAll(" ", ""),
              })
                .then((issuer) => {
                  issuer &&
                    addPayment({
                      id: orderResponse.id || 1,
                      installments: paymentInfo.installments, //parcelas
                      payer: {
                        email: email,
                        identification: { type: "CPF", number: document },
                      },
                      payment_method_id: methods.results[0].id,
                      issuer_id: issuer[0].id,
                      token: cardToken.id,
                      transaction_amount: cart.total,
                    });
                })
                .catch((e) => {
                  dispatch(
                    setSnackbar({
                      type: "error",
                      message: JSON.stringify(e),
                      duration: 4000,
                    })
                  );
                });
          })
          .catch((e) => {
            dispatch(
              setSnackbar({
                type: "error",
                message: JSON.stringify(e),
                duration: 4000,
              })
            );
          });
      }
    }
  }, [cardToken]);
  return cart.items?.length > 0 ? (
    <Grid
      container
      item
      paddingX={{ xs: "20px", md: "200px" }}
      columnSpacing={2}
    >
      <Grid xs={12} md={10} container item justifyContent={"space-between"}>
        <Grid xs={12} md={12} item>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>
                    {" "}
                    <Text variant="body" color={"secondary"}>
                      {t(`${label}`)}
                    </Text>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Grid>
        <Grid
          xs={12}
          md={12}
          item
          container
          direction="column"
          style={{ minHeight: "500px" }}
        >
          {activeStep === 0 && <PersonalInfo />}
          {activeStep === 1 && <AddreddInfo />}
          {/* {activeStep === 1 && <DeliverInfo />} */}
          {activeStep === 2 && (
            <Grid xs={12} md={12} item>
              <PaymentInfo
                setPaymentInfo={setPaymentInfo}
                setAllowFinish={setAllowFinish}
              />
              {qr_code_base64}
              {qr_code_base64 && (
                <img
                  style={{ maxWidth: "100%" }}
                  src={`data:image/jpeg;base64,${qr_code_base64}`}
                />
              )}
            </Grid>
          )}
        </Grid>
        <Grid xs={6} item>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant={"secondary"}
          >
            {t("back")}
          </Button>
        </Grid>
        <Grid xs={6} item>
          <Button
            onClick={handleNext}
            disabled={
              activeStep === 0
                ? !token
                : activeStep === 2
                  ? !allowFinish
                  : false
            }
            variant={"primary"}
          >
            {activeStep === steps.length - 1 ? t("pay") : t("next")}
          </Button>
        </Grid>
        <Grid xs={12} item>
          <Button
            variant={"tertiary"}
            onClick={() => {
              navigate("/store");
            }}
          >
            Cancelar
          </Button>
        </Grid>
      </Grid>
      <Grid xs={12} md={2} item container direction={"column"}>
        <Text> {t("details")}</Text>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  ) : (
    <Grid container justifyContent={"center"} rowSpacing={2}>
      <Grid item xs={12}>
        <Text variant={"h3"}> {t("emptyCart")}</Text>
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={() => {
            navigate("/store");
          }}
        >
          {t("goto_store")}
        </Button>
      </Grid>
    </Grid>
  );
};

export default Payment_;
