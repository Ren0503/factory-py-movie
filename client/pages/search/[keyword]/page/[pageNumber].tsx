import { useRouter } from 'next/router'
import React, { FunctionComponent } from 'react'

import HomeComponent from 'components/home'

const SearchHome: FunctionComponent = () => {
    const router = useRouter()
    return (
        <HomeComponent
            keyword={router.query.keyword as string}
            pageNumber={Number(router.query.pageNumber ?? 1)}
        />
    )
}

export default SearchHome
