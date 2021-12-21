import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FunctionComponent, SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Loader, Message } from 'components/shared'
import { loginUser } from 'reducers/user'
import { ReduxState } from 'store'
import { useAppDispatch } from 'hooks'

export interface LoginScreenProps {
    redirect?: string
}

const LoginScreen: FunctionComponent<LoginScreenProps> = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const redirect = (router.query.redirect as string) ?? '/'
    const dispatch = useAppDispatch()

    const userLogin = useSelector((state: ReduxState) => state.userLogin)
    const { loading, userInfo, error } = userLogin

    useEffect(() => {
        if (userInfo) {
            router.push(redirect)
        }
    }, [userInfo, router, redirect])

    const submitHandler = useCallback(
        (e: SyntheticEvent<HTMLFormElement>) => {
            e.preventDefault()
            dispatch(loginUser({ email, password }))
        },
        [dispatch, email, password]
    )

    return (
        <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-md w-full space-y-8'>
                <h1>Sign In</h1>
                {error && <Message>{error}</Message>}
                {loading ? (
                    <Loader />
                ) : (
                    <form className='mt-8 space-y-6' onSubmit={submitHandler}>
                        <div>
                            <label htmlFor='email-address' className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400'>Email Address</label>
                            <input
                                id='email-address'
                                name="email"
                                type="email"
                                autoComplete='email'
                                required
                                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400'>Password</label>
                            <input
                                id='password'
                                name="password"
                                type="password"
                                autoComplete='current-password'
                                required
                                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <button type="submit" className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                                Sign In
                            </button>
                        </div>

                        <div>
                            New Customer?{' '}
                            <Link href={redirect ? `/register?redirect=${redirect}` : `/register`}>Register</Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}

export default LoginScreen
