import {
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit'

import { TokenUser, User } from 'interfaces'
import { ReduxState } from 'store'
import { logout } from './userLogin'
import { updateUserProfile } from './userUpdate'
import { baseUrl } from 'utils'

export const getUserDetails = createAsyncThunk<TokenUser, string>(
    'USER_DETAILS',
    async (args, thunkAPI) => {
        const state: ReduxState = thunkAPI.getState() as ReduxState
        console.log('got root login state', state.userLogin)

        if (!state.userLogin.userInfo) {
            throw new Error('getUserDetails without logged in user')
        }
        const token = state.userLogin.userInfo.token

        const response = await fetch(`${baseUrl}/api/users/profile/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data?.message ?? response.statusText)
        }
        const user = data as TokenUser
        return user
    }
)

export interface UserDetailsState {
    loading: boolean
    user?: TokenUser
    error?: string
}

const initialUserDetailsState: UserDetailsState = {
    loading: false,
    user: undefined,
    error: undefined,
}

export const userDetailsSlice = createSlice({
    name: 'userDetails',
    initialState: initialUserDetailsState,
    reducers: {
        reset: (state) => {
            state.error = undefined
            state.loading = false
            state.user = undefined
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logout, (state) => {
            state.user = undefined
            state.error = undefined
        })
        builder.addCase(getUserDetails.pending, (state) => {
            state.loading = true
            state.user = undefined
            state.error = undefined
        })
        builder.addCase(getUserDetails.fulfilled, (state, { payload }) => {
            state.loading = false
            state.user = payload
        })
        builder.addCase(updateUserProfile.fulfilled, (state, { payload }) => {
            state.loading = false
            state.user = payload
        })
        builder.addCase(getUserDetails.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    },
})
