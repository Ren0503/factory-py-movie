import React, { FunctionComponent } from 'react'

interface PlayerProps {
    url: string
}

const Player: FunctionComponent<PlayerProps> = ({ url }) => {
    return (
        <div className="relative h-0 w-full">
            <iframe
                src={url}
                title=""
                frameBorder="0"
                allowFullScreen
            ></iframe>
        </div>
    )
}

export default Player
