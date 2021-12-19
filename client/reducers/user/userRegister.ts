import {
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit'

import { TokenUser } from 'interfaces'
import { userLoginSlice, logout } from './userLogin'
import { baseUrl } from 'utils'

// Actions
export const registerUser = createAsyncThunk<
    TokenUser,
    { name: string; email: string; password: string }
>('USER_REGISTER', async (args, thunkAPI) => {
    const { name, email, password } = args
    const response = await fetch(`${baseUrl}/api/users/register/`, {
        body: JSON.stringify({ email, password, name }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
    })
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data?.message ?? response.statusText)
    }
    const user = data as TokenUser
    thunkAPI.dispatch(userLoginSlice.actions.loginSuccess(user))
    return user
})

// State
export interface UserRegisterState {
    loading: boolean
    userInfo?: TokenUser
    error?: string
}

const initialUserRegisterState: UserRegisterState = {
    loading: false,
    userInfo: undefined,
    error: undefined,
}

// Slice
export const userRegisterSlice = createSlice({
    name: 'userRegister',
    initialState: initialUserRegisterState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(logout, (state) => {
            state.userInfo = undefined
            state.error = undefined
        })
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true
            state.userInfo = undefined
        })
        builder.addCase(registerUser.fulfilled, (state, { payload }) => {
            state.loading = false
            state.userInfo = payload
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    },
})