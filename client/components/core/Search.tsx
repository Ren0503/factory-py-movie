import { useRouter } from 'next/router'
import React, { FormEvent, FunctionComponent, useCallback, useState } from 'react'

const Search: FunctionComponent = () => {
    const [keyword, setKeyword] = useState('')
    const router = useRouter()

    const submitHandler = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            if (keyword.trim()) {
                router.push(`/search/${keyword}`)
            } else {
                router.push(`/`)
            }
        },
        [router, keyword]
    )

    return (
        <div>
            <form onSubmit={submitHandler} className='relative mt-3 md:mt-0'>
                <input
                    type="text"
                    onChange={(e) => setKeyword(e.currentTarget.value)}
                    placeholder="Search Movies..."
                    className="bg-gray-800 rounded-full w-64 px-4 pl-8 py-1 focus:outline-none focus:shadow-outline text-sm"
                />
                <div className="absolute top-0">
                    <button type="submit">
                        <svg className="fill-current w-4 text-gray-500 mt-2 ml-2" viewBox="0 0 24 24">
                            <path className="heroicon-ui"
                                d="M16.32 14.9l5.39 5.4a1 1 0 01-1.42 1.4l-5.38-5.38a8 8 0 111.41-1.41zM10 16a6 6 0 100-12 6 6 0 000 12z"></path>
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Search
