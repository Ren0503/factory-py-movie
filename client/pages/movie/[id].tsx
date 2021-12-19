import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FormEvent, FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { Meta, Loader, Message } from 'components/shared'
import { Rating } from 'components/movie'

import {
    detailMovie,
    createMovieReview,
    createMovieReviewSlice,
    MovieCreateReviewState,
} from 'reducers/movie'
import { UserLoginState } from 'reducers/user'
import { ReduxState } from 'store'
import { useAppDispatch } from 'hooks'
import { imageUrl } from 'utils'

const MovieScreen: FunctionComponent = () => {
    const videoRef = useRef(null);

    const router = useRouter()
    const { id } = router.query
    const dispatch = useAppDispatch()
    const movieDetail = useSelector((state: ReduxState) => state.movieDetail)
    const { loading, movie, error } = movieDetail

    const movieCreateReview = useSelector(
        (state: ReduxState) => state.movieCreateReview as MovieCreateReviewState
    )
    const { success: successMovieReview, error: errorMovieReview } = movieCreateReview

    const userLogin = useSelector((state: ReduxState) => state.userLogin as UserLoginState)
    const { userInfo } = userLogin

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    useEffect(() => {
        if (successMovieReview) {
            dispatch(createMovieReviewSlice.actions.reset())
            alert('Review submitted!')
            setRating(0)
            setComment('')
        }
        if (id) {
            dispatch(detailMovie(id as string))
        }
    }, [id, dispatch, successMovieReview])

    const submitHandler = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            dispatch(createMovieReview({ movieId: id as string, comment, rating }))
        },
        [dispatch, id, comment, rating]
    )

    return (
        <div>
            <Link href="/">
                <a className="btn btn-light my-3">Go Back</a>
            </Link>
            {loading || !movie ? (
                <Loader />
            ) : error ? (
                <Message>{error}</Message>
            ) : (
                <>
                    <Meta title={movie.name} />
                    <div className='movie-info border-b border-gray-800'>
                        <div className='container mx-auto px-4 py-16 flex flex-col md:flex-row'>
                            <div className='flex-one'>
                                <img src={imageUrl(movie.image)} alt={movie.name} className='w-64 md:w-96' />
                            </div>
                            <div className='md:ml-24'>
                                <h2 className='text-4xl font-semibold'>{movie.name}</h2>
                                <div className='flex flex-wrap items-center text-gray-400 text-sm'>
                                    <Rating value={movie.rating} />
                                    <span className="ml-1">{movie.rating}</span>
                                    <span className="mx-2">|</span>
                                    <span>{movie.releasedAt}</span>
                                    <span className="mx-2">|</span>
                                    <span>{movie.genres}</span>

                                    <p>{movie.description}</p>

                                    <button 
                                        className="flex inline-flex items-center bg-orange-500 text-gray-900 rounded font-semibold px-5 py-4 hover:bg-orange-600 transition ease-in-out duration-150"
                                    >
                                        Watch Now
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className='movie-cast border-b border-gray-800'>
                            <div className='container mx-auto px-4 py-16'>
                                <h2 className="text-4xl font-semibold">Cast</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                                    {movie.actors.map((actor) => (
                                        <div className='mt-8'>
                                            <Link href={`/actors/${actor._id}`}>
                                                <img
                                                    src={imageUrl(actor.image)} alt={actor.name}
                                                    className="hover:opacity-75 transition ease-in-out duration-150"
                                                />
                                            </Link>
                                            <div className='mt-2'>
                                                <div className="text-lg mt-2 hover:text-gray:300">{actor.name}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>


                    </div>
                </>
            )}
        </div>
    )
}


export default MovieScreen
