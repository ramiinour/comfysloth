
import Link from 'next/link'
import React from 'react'
import { LinkType} from '@/data/types'

import { useParams } from 'next/navigation'
type Props = {
    links?: LinkType[],
    title?: string
}

const HeroSection = ({ links,title}: Props) => {
    const params = useParams() 
    const productId = params.id
    console.log(productId)
    return (
        <section className="py-16  w-full flex flex-col items-center px-4 bg-[#eaded7]">
            <div className="container flex flex-col gap-5 items-center">
                <nav className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 text-xl font-bold">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-10">
                        <ul className="flex items-center overflow-hidden">
                            {links?.map((link: LinkType, index: number) => {
                                return (
                                    <li
                                        key={link?.link + index}
                                        className={`flex items-center  ${index > 0 && "ml-8"} ${index === links.length - 1? "text-primaryDark":"text-[#795744]"}`}
                                    >
                                        {index > 0 && 
                                        <span className='mr-1'>/</span>
                                        }
                                        <Link
                                            href={link?.link}
                                            className={`pr-2 text-brand-300 `}
                                        >
                                            {link?.text}
                                        </Link>
                                    </li>
                                )
                            })}
                            {title && 
                            <li
                            className={` text-brand-200 max-w-[98%] truncate`}>
                            {title}
                           </li>
                            }
                        </ul>
                    </div>
                </nav>
            </div>
        </section>
    )
}

export default HeroSection