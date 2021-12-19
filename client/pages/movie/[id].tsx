import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FormEvent, FunctionComponent, useCallback, useEffect, useState } from 'react'
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

const MovieScreen: FunctionComponent = () => {
    const router = useRouter()
    const { id } = router.query
    const dispatch = useAppDispatch()
    const movieDetail = useSelector((state: ReduxState) => state.movieDetail)
    const { loading, movie, error } = movieDetail

    const movieReviewCreate = useSelector(
        (state: ReduxState) => state.createMovieReview as MovieCreateReviewState
    )
    const { success: successMovieReview, error: errorMovieReview } = movieReviewCreate

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
                </>
            )}
        </div>
    )
}


export default MovieScreen
