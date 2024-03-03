import { getIdentificationTypes, getIssuers, initMercadoPago } from '@mercadopago/sdk-react';
import { Grid, TextField, useTheme } from "@mui/material";
import PaymentForm from "components/PaymentForm";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useAddOrderMutation } from "store/api/Order";
import { useAddPaymentMutation, useAddPreferenceMutation, useGetCardTokenMutation } from "store/api/payment";
import { RootState } from "store/store";
import { Button } from "ui-layout";
import { useAppDispatch } from "../../store/store";

import { getPaymentMethods } from '@mercadopago/sdk-react/coreMethods';
import { PaymentMethods } from "@mercadopago/sdk-react/coreMethods/getPaymentMethods/types";
import { setSnackbar } from "store/slices/snackbarSlice";

const Payment_: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { t } = useTranslation(["login", "common"]);

  const theme = useTheme();
  const cart = useSelector((st: RootState) => st.cart)
  const [getCardToken, { data: cardToken }] = useGetCardTokenMutation()

  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<{
    name: string,
    surname: string,
    email: string,
    street_name: string,
    street_number: string,
  }>({
    name: 'Gabriela',
    surname: 'NEry',
    email: 'admin@gatostecnologia.com',
    street_name: 'admin@gatostecnologia.com',
    street_number: '33',
  })
  const [paymentId, setPaymentId] = useState<string | undefined>()
  const [preferenceId, setPreferenceId] = useState<string | undefined>()
  const [paymentInfo, setPaymentInfo] = useState<any>()
  const [addPreference, { isSuccess, data }] = useAddPreferenceMutation()
  const [addOrder, { data: orderResponse }] = useAddOrderMutation()
  const [addPayment, { data: payment }] = useAddPaymentMutation()
  const [qr_code_base64, setqQr_code_base64] = useState<string>('')

  useEffect(() => {
    if (process.env.REACT_APP_MERCADOLIVRE_TOKEN)
      initMercadoPago(process.env.REACT_APP_MERCADOLIVRE_TOKEN);

  }, []);
  useEffect(() => {
    if (payment?.pix_qrcode !== '')
      setqQr_code_base64(payment?.pix_qrcode)
    console.log("🚀 ~ useEffect ~ payment:", payment)
  }, [payment]);
  useEffect(() => {
    if (cardToken) {
      if (paymentInfo) {
        getPaymentMethods({
          bin: paymentInfo.CREDIT_CARD_NUMBER.replaceAll(' ', ''),
        }).then(value => {
          const methods: PaymentMethods = value as PaymentMethods

          methods && getIssuers({
            paymentMethodId: methods.results[0].id,
            bin: paymentInfo.CREDIT_CARD_NUMBER.replaceAll(' ', ''),
          }).then(issuer => {
            issuer && addPayment({
              installments: paymentInfo.installments, //parcelas
              payer: { email: "admin@gatostecnologia.com", identification: { type: "CPF", number: "12345678909" } },
              payment_method_id: methods.results[0].id,
              issuer_id: issuer[0].id,
              token: cardToken.id,
              transaction_amount: cart.total,
            })
          }).catch(e => {
            dispatch(
              setSnackbar({
                type: 'error',
                message: e,
                duration: 4000
              })
            )
          })
        }).catch(e => {
          dispatch(
            setSnackbar({
              type: 'error',
              message: JSON.stringify(e),
              duration: 4000
            })
          )
        })
      }
    }
  }, [cardToken]);
  const steps = [0, 1, 2]
  return (
    <Grid container sx={{ border: '2px dotted red' }} columns={16}>
      <Grid xs={2} />
      <Grid xs={4} item container columns={16}>
        <TextField
          label={t("Nome")}
          onChange={(ev) => setFormData({ ...formData, name: ev.target.value })}
          value={formData.name || ''}
          required
          fullWidth
        />
        <TextField
          label={t("surname")}
          onChange={(ev) => setFormData({ ...formData, surname: ev.target.value })}
          value={formData.surname || ''}
          required
          fullWidth
        />
        <TextField
          label={t("email")}
          onChange={(ev) => setFormData({ ...formData, email: ev.target.value })}
          value={formData.email || ''}
          required
          fullWidth
        />
        <TextField
          label={t("street_name")}
          onChange={(ev) => setFormData({ ...formData, street_name: ev.target.value })}
          value={formData.street_name || ''}
          required
          fullWidth
        />
        <TextField
          label={t("street_number")}
          onChange={(ev) => setFormData({ ...formData, street_number: ev.target.value })}
          value={formData.street_number || ''}
          required
          fullWidth
        />
      </Grid>
      <Grid xs={4} item >
        <PaymentForm setPaymentInfo={setPaymentInfo} />
        <img src={`data:image/jpeg;base64,${qr_code_base64}`} />
      </Grid>
      <Grid xs={4} item container direction={'column'}>
        Detalhes
        <Button color="primary" variant="outlined" onClick={() => {
          getIdentificationTypes().then(e => {
            console.log('eee', e)
          })
          if (
            paymentInfo.hasOwnProperty('CREDIT_CARD_NUMBER') &&
            paymentInfo.hasOwnProperty('cardExpirationMonth') &&
            paymentInfo.hasOwnProperty('cardExpirationYear') &&
            paymentInfo.hasOwnProperty('CARDHOLDER_NAME') &&
            paymentInfo.hasOwnProperty('identity')
          )
            getCardToken({
              card_number: paymentInfo.CREDIT_CARD_NUMBER.replaceAll(' ', ''),
              security_code: paymentInfo.securityCode,
              card_expiration_month: paymentInfo.cardExpirationMonth,
              card_expiration_year: paymentInfo.cardExpirationYear,
              card_holder_name: paymentInfo.CARDHOLDER_NAME,
              identification_type: 'CPF',
              identification_number: paymentInfo.identity,
            })
          else {
            addPayment(paymentInfo)
          }
          addPreference({
            payer: {
              name: formData.name,
              surname: formData.surname,
              email: formData.email,
              address: {
                street_name: formData.street_name || '',
                street_number: +formData.street_number,
                zip_code: "5700"
              }
            },
            items: cart.items.map((item: any) => ({
              id: item.product.id.toString(),
              title: item.product.nome,
              currency_id: 'BRL',
              description: item.product.nome,
              category_id: item.product.produtoSubcategoria[0] ? item.product.produtoSubcategoria[0].id.toString() : undefined,
              quantity: +item.quantity,
              unit_price: +(item.product.valor_produto),
            })),

          })
          addOrder({
            endereco: {
              cep: '13400690',
              logradouro: 'rua aqui',
              numero: '55',
              complemento: 'qq',
              bairro: 'qqs',
            }
          })
          // setStep(1)
        }}>Proximo</Button>
      </Grid>
      <Grid xs={2} item >
      </Grid>
    </Grid>
  );
};

export default Payment_;

