import {
  getIdentificationTypes,
  getIssuers,
  initMercadoPago,
} from "@mercadopago/sdk-react";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAddOrderMutation } from "store/api/Order";
import {
  useAddPaymentMutation,
  useAddPreferenceMutation,
  useGetCardTokenMutation,
} from "store/api/payment";
import { RootState } from "store/store";
import { Button } from "ui-layout";
import { useAppDispatch } from "../../store/store";

import { getPaymentMethods } from "@mercadopago/sdk-react/coreMethods";
import { PaymentMethods } from "@mercadopago/sdk-react/coreMethods/getPaymentMethods/types";
import { useTypedSelector } from "hooks";
import { setSnackbar } from "store/slices/snackbarSlice";
import AddreddInfo from "./addreddInfo";
import DeliverInfo from "./deliverInfo";
import PaymentInfo from "./paymentInfo";
import PersonalInfo from "./personalInfo";

const Payment_: React.FC<React.PropsWithChildren<unknown>> = () => {
  const cart = useSelector((st: RootState) => st.cart);
  const [getCardToken, { data: cardToken }] = useGetCardTokenMutation();
  const { id: userID } = useTypedSelector(({ auth }) => auth);

  const dispatch = useAppDispatch();

  const [paymentInfo, setPaymentInfo] = useState<any>();
  const [personalInfoData, setPersonalInfoData] = useState<any>({});
  const [addressInfoData, setAddressInfoData] = useState<any>({});
  const [addPreference, { isSuccess, data }] = useAddPreferenceMutation();
  const [addOrder, { data: orderResponse }] = useAddOrderMutation();
  const [addPayment, { data: payment }] = useAddPaymentMutation();
  const [qr_code_base64, setqQr_code_base64] = useState<string>("");

  useEffect(() => {
    if (process.env.REACT_APP_MERCADOLIVRE_TOKEN)
      initMercadoPago(process.env.REACT_APP_MERCADOLIVRE_TOKEN);
  }, []);
  useEffect(() => {
    if (payment?.pix_qrcode !== "") setqQr_code_base64(payment?.pix_qrcode);
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
          name: personalInfoData.name,
          surname: personalInfoData.surname,
          email: personalInfoData.email,
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
                        email: "admin@gatostecnologia.com",
                        identification: { type: "CPF", number: "12345678909" },
                      },
                      payment_method_id: methods.results[0].id,
                      issuer_id: issuer[0].id,
                      token: cardToken.id,
                      transaction_amount: cart.total,
                    });
                })
                .catch((e) => {
                  console.log("erro", e);
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
            console.log("erro", e);
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
  return (
    <Grid container  paddingX={{xs:'20px',md:'200px'}} columnSpacing={2}>
      <Grid xs={12} md={4} item container direction="column">
        <PersonalInfo />
        <AddreddInfo />
        <DeliverInfo />
      </Grid>
      <Grid xs={12} md={4} item>
        <PaymentInfo setPaymentInfo={setPaymentInfo} />
        {qr_code_base64}
        {qr_code_base64 && (
          <img
            style={{ maxWidth: "100%" }}
            src={`data:image/jpeg;base64,${qr_code_base64}`}
          />
        )}
      </Grid>
      <Grid xs={12} md={4}  item container direction={"column"}>
        Detalhes
        <Button
          variant="primary" 
          onClick={() => {
            getIdentificationTypes().then((e) => {
              console.log("eee", e);
            });

            addOrder({
              clienteId: userID,
              endereco: {
                cep: "13400690",
                logradouro: "rua aqui",
                numero: "55",
                complemento: "qq",
                bairro: "qqs",
              },
            });
            // setStep(1)
          }}
        >
          Proximo
        </Button>
      </Grid>
      <Grid xs={2}></Grid>
    </Grid>
  );
};

export default Payment_;
