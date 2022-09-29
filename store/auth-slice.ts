import { createSlice } from "@reduxjs/toolkit"

export interface IAuthState{
    isSignedIn: boolean,
    username: string
}

const initialState: IAuthState = {
    isSignedIn: false,
    username: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn: (state, action) => {
            state.isSignedIn = true;
            state.username = action.payload;
        },
        signOut: (state) => {
            state.isSignedIn = false;
            state.username = '';
        }
    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer;