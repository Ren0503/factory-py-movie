import {
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit'

import { CreateReviewInput } from 'interfaces'
import { baseUrl } from 'utils'

import { ReduxState } from 'store'
import { UserLoginState } from 'reducers/user'

export const createMovieReview = createAsyncThunk<
    void,
    CreateReviewInput & { movieId: string }
>(
    'MOVIE_CREATE_REVIEW',
    async (payload: CreateReviewInput & { movieId: string }, thunkAPI) => {
        const state: ReduxState = thunkAPI.getState()
        const userLogin: UserLoginState = state.userLogin
        const token = userLogin.userInfo?.token
        const { movieId } = payload

        if (!token) {
            throw new Error('no user login token')
        }
        const response = await fetch(`${baseUrl}/api/movies/${movieId}/reviews/`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data?.message ?? response.statusText)
        }
    }
)

export interface MovieCreateReviewState {
    loading: boolean
    success?: boolean
    error?: string
}

const initialMovieCreateReviewState: MovieCreateReviewState = { loading: false }


export const createMovieReviewSlice = createSlice({
    name: 'movieCreateReview',
    initialState: initialMovieCreateReviewState,
    reducers: {
        reset: (state) => {
            state.error = undefined
            state.loading = false
            state.success = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createMovieReview.pending, (state) => {
            state.loading = true
            state.error = undefined
        })
        builder.addCase(createMovieReview.fulfilled, (state) => {
            state.loading = false
            state.success = true
        })
        builder.addCase(createMovieReview.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    },
})