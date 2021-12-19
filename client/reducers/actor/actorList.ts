import {
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit'

import { Actor } from 'interfaces'
import { baseUrl } from 'utils'

export const listActors = createAsyncThunk<Actor[], void>('ACTOR_LIST', async () => {
    const response = await fetch(`${baseUrl}/api/actors/`)
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data?.message ?? response.statusText)
    }
    return data as Actor[]
})

export type ActorListState = {
    loading: boolean
    actors: Actor[]
    error?: string
}

const initialActorListState: ActorListState = {
    loading: false,
    actors: [],
}

export const actorListSlice = createSlice({
    name: 'actorTop',
    initialState: initialActorListState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(listActors.pending, (state) => {
            state.loading = true
            state.actors = []
            state.error = undefined
        })
        builder.addCase(listActors.fulfilled, (state, { payload }) => {
            state.loading = false
            state.actors = payload
        })
        builder.addCase(listActors.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    },
})