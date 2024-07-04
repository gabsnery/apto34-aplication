import { ICardPaymentBrickPayer, ICardPaymentFormData } from "@mercadopago/sdk-react/bricks/cardPayment/type";
import { defaultApi } from "../default";

export const mercadoPagoApi = defaultApi.injectEndpoints({
    endpoints: (build) => ({
        addOrder: build.mutation<any, any>({
            query: (payload) => {
                return {
                    url: "api/order",
                    method: 'POST',
                    body: payload,
                    formData: true
                };
            },
        }),
 

    }),
});
export const {
    useAddOrderMutation,
 } = mercadoPagoApi;
