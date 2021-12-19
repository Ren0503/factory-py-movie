import React, { FunctionComponent, useEffect } from 'react'

import { listTopMovies, MovieTopRatedState } from 'reducers/movie'
import { ReduxState } from 'store'
import { useAppDispatch } from 'hooks'
import { useSelector } from 'react-redux'

const TopMovie: FunctionComponent = () => {
    const dispatch = useAppDispatch()

    const movieTopRated = useSelector(
        (state: ReduxState) => state.movieTopRated as MovieTopRatedState
    )
    const { loading, movies, error } = movieTopRated

    useEffect(() => {
        dispatch(listTopMovies())
    }, [dispatch])

    return (
        <div>
            
        </div>
    )
}

export default TopMovie
