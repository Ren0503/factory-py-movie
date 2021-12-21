import React, { FunctionComponent, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { listMovies, MovieListState } from 'reducers/movie'
import { ReduxState } from 'store'
import { useAppDispatch } from 'hooks'

import { Meta, Loader, Message, Paginate } from 'components/shared'
import { MovieCard, TopMovie } from 'components/movie'

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
            {!keyword && (
                <TopMovie />
            )}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message>{error}</Message>
            ) : (
                <>
                    <div className="container mx-auto px-4 pt-16">
                        <div className="popular-movies">
                            <h2 className="uppercase tracking-wider text-orange-500 text-lg font-semibold">POPULAR MOVIES</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                                {movies.map((movie) => (
                                    <div key={movie._id} className="group">
                                        <MovieCard movie={movie} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Paginate 
                            pages={pages}
                            page={page}
                            keyword={keyword}
                        />
                    </div>
                </>
            )}
        </>
    )
}

export default HomeComponent