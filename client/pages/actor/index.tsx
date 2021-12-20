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
