'use client'

import React, { useState,useEffect,useRef } from 'react'
import { useQuery } from 'react-query'
import Link from 'next/link'
import { LuMenuSquare } from "react-icons/lu";
import { BsGrid } from "react-icons/bs";


import { fetchSingleProduct } from '@/data/products/query';
import HeroSection from '@/components/shared/heroSection';

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { LinkType } from '@/data/types';
import ImageSlider from './ImagesSlider';




type Props = {
 
}

const SingleProductsMain = ({
 
}: Props) => {
   
    const scrollRef = useRef<HTMLDivElement>(null!)
    const params = useParams() 
    const id:any = params.id
    console.log(id)

    const { data:productData, isLoading } = useQuery(
        ['single product'],
        () => fetchSingleProduct(id),
        { refetchOnWindowFocus: false }
    )

    console.log("dkdkkdkdkdkdk",productData)
   
    const links = [ 
        {
            text: 'Home',
            link: '/',
        },
        {
            text: 'products',
            link: '/products',
        },
        {
            text: `${productData? productData.name : ""}`,
            link: '/checkout',
        },
    ]
   
    
    return (
        <>
        <HeroSection links={links}/>

        <section className="section-spacing w-full flex flex-col items-center px-4 mt-16">
            <div className="flex flex-col items-center container gap-7">
              <div className='flex flex-col gap-7'>
              <div className='flex'>
                TEST
               </div>
               
               <div className='flex gap-10'>
                {isLoading ? <></> : <ImageSlider images={productData.images}/>}
                <div className='flex'>TEST</div>
               </div>
              </div>
            </div>
        </section>
        </>
    )
}

export default SingleProductsMain