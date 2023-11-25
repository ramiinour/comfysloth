'use client'


import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper'
import 'swiper/css';
import 'swiper/css/navigation';
import Image from "next/image";


// import required modules
import { Navigation ,Pagination, Mousewheel, Keyboard} from 'swiper/modules';


type Props = {
    images: string[]
}

const ImageSlider = ({ images }: Props) => {
    const swiperRef = useRef<SwiperType>()
    const [activeIndex, setActiveIndex] = useState<number | undefined>(0);

    useEffect(() => {
        if (swiperRef && swiperRef.current) {
          swiperRef.current.on("slideChange", () => {
            setActiveIndex(swiperRef?.current?.activeIndex);
          });
        }
      }, []);

      
      return (
  
        <div className='flex flex-col'>
        <Swiper
         onBeforeInit={(swiper) => {
            swiperRef.current = swiper
          }} 
        cssMode={true}
        keyboard={true}
        
        className="flex w-[700px]">
            {   
                images.length > 0 &&
                images.map((img:any,index:number)=> {
                    return <SwiperSlide className='flex w-[300px]'>
                        <Image src={img?.url} fill alt='selected product image'/>
                    </SwiperSlide>
                })
            }
      </Swiper>

      <div className="hidden md:flex h-[90px]  items-center justify-center gap-4 mb-5">
        {images?.map((img:any, index) => (
          <div
            key={img.filename}
            className={`w-[70px] h-[70px] mb-2 cursor-pointer rounded-lg border-2 p-[1px] ${
              index === activeIndex ? "border-black" : "border-none"
            }`}
            onClick={() => {
              swiperRef.current?.slideTo(index);
            }}
          >
            <Image objectFit="cover" width={70} height={70} className="rounded-lg" src={img.url} alt="product Image" />
          </div>
        ))}
      </div>
        
        </div>
       
           
  );
}

export default ImageSlider
