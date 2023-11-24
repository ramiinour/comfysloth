import React from 'react'
import CustomImage from '../customImage'

import Link from 'next/link'

type Props = {
    img: string
    name: string
    price:string
}


const ProductCard = ({ img, name, price }: Props) => {
    return (
        <Link
            href={`/`}
            className="flex flex-col gap-2 group rounded-md overflow-hidden"
        >
            <div className="relative w-full h-[200px] overflow-hidden ">
                <CustomImage
                    src={img}
                    fill
                    className="group-hover:scale-125 transition-transform duration-300 ease-in-out "
                    containerclassname=""
                />
            </div>
            <div className='flex justify-between text-base font-semibold'>
            <h3 className="font-semibold">{name}</h3>
            <h3 className="text-primary">{`$${price}`}</h3>
            </div>
        </Link>
    )
}

export default ProductCard