// import HeroSection from '@/components/shared/heroSection'
// import ProductsMain from '@/components/products/productsMain'

import React from 'react'

type Props = {}

const Page = (props: Props) => {
    const links = [ 
        {
            text: 'Home',
            link: '/',
        },
        {
            text: 'products',
            link: '/products',
        },
    ]
    return (
        <>
            {/* <HeroSection links={links} />
            <ProductsMain/> */}
            <div>
                HEYCHEKOUT
            </div>
        </>
    )
}

export default Page