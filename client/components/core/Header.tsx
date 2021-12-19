import React, { FunctionComponent, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { FaUser } from 'react-icons/fa'

import { logout } from 'reducers/user'
import { ReduxState } from 'store'
import { useAppDispatch } from 'hooks'
import Link from 'next/link'

const Header: FunctionComponent = () => {
    const userLogin = useSelector((state: ReduxState) => state.userLogin)
    const { userInfo } = userLogin
    const dispatch = useAppDispatch()
    const logoutHandler = useCallback(() => {
        dispatch(logout())
    }, [dispatch])

    return (
        <nav className="flex items-center justify-between flex-wrap p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <svg className="fill-current h-8 w-8 mr-2" width={54} height={54} viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" /></svg>
                <span className="font-semibold text-xl tracking-tight">MFactory</span>
            </div>
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                </button>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">
                    <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                        Actors
                    </a>
                    <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                        About
                    </a>

                </div>
                <div className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
                    {userInfo ? (
                        <div>
                            <div className="p-10">
                                <div className="dropdown inline-block relative">
                                    <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
                                        <FaUser size={25} />
                                        <span className="mr-1">{userInfo.name}</span>
                                    </button>
                                    <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
                                        <li><a
                                            className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                                            href="/profile"
                                        >
                                            Profile
                                        </a></li>
                                        <li><button className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" onClick={logoutHandler}>Two</button></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <Link href="/login">Login</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav >
    )
}

export default Header
