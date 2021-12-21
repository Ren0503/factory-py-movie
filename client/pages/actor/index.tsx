import React, { FunctionComponent, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Meta, Loader, Message } from 'components/shared'

import {
    listActors,
} from 'reducers/actor'
import { ReduxState } from 'store'
import { useAppDispatch } from 'hooks'
import Link from 'next/link'
import { imageUrl } from 'utils'

const ActorListScreen: FunctionComponent = () => {
    const dispatch = useAppDispatch()
    const actorList = useSelector((state: ReduxState) => state.actorList)
    const { loading, actors, error } = actorList

    useEffect(() => {
        dispatch(listActors())
    }, [dispatch])

    return (
        <div className='container mx-auto px-4 py-16'>

            <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                        <a href="/" className="inline-flex items-center text-sm text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                            <svg className="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                            Home
                        </a>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                            <span className="ml-1 text-sm font-medium text-gray-400 md:ml-2 dark:text-gray-500">Actors</span>
                        </div>
                    </li>
                </ol>
            </nav>

            <div className='popular-movies'>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message />
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {actors.map((actor) => (
                            <div className='actors mt-8'>
                                <Link href={`/actor/${actor._id}`}>
                                    <img
                                        src={imageUrl(actor.image)} alt={actor.name}
                                        className='hover:opacity-75 transition ease-in-out duration-150'
                                        height="80"
                                    />
                                </Link>
                                <div className="mt-2">
                                    <p className="text-lg hover:text-gray-300">{actor.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ActorListScreen
