export interface Actor {
    _id: string
    user: string
    name: string
    birth: string
    sex: boolean
    image: string
    description: string
    createdAt: string
}

export interface Movie {
    _id: string
    user: string
    name: string
    genres: string
    image: string
    description: string
    actors: Array<Actor>
    releasedAt: string
    times: number
    url: string
    views: number
	rating: number
	numReviews: number
	reviews: Array<Review>
    createdAt: string
}

export interface MovieDetail extends Movie {
    reviews: Array<Review>
}

export interface ActorDetail extends Actor {
    movies: Array<Movie>
}

export interface Review {
	_id: string
	user: string
	name: string
	rating: number
	comment: string
	createdAt: string
}

export interface MovieList {
    movies: Movie[]
    pages: number
    page: number
}

export interface CreateReviewInput {
	rating: number
	comment: string
}