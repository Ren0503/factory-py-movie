import React, { FunctionComponent } from 'react'

interface PlayerProps {
    url: string
}

const Player: FunctionComponent<PlayerProps> = ({ url }) => {
    return (
        <div className="w-full">
            <iframe
                src={url}
                className="responsive-iframe absolute top-0 left-0 w-full h-full" 
                style={{ border: 0 }}
                title=""
                frameBorder="0"
                allowFullScreen
            ></iframe>
        </div>
    )
}

export default Player
