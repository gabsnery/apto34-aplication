import { ICardPaymentBrickPayer, ICardPaymentFormData } from "@mercadopago/sdk-react/bricks/cardPayment/type";
import { defaultApi } from "../default";
import { Preference } from "./mercadoPago.interface";

export const mercadoPagoApi = defaultApi.injectEndpoints({
    endpoints: (build) => ({
        addPreference: build.mutation<string, Preference>({
            query: (payload) => {
                return {
                    url: "mercado_pago",
                    method: 'POST',
                    body: payload,
                    formData: true
                };
            },
        }),
        addPayment: build.mutation<any, any >({
            query: (payload) => {
                return {
                    url: `process_payment/${payload.id}`,
                    method: 'POST',
                    body: payload,
                    formData: true
                };
            },
        }),
        getCardToken: build.mutation<any, any >({
            query: (payload) => {
                return {
                    url: "card_token",
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
    useGetCardTokenMutation,
 } = mercadoPagoApi;
