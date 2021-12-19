import React, { FunctionComponent } from 'react'
import { Helmet } from 'react-helmet'

interface MetaProps {
    title?: string
    description?: string
    keywords?: string
}
const Meta: FunctionComponent<MetaProps> = ({
    title = 'Welcome to MFactory',
    description = 'For watch the best free movie',
    keywords = 'movie, watch movie, free movie',
}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
        </Helmet>
    )
}

export default Meta
