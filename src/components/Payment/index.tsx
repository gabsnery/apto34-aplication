import { Container, Grid, List, ListItem, ListItemText, TextField, useTheme } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import Loading from "../Loading";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { Text, Button } from "ui-layout";
import { useAppDispatch } from "../../store/store";
import { clearCart } from "store/slices/cartSlice";
import { useTranslation } from "react-i18next";
import { CardPayment, Payment, StatusScreen, initMercadoPago } from '@mercadopago/sdk-react';
import { useAddPreferenceMutation, useAddPaymentMutation } from "store/api/payment";


const Payment_: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { t } = useTranslation(["login", "common"]);

  const theme = useTheme();
  const cart = useSelector((st: RootState) => st.cart)
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<any>({})
  const [paymentId, setPaymentId] = useState<string | undefined>()
  const [preferenceId, setPreferenceId] = useState<string | undefined>()
  const [step, setStep] = useState<number>(0)
  const [addPreference, { isSuccess, data }] = useAddPreferenceMutation()
  const [addPayment, { data: payment }] = useAddPaymentMutation()
  useEffect(() => {
    initMercadoPago('TEST-1f7f93c1-a427-458a-ac53-fab1def371a6');

  }, []);
  const steps = [0, 1, 2]
  return (
    <Grid container sx={{ border: '2px dotted red' }} columnSpacing={2} rowSpacing={2}>
      {step === 0 && <Grid xs={6} item container columnSpacing={2} rowSpacing={2}>
        <Grid item xs={12}>
          <TextField
            label={t("Nome")}
            onChange={(ev) => setFormData({ ...formData, name: ev.target.value })}
            value={formData.name || ''}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={t("surname")}
            onChange={(ev) => setFormData({ ...formData, surname: ev.target.value })}
            value={formData.surname || ''}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label={t("email")}
            onChange={(ev) => setFormData({ ...formData, email: ev.target.value })}
            value={formData.email || ''}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label={t("street_name")}
            onChange={(ev) => setFormData({ ...formData, street_name: ev.target.value })}
            value={formData.street_name || ''}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={t("street_number")}
            onChange={(ev) => setFormData({ ...formData, street_number: ev.target.value })}
            value={formData.street_number || ''}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button color="primary" disabled={!!data} variant="outlined" onClick={() => {
            console.log("🚀 ~ file: index.tsx:82 ~ <Buttoncolor ~ cart:", cart)
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
            setStep(1)
          }}>Proximo</Button></Grid>
      </Grid>}

      {step === 1 &&
        <Grid xs={6} item container>
          {data && <Payment
            key={2}
            initialization={{
              amount: cart.total,
              preferenceId: data
            }}
            onError={(error) => {
              // callback chamado para todos os casos de erro do Brick
              console.error(error);
            }}
            onReady={() => {
              console.log('ready')
            }}
            onSubmit={async ({ selectedPaymentMethod, formData: formData_ }) => {
              console.log("🚀 ~ file: index.tsx:121 ~ onSubmit={ ~ formData_:", formData_)
              addPayment(formData_)
              setStep(2)

            }}
            customization={{
              paymentMethods: {
                creditCard: ['visa', 'master'],
                bankTransfer: "all",
              },
            }}
          />}
        </Grid>}
      {step === 2 && <Grid xs={6} item container>
        {payment && <StatusScreen
          initialization={{
            paymentId: (payment.id || '')
          }}
          onError={(error) => {
            // callback chamado para todos os casos de erro do Brick
            console.error(error);
          }}
          onReady={() => {
            console.log('ready')
          }}
          customization={{
            visual: {
              hideStatusDetails: true,
              hideTransactionDate: true,
              style: {
                theme: 'default', // 'default' | 'dark' | 'bootstrap' | 'flat'
              }
            },
          }
          }
        />}
      </Grid>}
{/* 
      <Payment
        initialization={initialization}
        customization={customization}
        onSubmit={onSubmit}
        onReady={onReady}
        onError={onError}
      /> */}

    </Grid>
  );
};

export default Payment_;

