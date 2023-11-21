import { apiSlice } from "./apiSlice.js";

const otpApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        sendOtp: builder.mutation({
            query: (body) => ({
                url: '/otp/send-otp',
                method: 'POST',
                body,
            }),
        }),
        verifyOtp: builder.mutation({
            query: (body) => ({
                url: '/otp/verify-otp',
                method: 'POST',
                body,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useSendOtpMutation, useVerifyOtpMutation } = otpApi;