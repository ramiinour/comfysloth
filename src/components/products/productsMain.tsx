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
    const [selectedDisplay,setSelectedDisplay] = useState("column")
    const [selectedCategory,setSelectedCategory] = useState("All")
    const [selectedColor,setSelectedColor] = useState("All")
    const [selectedCompany,setSelectedCompany] = useState("All")
    const [selectedPrice,setSelectedPrice] = useState(999999)
    const [isFreeShipping, setIsFreeShipping] = useState(false)
    const [filteredProducts, setFilteredProducts] = useState([]);

    const [currency, setCurrency] = useState('aed')
    const [products,setProducts] = useState([])
    const [currOpen, setCurrOpen] = useState('')
    const [open, setOpen] = useState('')
    const [sort, setSort] = useState('A-z')
    // const [data, setData] = useState(null);
    const scrollRef = useRef<HTMLDivElement>(null!)

    const { data:productsData, isLoading } = useQuery(
        ['get all products'],
        () => fetchAllProducts(),
        { refetchOnWindowFocus: false }
    )

    const categories = productsData?.map((product:any) => product.category).filter((category:any,index:any,self:any)=> {
        return self.indexOf(category) === index;
    })
    const colors = productsData?.map((product:any) => product.colors).flat().filter((color:any,index:any,self:any)=> {
        return self.indexOf(color) === index;
    })
    const companies = productsData?.map((product:any) => product.company).filter((company:any,index:any,self:any)=> {
        return self.indexOf(company) === index;
    }).map((company:any)=> {return {text:company,value:company}})

    const handleRangeChange = (event:any) => {
        setSelectedPrice(parseInt(event.target.value, 10));
      };
    
      const handleClearFilters = () => {
        setSelectedCategory('All')
        setSelectedColor('All')
        setSelectedCompany('All')
        setSelectedPrice(999999)
        setIsFreeShipping(false)
      };
   
   
    
    


    useEffect(() => {
       
    if(!isLoading) {
        // Filter products based on selected filters
    const filtered = productsData?.filter((product:any) => {
        // Check category
        if (selectedCategory !== "All" && product.category !== selectedCategory) {
          return false;
        }
  
        // Check color
        if (selectedColor !== "All" && !product.colors.includes(selectedColor)) {
          return false;
        }
  
        // Check company
        if (selectedCompany !== "All" && product.company !== selectedCompany) {
          return false;
        }
  
        // Check price
        if (product.price > selectedPrice) {
          return false;
        }
  
        // Check free shipping
        if (isFreeShipping && !product.shipping) {
          return false;
        }
  
        // All checks passed, include the product in the filtered list
        return true;
      });
  
      setFilteredProducts(filtered);
    }
     
      }, [selectedCategory, selectedColor, selectedCompany, selectedPrice, isFreeShipping , isLoading]);


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
        <section className="section-spacing w-full flex flex-col items-center px-4 mt-16">
            <div className="flex flex-col items-center container">
                <div className="w-full flex justify-between gap-5">
                    
                    {/* Products Filters */}
                    <div className="flex flex-col gap-4 relative min-w-[200px] max-w-[200px] items-start">
                    <input
                        className="text-sm outline-none pl-2 bg-secondary py-2 rounded-sm"
                        placeholder="Search..."
                        onChange={(e) =>
                        {}}
                        onFocus={(e) => {}}
                    />
                    { !isLoading &&
                    <div className=''>
                       <h3 className='text-primary text-lg font-bold'>Categories</h3>
                       <p onClick={()=> setSelectedCategory("All")} className={`${selectedCategory === "All" && "underline"} cursor-pointer`}>All</p>

                       {
            
                        categories.map((cat:any,index:any)=> <p key={cat +index} onClick={()=> setSelectedCategory(cat)} className={`${selectedCategory === cat && "underline"} cursor-pointer`}>{cat}</p>)
                       }
                    </div>
                       }
                       

                       { !isLoading &&
                    <div className='flex flex-col gap-2'>
                       <h3 className='text-primary text-lg font-bold'>Company</h3>
                      
                       <SelectField
                            className="bg-content col-span-5 py-1"
                            open= {open}
                            value={selectedCompany}
                            setOpen={setOpen}
                            type='company'
                            items={
                                [
                                    {
                                        text:"All",
                                        value:"All",
                                    },
                                    ...companies
                                ]
                            }
                            onChange={(value)=> setSelectedCompany(value)}
                            listClass="bg-blue-200 border"
                            isSharp
                            placeholder= {selectedCompany}
                            iconClass="fill-black"
                                    
                                    />
                       
                    </div>
                       }

                    { !isLoading &&
                    <div className='flex flex-col gap-2'>
                       <h3 className='text-primary text-lg font-bold'>Color</h3>
                      
                        <div className='flex gap-2 items-center'>
                            <p onClick={()=> setSelectedColor("All")} className={`${selectedColor === "All" && "underline"} cursor-pointer`}>All</p>
                            <div className='flex gap-1'>
                            {
                                colors.map((color:any,index:any)=> {
                                    return (
                                        <div onClick={()=> setSelectedColor(color)} key={color +index} className={`bg-[${color}] rounded-full p-1 cursor-pointer w-[25px] h-[25px]`} >
                
                                        </div>
                                    )
                                })
                            }

                        </div>
                        </div>
                       
                    </div>
                       }
                    
                    { !isLoading &&
                    <div className='flex flex-col gap-2'>
                       <h3 className='text-primary text-lg font-bold'>Price</h3>
                      
                        <div className='flex flex-col gap-2 items-start'>
                            <p >{selectedPrice}</p>
                            <div className='flex gap-1'>
                            <input
                                type="range"
                                id="rangeInput"
                                name="rangeInput"
                                min={0}
                                max={999999}
                                value={selectedPrice}
                                onChange={handleRangeChange}
                            />

                        </div>
                        </div>
                       
                    </div>
                       }

                 { !isLoading &&
                 
                        <div className='flex gap-2 justify-between'>
                            <p >Free Shipping</p>
                            <input
                                type="checkbox"
                                checked={isFreeShipping}
                                onChange={()=> setIsFreeShipping(!isFreeShipping)}
                            />
                        </div>
                       
                  
                       }

                       
                        <button onClick={handleClearFilters} className='flex p-1 bg-red-500 rounded-md'>
                            clear Filters
                        </button>
                       

                
                    </div>


                     {/* Products Main */}
                    <div className="flex flex-col gap-5 w-full ">
                        {/* Sorting */}

                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex flex-wrap flex-grow items-center gap-4 lg:gap-7 w-3/12">
                                <div className='flex gap-2'>
                                <button onClick={()=> setSelectedDisplay("grid")} className= {`flex p-1 rounded-md ${selectedDisplay === "grid"? "bg-black text-white":"border border-gray-500 text-black"}`}>
                                <BsGrid fontSize="1.5em" />
                                </button>
                                <button onClick={()=> setSelectedDisplay("column")} className= {`flex p-1 rounded-md ${selectedDisplay === "column"? "bg-black text-white":"border border-gray-500 text-black"}`}>
                                <LuMenuSquare fontSize="1.5em" />
                                </button>
                    
    
                                </div>

                               <p className='flex flex-col'>
                                <span>
                                    {filteredProducts?.length} Products
                                </span>
                                <span>
                                Found
                                </span>
                               </p>
                               </div>


                               <div className='h-[1px] bg-content hidden xl:flex xl:w-6/12'/>

                                <div className="flex flex-wrap flex-grow items-center gap-2 lg:justify-end mt-4 lg:mt-0 w-3/12">
                                    <span className='font-bold'>
                                    Sort By
                                    </span>
                                    <SelectField
                                    className="bg-content col-span-5 py-1"
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
                        ) : 
                        filteredProducts && filteredProducts?.length > 0? 
                        <div
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 w-full"
                                    ref={scrollRef}
                                >
                                    {filteredProducts?.length === 0? 
                                    <div>NO PRODUCTS FOUND</div>
                                    :filteredProducts?.map(
                                        (item: any, index: number) => {
                                            return (
                                                <ProductCard
                                                key={item.name + index}
                                                id={item.id}
                                                name={item.name}
                                                img={item.image}
                                                price={item.price}
                                                
                                                />  
                                            )
                                        }
                                    )}
                                </div>
                                :
                        <div>NO PRODUCTS FOUND</div>
                     }
                        </div>
                        
                    
                    </div>

                </div>
            </div>
        </section>
    )
}

export default ProductsMain