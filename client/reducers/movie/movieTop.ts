import {
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit'

import { Movie } from 'interfaces'
import { baseUrl } from 'utils'

export const listTopMovies = createAsyncThunk<Movie[], void>('MOVIE_TOP', async () => {
    const response = await fetch(`${baseUrl}/api/movies/top/`)
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data?.message ?? response.statusText)
    }
    return data as Movie[]
})

export type MovieTopRatedState = {
    loading: boolean
    movies: Movie[]
    error?: string
}

const initialMovieTopRatedState: MovieTopRatedState = {
    loading: false,
    movies: [],
}

export const movieTopSlice = createSlice({
    name: 'movieTop',
    initialState: initialMovieTopRatedState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(listTopMovies.pending, (state) => {
            state.loading = true
            state.movies = []
            state.error = undefined
        })
        builder.addCase(listTopMovies.fulfilled, (state, { payload }) => {
            state.loading = false
            state.movies = payload
        })
        builder.addCase(listTopMovies.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    },
})