import React, { FunctionComponent } from 'react'

interface RatingProps {
    value: number
    text?: string
    color?: string
}

const Rating: FunctionComponent<RatingProps> = ({
    value,
    text,
    color = '#f8e825',
}) => {
    return (
        <div>
            
        </div>
    )
}

export default Rating
