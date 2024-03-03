import { Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store/store";
import { Button, Select } from "ui-layout";

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { createCardToken, getIdentificationTypes, getIssuers, getPaymentMethods } from '@mercadopago/sdk-react/coreMethods';
import { useAddPaymentMutation, useGetCardTokenMutation } from "store/api/payment";
import { Payment } from "@mercadopago/sdk-react";
import { setSnackbar } from "store/slices/snackbarSlice";
import { PaymentMethods } from "@mercadopago/sdk-react/coreMethods/getPaymentMethods/types";
import { PayerCost } from "@mercadopago/sdk-react/coreMethods/util/types";
interface Props {
  setPaymentInfo: (value: any) => void
}
const PaymentForm: React.FC<React.PropsWithChildren<Props>> = ({ setPaymentInfo }) => {
  const { t } = useTranslation(["login", "common"]);
  const dispatch = useAppDispatch();
  const [installments, setInstallments] = useState<PayerCost[]>([])
  const cart = useSelector((st: RootState) => st.cart)
  const [formData, setFormData] = useState<{
    CREDIT_CARD_NUMBER: string,
    CARDHOLDER_NAME: string,
    cardExpirationMonth: string,
    cardExpirationYear: string,
    securityCode: string,
    identity: string,
    installments: number,
  }>({
    CREDIT_CARD_NUMBER: '5031 4332 1540 6351',
    CARDHOLDER_NAME: 'APRO',
    cardExpirationMonth: '11',
    cardExpirationYear: '25',
    securityCode: '123',
    identity: '12345678909',
    installments: 0
  })




  const [type, setType] = useState<undefined | 'CreditCard' | 'PIX' | 'Invoice'>()
  useEffect(() => {
    if (type === 'CreditCard')
      if (formData.CREDIT_CARD_NUMBER.length >= 4)
        getPaymentMethods({
          bin: formData.CREDIT_CARD_NUMBER.replaceAll(' ', ''),
        }).then((value?: PaymentMethods) => {
          setInstallments(value?.results[0].payer_costs || [])
        })
  }, [formData]);
  useEffect(() => {
    if (type == 'Invoice') {
      setPaymentInfo({
        payer: { email: "admin@gatostecnologia.com", first_name: 'Gabriela', last_name: 'Nery', identification: { type: "CPF", number: "36439183800" } },
        payment_method_id: 'bolbradesco',
        transaction_amount: 200,
        date_of_expiration: "2024-03-09T22:20:00.000-04:00",
      })
    } else if (type === 'PIX') {
      setPaymentInfo({
        payer: { email: "admin@gatostecnologia.com", identification: { type: "CPF", number: "12345678909" } },
        payment_method_id: 'pix',
        transaction_amount: 0.1,
      })
    } else {
      setPaymentInfo(formData)
    }
  }, [type]);
  const steps = [0, 1, 2]
  return (
    <Grid container sx={{ border: '2px dotted red' }}>

      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Tipo de pagamento</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          value={type}
          onChange={(event) => {
            setType((event.target as HTMLInputElement).value as 'CreditCard' | 'PIX' | 'Invoice');


          }}
        >
          <FormControlLabel value="CreditCard" control={<Radio />} label="CreditCard" />
          <FormControlLabel value="PIX" control={<Radio />} label="PIX" />
          <FormControlLabel value="Invoice" control={<Radio />} label="Invoice" />
        </RadioGroup>
      </FormControl>
      {type === 'CreditCard' && <>
        <TextField
          label={t("CARDHOLDER_NAME")}
          onChange={(ev) => setFormData({ ...formData, CARDHOLDER_NAME: ev.target.value })}
          value={formData.CARDHOLDER_NAME || ''}
          required
          fullWidth
        />
        <TextField
          label={t("CREDIT_CARD_NUMBER")}
          onChange={(ev) => setFormData({ ...formData, CREDIT_CARD_NUMBER: ev.target.value })}
          value={formData.CREDIT_CARD_NUMBER || ''}
          required
          fullWidth
        />
        <TextField
          label={t("cardExpirationMonth")}
          onChange={(ev) => setFormData({ ...formData, cardExpirationMonth: ev.target.value })}
          value={formData.cardExpirationMonth || ''}
          required
          fullWidth
        />
        <TextField
          label={t("cardExpirationYear")}
          onChange={(ev) => setFormData({ ...formData, cardExpirationYear: ev.target.value })}
          value={formData.cardExpirationYear || ''}
          required
          fullWidth
        />
        <TextField
          label={t("securityCode")}
          onChange={(ev) => setFormData({ ...formData, securityCode: ev.target.value })}
          value={formData.securityCode || ''}
          required
          fullWidth
        />
        <TextField
          label={t("identity")}
          onChange={(ev) => setFormData({ ...formData, identity: ev.target.value })}
          value={formData.identity || ''}
          required
          fullWidth
        />
        {installments.length > 0 && <Select
          name={'categoryId'}
          label="Categoria"
          sx={{ backgroundColor: 'transparent' }}
          fullWidth
          value={formData.installments.toString()}
          onChange={(e) => {
            console.log("🚀 ~ file: index.tsx:20 ~ e:", e)
            setFormData({ ...formData, installments: +(e.target.value as string) })
          }}
          options={installments.filter(i => (cart.total / i.installments >= i.min_allowed_amount))?.map((item) => ({ value: item.installments.toString(), label: item.installments === 0 ? '' : `${item.installments} parcela (${item.installment_rate}%) (${item.installments} * ${(cart.total / item.installments) + ((cart.total / item.installments) * (item.installment_rate / 100))}) (${(cart.total * (((item.installment_rate) / 100) + 1))})` })) || []}
        />}

      </>
      }


    </Grid >
  );
};

export default PaymentForm;

