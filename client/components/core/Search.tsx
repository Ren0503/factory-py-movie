import { useRouter } from 'next/router'
import React, { FormEvent, FunctionComponent, useCallback, useState } from 'react'
import { FaSearch } from 'react-icons/fa'

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
                        <FaSearch size={20} />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Search
