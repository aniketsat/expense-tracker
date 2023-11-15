import { apiSlice } from "./apiSlice.js";

const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => '/users/profile',
        }),
    }),
    overrideExisting: false,
})

export const { useGetProfileQuery } = userApi;