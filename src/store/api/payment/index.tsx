import { ICardPaymentBrickPayer, ICardPaymentFormData } from "@mercadopago/sdk-react/bricks/cardPayment/type";
import { defaultApi } from "../default";
import { Preference } from "./mercadoPago.interface";

export const mercadoPagoApi = defaultApi.injectEndpoints({
    endpoints: (build) => ({
        addPreference: build.mutation<string, Preference>({
            query: (payload) => {
                console.log("🚀 ~ file: index.tsx:9 ~ payload:", payload)
                return {
                    url: "mercado_pago",
                    method: 'POST',
                    body: payload,
                    formData: true
                };
            },
        }),
        addPayment: build.mutation<any, ICardPaymentFormData<ICardPaymentBrickPayer> >({
            query: (payload) => {
                return {
                    url: "process_payment",
                    method: 'POST',
                    body: payload,
                    formData: true
                };
            },
        }),

    }),
});
export const {
    useAddPreferenceMutation,
    useAddPaymentMutation,
 } = mercadoPagoApi;
