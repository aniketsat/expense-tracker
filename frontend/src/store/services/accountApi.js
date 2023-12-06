import { apiSlice } from "./apiSlice.js";


const accountApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAccountTypes: builder.query({
            query: () => '/accounts/types',
        }),
        createAccount: builder.mutation({
            query: ({ name, type, balance }) => ({
                url: '/accounts',
                method: 'POST',
                body: { name, type, balance },
            }),
        }),
        getAccounts: builder.query({
            query: (arg) => {
                const { type } = arg || {};
                return {
                    url: '/accounts',
                    params: { type },
                };
            }
        }),
        getAccountById: builder.query({
            query: (accountId) => `/accounts/${accountId}`,
        }),
        updateAccount: builder.mutation({
            query: ({ accountId, name, type, balance }) => ({
                url: `/accounts/${accountId}`,
                method: 'PUT',
                body: { name, type, balance },
            }),
        }),
        deleteAccount: builder.mutation({
            query: (accountId) => ({
                url: `/accounts/${accountId}`,
                method: 'DELETE',
            }),
        }),
    }),
    overrideExisting: false,
});


export const { useGetAccountTypesQuery, useCreateAccountMutation, useGetAccountsQuery, useGetAccountByIdQuery, useUpdateAccountMutation, useDeleteAccountMutation } = accountApi;