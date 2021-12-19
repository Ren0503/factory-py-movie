import React, { FunctionComponent, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Meta, Loader, Message } from 'components/shared'

import {
    detailActor,
} from 'reducers/actor'
import { ReduxState } from 'store'
import { useAppDispatch } from 'hooks'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { imageUrl } from 'utils'

const ActorScreen: FunctionComponent = () => {
    const router = useRouter()
    const { id } = router.query
    const dispatch = useAppDispatch()
    const actorDetail = useSelector((state: ReduxState) => state.actorDetail)
    const { loading, actor, error } = actorDetail

    useEffect(() => {
        if (id) {
            dispatch(detailActor(id as string))
        }
    }, [id, dispatch])

    return (
        <>
            <Link href="/">
                <a className="btn btn-light my-3">Go Back</a>
            </Link>
            {loading || !actor ? (
                <Loader />
            ) : error ? (
                <Message>{error}</Message>
            ) : (
                <>
                    <div className="movie-info border-b border-gray-800">
                        <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row">
                            <div className="">
                                <img src={imageUrl(actor.image)} alt="profile_image" className="w-76" />
                            </div>
                            <div className="md:ml-24">
                                <h2 className="text-4xl font-semibold">{actor.name}</h2>
                                <div className="flex flex-wrap items-center text-gray-400 text-sm">
                                    <svg className="fill-current text-gray-400 hover:text-white w-4" viewBox="0 0 448 512">
                                        <path d="M448 384c-28.02 0-31.26-32-74.5-32-43.43 0-46.825 32-74.75 32-27.695 0-31.454-32-74.75-32-42.842 0-47.218 32-74.5 32-28.148 0-31.202-32-74.75-32-43.547 0-46.653 32-74.75 32v-80c0-26.5 21.5-48 48-48h16V112h64v144h64V112h64v144h64V112h64v144h16c26.5 0 48 21.5 48 48v80zm0 128H0v-96c43.356 0 46.767-32 74.75-32 27.951 0 31.253 32 74.75 32 42.843 0 47.217-32 74.5-32 28.148 0 31.201 32 74.75 32 43.357 0 46.767-32 74.75-32 27.488 0 31.252 32 74.5 32v96zM96 96c-17.75 0-32-14.25-32-32 0-31 32-23 32-64 12 0 32 29.5 32 56s-14.25 40-32 40zm128 0c-17.75 0-32-14.25-32-32 0-31 32-23 32-64 12 0 32 29.5 32 56s-14.25 40-32 40zm128 0c-17.75 0-32-14.25-32-32 0-31 32-23 32-64 12 0 32 29.5 32 56s-14.25 40-32 40z" />
                                    </svg>
                                    <span className="ml-1">Birth: {actor.birth}</span>
                                    <span className="ml-1">Sex: </span>
                                    {actor.sex ? <p>Male</p> : <p>Female</p>}
                                </div>
                                <p className="text-gray-300 mt-8">{actor.description}</p>
                                <h4 className="font-semibold mt-12">Known For</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                                    {actor.movies.map((movie) => (
                                        <div className='mt-4'>
                                            <a href={`movie/${movie._id}`}>
                                                <img src={imageUrl(movie.image)} alt="Poster" className="hover:opacity-75 transition ease-in-out duration-150" />
                                            </a>
                                            <h4 className="text-sm leading-normal block text-gra-400 hover:text-white mt-1">
                                                {movie.name}
                                            </h4>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </>
            )}
        </>
    )
}

export default ActorScreen
