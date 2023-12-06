import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    accounts: [],
}

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setAccounts(state, action) {
            state.accounts = action.payload
        },
        addAccount(state, action) {
            state.accounts.push(action.payload)
        },
        updateAccount(state, action) {
            const accountIndex = state.accounts.findIndex(account => account._id === action.payload._id)
            state.accounts[accountIndex] = action.payload
        },
        deleteAccount(state, action) {
            state.accounts = state.accounts.filter(account => account._id !== action.payload._id)
        },
    },
});


export const {setAccounts, addAccount, updateAccount, deleteAccount} = accountSlice.actions;

export default accountSlice.reducer;