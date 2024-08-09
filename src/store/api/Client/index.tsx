import { IClient } from "store/types/auth.interfaces";
import { defaultApi } from "../default";
export const clientAPI = defaultApi.injectEndpoints({
  endpoints: (build) => ({
    addClient: build.mutation<Partial<IClient>, Partial<IClient>>({
      query: (payload) => {
        return {
          url: `api/client`,
          method: "POST",
          body: payload,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        };
      },
      invalidatesTags: ["Client"],
    }),
    getClient: build.query<IClient, void>({
      query: () => `/api/client`,
    }),
  }),
});
export const { useAddClientMutation,
  useGetClientQuery
 } = clientAPI;
