import React, { FunctionComponent } from 'react'

const Message: FunctionComponent = ({ children }) => {
    return (
        <div className='flex items-center bg-blue=500 text-white test-sm font-bold px-4 py-3' role="alert">
            <p>{children}</p>
        </div>
    )
}

export default Message
