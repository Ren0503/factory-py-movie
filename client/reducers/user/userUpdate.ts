import {
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit'

import { TokenUser } from 'interfaces'
import { ReduxState } from 'store'
import { logout, userLoginSlice } from './userLogin'
import { baseUrl } from 'utils'

export const updateUserProfile = createAsyncThunk<
    TokenUser,
    { name: string; email: string; password: string }
>('USER_PROFILE_UPDATE', async (user, thunkAPI) => {
    const { name, email, password } = user
    const state: ReduxState = thunkAPI.getState() as ReduxState
    const token = state.userLogin.userInfo.token

    const response = await fetch(`${baseUrl}/api/users/profile/update/`, {
        body: JSON.stringify({ email, password, name }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        method: 'PUT',
    })
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data?.message ?? response.statusText)
    }
    const updatedUser = data as TokenUser
    thunkAPI.dispatch(userLoginSlice.actions.loginSuccess({ ...updatedUser, token }))
    return updatedUser
})

export interface UserUpdateProfileState {
    loading: boolean
    userInfo?: TokenUser
    error?: string
    success: boolean
}

const initialUserUpdateProfileState: UserUpdateProfileState = {
    loading: false,
    userInfo: undefined,
    error: undefined,
    success: false,
}

export const userUpdateProfileSlice = createSlice({
    name: 'userUpdateProfile',
    initialState: initialUserUpdateProfileState,
    reducers: {
        reset: (state) => {
            state.userInfo = undefined
            state.error = undefined
            state.success = false
            state.loading = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logout, (state) => {
            state.userInfo = undefined
            state.error = undefined
            state.success = false
        })
        builder.addCase(updateUserProfile.pending, (state) => {
            state.loading = true
            state.userInfo = undefined
            state.success = false
        })
        builder.addCase(updateUserProfile.fulfilled, (state, { payload }) => {
            state.loading = false
            state.userInfo = payload
            state.success = true
        })
        builder.addCase(updateUserProfile.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
            state.success = false
        })
    },
})