'use client'

import React, { useState,useEffect,useRef } from 'react'
import { useQuery } from 'react-query'
import Link from 'next/link'
import { LuMenuSquare } from "react-icons/lu";
import { BsGrid } from "react-icons/bs";
import SelectField from '../shared/selectField';
import { fetchAllProducts } from '@/data/products/query';
import axios from 'axios';
import ProductCard from './productCard';



type Props = {
 
}

const ProductsMain = ({
 
}: Props) => {
    const [currency, setCurrency] = useState('aed')
    const [products,setProducts] = useState([])
    const [currOpen, setCurrOpen] = useState('')
    const [open, setOpen] = useState('')
    const [sort, setSort] = useState('')
    // const [data, setData] = useState(null);
    const scrollRef = useRef<HTMLDivElement>(null!)

    const { data:productsData, isLoading } = useQuery(
        ['get all products'],
        () => fetchAllProducts(),
        { refetchOnWindowFocus: false }
    )


    useEffect(() => {
        // const fetchData = async () => {
        //   try {
        //     const response = await axios.get('https://course-api.com/react-store-products');
        //     console.log(response.data);
        //   } catch (error) {
        //     console.log(error);
        //   }
        // };
    
        // fetchData();
        console.log("I am here")
      }, []);


    const [areaUnit, setAreaUnit] = useState('sq.ft')
    const toSquareMeter = 0.09290304

    const scrollToContact = () => {
        const element = document.getElementById('contact')
        if (element) {
            window.scrollTo({
                top: element.getBoundingClientRect().top - 150,
                behavior: 'smooth',
            })
        }
    }

    console.log(productsData)
    
    return (
        <section className="section-spacing w-full flex flex-col items-center px-4 ">
            <div className="flex flex-col items-center container">
                <div className="w-full flex justify-between gap-5">
                    
                    <div className="flex flex-col relative min-w-[350px] max-w-[350px]">
                        <div className="w-full sticky top-[140px] left-0 flex flex-col gap-2 p-4 bg-[#F1F1F1] rounded-md">
                            <Link
                                href={`/`}
                                className="flex items-center gap-4"
                            >
                                <h2 className="font-light">here</h2>
                            </Link>
                            <div className="grid grid-cols-2 gap-2">
                                <a
                                    href={`tel:`}
                                    target="_blank"
                                    className="w-full text-brand-100 text-center border border-brand-100 py-3 hover:bg-brand-100 hover:text-white rounded-md transition-colors duration-300 ease-in-out"
                                >
                                    Call us
                                </a>
                                <button
                                    className="w-full text-center border border-brand-100 py-3 text-brand-100 hover:bg-brand-100 hover:text-white rounded-md transition-colors duration-300 ease-in-out"
                                >
                                    Inquiry
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 w-full ">
                        {/* Sorting */}

                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex flex-wrap flex-grow items-center gap-4 lg:gap-7">
                                <div className='flex gap-2'>
                                <BsGrid color="black" fontSize="1.5em" />
                                <LuMenuSquare color="black" fontSize="1.5em" />
                                
                                </div>

                               <p className='flex flex-col'>
                                <span>
                                    22 Products
                                </span>
                                <span>
                                Found
                                </span>
                               </p>
                               </div>

                                <div className="flex flex-wrap flex-grow items-center gap-4 lg:gap-7 lg:justify-end mt-4 lg:mt-0">
                                    <span>
                                    SORT BY
                                    </span>
                                    <SelectField
                                    className=" bg-gray-800 border-white col-span-5"
                                    open= {open}
                                    value={sort}
                                    setOpen={setOpen}
                                    type='lang'
                                    items={
                                        [
                                            {
                                                text: 'A-z',
                                                value: 'A-z',
                                            },
                                            {
                                                text: 'Z-a',
                                                value: 'Z-a',
                                            }, 
                                        ]
                                    }
                                    onChange={(value)=> setSort(value)}
                                    listClass="bg-blue-200 border"
                                    isSharp
                                    placeholder="A-z"
                                    iconClass="fill-black"
                                    
                                    />

                                </div>
                        </div>





                        {/* Products */}
                        <div className="flex">
                        {isLoading ? (
                            <span>
                                NOT YET
                            </span>
                        ) : (
                            <>
                                <div
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full"
                                    ref={scrollRef}
                                >
                                    {productsData?.map(
                                        (item: any, index: number) => {
                                            return (
                                                <ProductCard
                                                key={item.name + index}
                                                name={item.name}
                                                img={item.image}
                                                price={item.price}
                                                
                                                />
                                                // <AreaDeveloperCard
                                                //     link={`/areas/${item?.name.replaceAll(' ', '-')?.toLowerCase()}`}
                                                //     key={item?.name + index}
                                                //     img={item?.mainImage}
                                                //     title={item?.name}
                                                //     price={
                                                //         item?.property?.[0]
                                                //             ?.propertyPrice
                                                //     }
                                                // />
                                               
                                            )
                                        }
                                    )}
                                </div>
                            </>
                          )}
                        </div>
                        
                    
                    </div>

                </div>
            </div>
        </section>
    )
}

export default ProductsMain