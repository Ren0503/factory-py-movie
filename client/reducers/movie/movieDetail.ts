import {
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit'

import { MovieDetail } from 'interfaces'
import { baseUrl } from 'utils'

export const detailMovie = createAsyncThunk<MovieDetail, string>(
    'MOVIE_DETAIL',
    async (movieId) => {
        const response = await fetch(`${baseUrl}/api/movies/${movieId}/`)
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data?.message ?? response.statusText)
        }
        return data as MovieDetail
    }
)

export type MovieDetailState = {
    loading: boolean
    movie?: MovieDetail
    error?: string
}

const initialMovieDetailState: MovieDetailState = {
    loading: false,
}

export const movieDetailSlice = createSlice({
    name: 'movieDetail',
    initialState: initialMovieDetailState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(detailMovie.pending, (state) => {
            state.loading = true
        })
        builder.addCase(detailMovie.fulfilled, (state, { payload }) => {
            state.loading = false
            state.movie = payload
        })
        builder.addCase(detailMovie.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})