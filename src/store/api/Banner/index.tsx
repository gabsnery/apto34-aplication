import { IBanner } from "store/types/banner.interface";
import { defaultApi } from "../default";
export const categoryApi = defaultApi.injectEndpoints({
    endpoints: (build) => ({
        getBanners: build.query<IBanner[], void>({
            query: () => `/api/banner`,
            providesTags:['Banner']
        }),
    }),
});
export const { 
     useGetBannersQuery,
     } = categoryApi;
