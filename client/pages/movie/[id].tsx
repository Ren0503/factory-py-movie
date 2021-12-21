import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FunctionComponent, SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Meta, Loader, Message } from 'components/shared'
import { Player, Rating } from 'components/movie'

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
import { FaUserCircle } from 'react-icons/fa'

const MovieScreen: FunctionComponent = () => {
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

    const [show, setShow] = useState(false)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [url, setUrl] = useState<string>()

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
        (e: SyntheticEvent<HTMLFormElement>) => {
            e.preventDefault()
            dispatch(createMovieReview({ movieId: id as string, comment, rating }))
        },
        [dispatch, id, comment, rating]
    )

    const showMovie = (movieUrl: string) => {
        setUrl(movieUrl)
        setShow(true)
    }

    const closeMovie = () => {
        setShow(false)
    }

    return (
        <div>
            {loading || !movie ? (
                <Loader />
            ) : error ? (
                <Message>{error}</Message>
            ) : (
                <>
                    <Meta title={movie.name} />

                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <a href="/" className="inline-flex items-center text-sm text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                    <svg className="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                                    Home
                                </a>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                                    <a href="/movies" className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white">Movie</a>
                                </div>
                            </li>
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                                    <span className="ml-1 text-sm font-medium text-gray-400 md:ml-2 dark:text-gray-500">{movie.name}</span>
                                </div>
                            </li>
                        </ol>
                    </nav>

                    <div className='movie-info border-b border-gray-800'>
                        <div className='container mx-auto px-4 py-16 flex flex-col md:flex-row'>
                            <div className='flex-none'>
                                <img src={imageUrl(movie.image)} alt={movie.name} className='w-64 md:w-96' />
                            </div>
                            <div className='md:ml-24'>
                                <h2 className='text-4xl font-semibold'>{movie.name}</h2>
                                <div className='text-gray-400 text-sm'>
                                    <Rating value={movie.rating} />

                                    <span className='mt-5 flex'>Genres: {movie.genres}</span>
                                    <span className='mt-5 flex'>Released At: {movie.releasedAt}</span>
                                    <span className='mt-5 flex'>Views: {movie.views}</span>
                                    <span className='mt-5 flex'>Times: {movie.times}</span>

                                    <div className='mt-12'>
                                        <h4 className='text-white font-semibold'>Description: </h4>
                                        <br />
                                        <p>{movie.description}</p>
                                    </div>
                                    <div className='mt-12'>
                                        {movie.isMovie ? (
                                            <button
                                                onClick={() => showMovie(movie.url)}
                                                className="flex inline-flex items-center bg-orange-500 text-gray-900 rounded font-semibold px-5 py-4 hover:bg-orange-600 transition ease-in-out duration-150"
                                            >
                                                <svg className="w-6 fill-current" viewBox="0 0 24 24">
                                                    <path d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                                                </svg>
                                                <span className="ml-2">Watch Now</span>
                                            </button>
                                        ) : (
                                            <div className='flex inline-flex items-center'>
                                                {movie.episodes.map((episode, index) => (
                                                    <button
                                                        onClick={() => showMovie(movie.episodes[index].url)}
                                                        className='episode ml-2 bg-orange-500 text-gray-900 rounded font-semibold px-5 py-4 hover:bg-orange-600 transition ease-in-out duration-150'
                                                    >
                                                        {episode.number}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='movie-cast border-b border-gray-800'>
                            <div className='container mx-auto px-4 py-16'>
                                <h2 className="text-4xl font-semibold">Cast</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                                    {movie.actors.map((actor) => (
                                        <div className='mt-8'>
                                            <Link href={`/actor/${actor._id}`}>
                                                <img
                                                    src={imageUrl(actor.image)} alt={actor.name}
                                                    className="hover:opacity-75 transition ease-in-out duration-150"
                                                    height="80"
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

                        {show && (
                            <div
                                style={{ backgroundColor: "rgba(0, 0, 0, .5)" }}
                                className="fixed top-0 left-0 w-full h-full flex items-center shadow-lg overflow-y-auto"
                            >
                                <div className="container mx-auto lg:px-32 rounded-lg overflow-y-auto">
                                    <div className="bg-gray-900 rounded">
                                        <div className="flex justify-end pr-4 pt-2">
                                            <button
                                                onClick={closeMovie}
                                                className="text-3xl leading-none hover:text-gray-300"
                                            >
                                                ×
                                            </button>
                                        </div>
                                        <div className="modal-body px-8 py-8">
                                            <div className="responsive-container overflow-hidden relative" style={{ paddingTop: '56.25%' }}>
                                                <Player url={url} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className='movie-review border-b border-gray-800'>
                            <div className='container mx-auto px-4 py-16'>
                                <h2 className="text-4xl font-semibold">Reviews ({movie.numReviews})</h2>
                                {movie.reviews.map((review) => (
                                    <div className='flex mt-5'>
                                        <div>
                                            <FaUserCircle size={20} />
                                        </div>
                                        <div className='ml-5'>
                                            <div className='flex text-gray-600 font-bold'>
                                                <span>{review.name} | </span>
                                                <Rating value={review.rating} />
                                                <p className='ml-1'>| {review.createdAt.substring(0, 10)}</p>
                                            </div>
                                            <p className="mt-1">{review.comment}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {errorMovieReview && <Message>{errorMovieReview}</Message>}
                        {userInfo ? (
                            <form onSubmit={submitHandler}>
                                <div>
                                    <label htmlFor="rating" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select rating</label>
                                    <select
                                        id="rating"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={rating}
                                        onChange={(e) => setRating(parseInt(e.target.value))}
                                    >
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Leave a comment..."
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <button type="submit" className='group mt-4 relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                                        Submit
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <Message>
                                Please <Link href="/login">sign in</Link> to write a review
                            </Message>
                        )}
                    </div>
                </>
            )}
        </div >
    )
}


export default MovieScreen
