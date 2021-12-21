import React, { FunctionComponent } from 'react'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'
interface RatingProps {
    value: number
    color?: string
}

const Rating: FunctionComponent<RatingProps> = ({
    value,
    color = '#f8e825',
}) => {
    return (
        <div className="rating flex">
            {[...Array(5)].map((x, i) => {
                const full = value >= i + 1
                const half = value >= i + 0.5

                return (
                    <span key={`star-${i}`}>
                        {full && (
                            <>
                                <FaStar color={color} size={20} />
                            </>
                        )}
                        {!full && half && (
                            <>
                                <FaStarHalfAlt color={color} size={20} />
                            </>
                        )}

                    </span>
                )
            })}{' '}
        </div>
    )
}

export default Rating
