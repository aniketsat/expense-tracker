import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {  setAccessToken, setRefreshToken, logout } from "../features/userSlice.js";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().user.accessToken;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithRefresh = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 403) {
        // send a post request to /users/refresh-token using the refresh token as the body
        const refreshResult = await baseQuery(
            {
                url: '/users/refresh-token',
                method: 'POST',
                body: {
                    refreshToken: api.getState().user.refreshToken,
                },
            },
            api,
            extraOptions
        );
        console.log(refreshResult);
        if (refreshResult?.data) {
            const { accessToken, refreshToken } = refreshResult.data.data;
            api.dispatch(setAccessToken(accessToken));
            api.dispatch(setRefreshToken(refreshToken));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }
    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithRefresh,
    endpoints: build => ({})
});

