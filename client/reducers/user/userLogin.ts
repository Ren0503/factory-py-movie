import {
    CaseReducer,
    createAction,
    createAsyncThunk,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit'

import { TokenUser } from 'interfaces'
import { baseUrl } from 'utils'

// Actions
export const loginUser = createAsyncThunk<TokenUser, { email: string; password: string }>(
    'USER_LOGIN',
    async (args) => {
        const { email, password } = args
        const response = await fetch(`${baseUrl}/api/users/login/`, {
            body: JSON.stringify({ 'username': email, 'password': password }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
        })
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data?.message ?? response.statusText)
        }
        return data as TokenUser
    }
)

export const logout = createAction<void>('LOGOUT')

// State
export interface UserLoginState {
    loading: boolean
    userInfo?: TokenUser
    error?: string
}

const initialUserLoginState: UserLoginState = {
    loading: false,
    userInfo: undefined,
    error: undefined,
}

const userLoginSuccess: CaseReducer<UserLoginState, PayloadAction<TokenUser>> = (
    state,
    action
) => {
    state.loading = false
    state.userInfo = action.payload
}

const userLogoutSuccess: CaseReducer<UserLoginState, PayloadAction<void>> = (state) => {
    state.userInfo = undefined
    state.error = undefined
}

// Slice
export const userLoginSlice = createSlice({
    name: 'userLogin',
    initialState: initialUserLoginState,
    reducers: {
        loginSuccess: userLoginSuccess,
    },
    extraReducers: (builder) => {
        builder.addCase(logout, userLogoutSuccess)
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true
            state.userInfo = undefined
        })
        builder.addCase(loginUser.fulfilled, userLoginSuccess)
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    },
})
