import React, { FunctionComponent, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { listMovies, MovieListState } from 'reducers/movie'
import { ReduxState } from 'store'
import { useAppDispatch } from 'hooks'

import { Meta, Loader, Message } from 'components/shared'
import { MovieCard } from 'components/movie'

interface HomeProps {
    keyword?: string
    pageNumber?: number
}

const HomeComponent: FunctionComponent<HomeProps> = ({
    keyword = '',
    pageNumber = 1,
}) => {
    const dispatch = useAppDispatch()
    const movieList = useSelector((state: ReduxState) => state.movieList as MovieListState)
    const { loading, movies, error, page, pages } = movieList

    useEffect(() => {
        dispatch(listMovies({ keyword, pageNumber }))
    }, [dispatch, keyword, pageNumber])
    return (
        <>
            <Meta />
            <h1>Trend Movies</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message>{error}</Message>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {movies.map((movie) => (
                            <div key={movie._id} className="group">
                                <MovieCard movie={movie} />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    )
}

export default HomeComponent