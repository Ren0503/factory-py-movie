import {
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit'

import { Movie, MovieList } from 'interfaces'
import { baseUrl } from 'utils'

export const listMovies = createAsyncThunk<
    MovieList,
    { keyword: string, pageNumber?: number }
>('MOVIE_LIST', async (args) => {
    const { keyword } = args
    const pageNumber = args.pageNumber ?? 1
    const response = await fetch(
        `${baseUrl}/api/movies?keyword=${keyword ?? ''}&page=${pageNumber}`
    )
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data?.message ?? response.statusText)
    }
    return data as MovieList
})

export type MovieListState = {
    loading: boolean
    movies: Movie[]
    error?: string
    page: number
    pages: number
}

const initialMovieListState: MovieListState = {
    loading: false,
    movies: [],
    page: 1,
    pages: 1,
}

export const movieListSlice = createSlice({
    name: 'movieList',
    initialState: initialMovieListState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(listMovies.pending, (state) => {
            state.loading = true
            state.movies = []
            state.page = 1
            state.pages = 1
        })
        builder.addCase(listMovies.fulfilled, (state, { payload }) => {
            state.loading = false
            state.movies = payload.movies
            state.pages = payload.pages
            state.page = payload.page
        })
        builder.addCase(listMovies.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})