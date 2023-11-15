import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload
        },
        setAccessToken(state, action) {
            localStorage.setItem('accessToken', action.payload)
            state.accessToken = action.payload
        },
        setRefreshToken(state, action) {
            localStorage.setItem('refreshToken', action.payload)
            state.refreshToken = action.payload
        },
        logout(state) {
            localStorage.clear()
            state.user = null
            state.accessToken = null
            state.refreshToken = null
        },
    },
});

export const { setUser, setAccessToken, setRefreshToken, logout } = userSlice.actions;

export default userSlice.reducer;