import {
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit'

import { Actor } from 'interfaces'
import { baseUrl } from 'utils'

export const detailActor = createAsyncThunk<Actor, string>(
    'ACTOR_DETAIL',
    async (actorId) => {
        const response = await fetch(`${baseUrl}/api/actors/${actorId}`)
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data?.message ?? response.statusText)
        }
        return data as Actor
    }
)

export type ActorDetailsState = {
    loading: boolean
    actor?: Actor
    error?: string
}

const initialActorDetailState: ActorDetailsState = {
    loading: false,
}

export const actorDetailSlice = createSlice({
    name: 'actorDetail',
    initialState: initialActorDetailState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(detailActor.pending, (state) => {
            state.loading = true
        })
        builder.addCase(detailActor.fulfilled, (state, { payload }) => {
            state.loading = false
            state.actor = payload
        })
        builder.addCase(detailActor.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    },
})