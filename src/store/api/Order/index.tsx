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
        getOrders: build.query<any[], void>({
            query: (filter) => `/api/order`,
        }),
        getOrder: build.query<any[], number>({
            query: (item) => `/api/order/${item}`,
        }),
 

    }),
});
export const {
    useAddOrderMutation,
    useGetOrdersQuery,
    useGetOrderQuery,
 } = mercadoPagoApi;
