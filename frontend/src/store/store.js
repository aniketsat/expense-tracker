import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './services/apiSlice'
import userReducer from './features/userSlice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})