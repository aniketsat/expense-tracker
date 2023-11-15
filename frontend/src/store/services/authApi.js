import { apiSlice } from "./apiSlice.js";

const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/users/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: '/users/register',
                method: 'POST',
                body: credentials,
            }),
        }),
        refreshToken: builder.mutation({
            query: (refreshToken) => ({
                url: '/users/refresh-token',
                method: 'POST',
                body: { refreshToken },
            }),
        }),
    }),
    overrideExisting: false,
})

export const { useLoginMutation, useRegisterMutation } = authApi;