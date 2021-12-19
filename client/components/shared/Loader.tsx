import React from 'react'

const Loader = () => {
    return (
        <button type='button' className='bg-yellow-500' disabled>
            <svg className='animate-spin h-5 w-5 mr-3' viewBox='0 0 24 24'>
            </svg>
            Loading...
        </button>
    )
}

export default Loader
