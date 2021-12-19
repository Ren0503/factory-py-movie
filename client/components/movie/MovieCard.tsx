import React, { FunctionComponent } from 'react'

import { Movie as MovieType } from 'interfaces'
import { imageUrl } from 'utils'

interface MovieProps {
    movie: MovieType
}

const MovieCard: FunctionComponent<MovieProps> = ({ movie }) => {
    return (
        <div>
            <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <img
                    src={imageUrl(movie.image)}
                    alt={movie.name}
                    className="w-full h-full object-center object-cover group-hover:opacity-75"
                />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{movie.name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">{movie.times}</p>
        </div>
    )
}

export default MovieCard
