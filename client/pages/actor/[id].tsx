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
            {loading || !actor ? (
                <Loader />
            ) : error ? (
                <Message>{error}</Message>
            ) : (
                <>
                    <Meta title={actor.name} />

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
                                    <a href="/actors" className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white">Actors</a>
                                </div>
                            </li>
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                                    <span className="ml-1 text-sm font-medium text-gray-400 md:ml-2 dark:text-gray-500">{actor.name}</span>
                                </div>
                            </li>
                        </ol>
                    </nav>

                    <div className="movie-info border-b border-gray-800">
                        <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row">
                            <div className="flex-none">
                                <img src={imageUrl(actor.image)} alt="profile_image" className="w-64 md:w-72" />
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
                                            <Link href={`/movie/${movie._id}`}>
                                                <img 
                                                    src={imageUrl(movie.image)} alt="Poster" 
                                                    className="hover:opacity-75 transition ease-in-out duration-150"
                                                    height="80"
                                                />
                                            </Link>
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
