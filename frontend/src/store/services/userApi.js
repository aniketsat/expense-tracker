import { apiSlice } from "./apiSlice.js";

const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => '/users/profile',
            invalidatesTags: ['User'],
        }),
        updateProfile: builder.mutation({
            query: (body) => ({
                url: '/users/profile',
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['User'],
        }),
        updatePassword: builder.mutation({
            query: (body) => ({
                url: '/users/password',
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['User'],
        }),
    }),
    overrideExisting: false,
})

export const { useGetProfileQuery, useUpdateProfileMutation, useUpdatePasswordMutation } = userApi;