import HeroSection from '@/components/shared/heroSection'
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
            text: 'checkout',
            link: '/checkout',
        },
    ]
    return (
        <>
            <HeroSection links={links} />
            {/* <ProductsMain/>  */}
            <div>
                HEYCHEKOUT
            </div>
        </>
    )
}

export default Page