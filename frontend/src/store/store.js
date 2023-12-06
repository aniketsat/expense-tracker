import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './services/apiSlice'
import userReducer from './features/userSlice'
import accountReducer from './features/accountSlice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        user: userReducer,
        account: accountReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})