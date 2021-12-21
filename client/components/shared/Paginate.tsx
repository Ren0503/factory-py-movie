import Link from 'next/link'
import React, { FunctionComponent } from 'react'

interface PaginateProps {
    pages: number
    page: number
    keyword: string
}

const Paginate: FunctionComponent<PaginateProps> = ({ pages, page, keyword }) => {
    return pages > 1 ? (
        <div className="flex flex-col items-center my-12">
            <div className="flex text-gray-700">
                <div className="h-12 w-12 mr-1 flex justify-center items-center rounded-full cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left w-6 h-6">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </div>
                <div className="flex h-12 font-medium rounded-full">
                    {[...Array(pages).keys()].map((x) => {
                        const link = keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`
                        return (
                            <Link href={link} key={x + 1}>
                                <div className={`w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in rounded-full text-white ${x + 1 === page && "bg-orange-600"}`}>{x + 1}</div>
                            </Link>
                        )
                    })}
                </div>
                <div className="h-12 w-12 ml-1 flex justify-center items-center rounded-full cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right w-6 h-6">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </div>
            </div>
        </div>
    ) : null
}

export default Paginate
