import { SelectItem } from '@/data/types'

import React, { useEffect, useRef, useState } from 'react'
import ArrowDown from './icons/arrowDown'

type Props = {
    items: SelectItem[]
    className?: string
    value?: string | string[]
    onChange: (value: string) => void
    open: string
    setOpen: React.Dispatch<React.SetStateAction<string>>
    type: string
    checkbox?: boolean
    placeholder?: string
    keepOpen?: boolean
    isSharp?: boolean
    listClass?: string
    iconClass?: string
}

const SelectField = ({
    items,
    className,
    onChange,
    value,
    open,
    setOpen,
    type,
    checkbox,
    placeholder,
    keepOpen,
    isSharp,
    listClass,
    iconClass,
}: Props) => {
    const containerRef = useRef<HTMLDivElement>(null!)

    useEffect(() => {
        const handler = (event: any) => {
            if (!containerRef.current.contains(event?.target)) {
                if (type == open) setOpen('')
            }
        }
        window.addEventListener('click', handler)
        return () => {
            window.removeEventListener('click', handler)
        }
    }, [open])
    return (
        <div
            className={`relative  text-black text-sm ${className}`}
            ref={containerRef}
        >
            <button
                className={`flex ${
                    isSharp ? '' : 'rounded-md'
                } w-full justify-between  items-center text-black px-2`}
                onClick={() =>
                    setOpen((prev: string) => (prev == type ? '' : type))
                }
            >
                <span className="truncate max-w-[90%]">
                    {typeof value == 'string'
                        ? value != ''
                            ? parseInt(
                                  items.find((item) => item.value == value)!
                                      .text
                              )
                                ? parseInt(
                                      items.find((item) => item.value == value)!
                                          .text
                                  )?.toLocaleString()
                                : items.find((item) => item.value == value)!
                                      .text
                            : placeholder
                        : placeholder}
                </span>

                <ArrowDown
                    className={`transition-transform duration-300 ease-in-out ${
                        open == type && open != '' ? 'rotate-180' : 'rotate-0'
                    } ${iconClass}`}
                />
            </button>
            <div
                className={`absolute transition-all duration-200 ease-in-out overflow-hidden w-full flex flex-col  drop-shadow-xs z-10 ${
                    isSharp ? '' : 'rounded-md'
                } ${checkbox ? 'top-10' : 'top-8'}   ${
                    open == type && open != ''
                        ? 'max-h-[300px] opacity-100 overflow-y-auto'
                        : 'max-h-0 opacity-0 '
                } ${listClass}`}
            >
                {items.map((item: SelectItem, index: number) => {
                    return (
                        <button
                            className="p-2 w-full flex gap-4 group/option items-center"
                            onClick={() => {
                                onChange(item.value)
                                if (!keepOpen) {
                                    setOpen('')
                                }
                            }}
                            key={item?.text + index}
                        >
                            {typeof value == 'object' && checkbox && (
                                <div
                                    className={`min-h-[18px] min-w-[18px] border border-black rounded-sm ${
                                        value.find(
                                            (tempItem) => tempItem == item.value
                                        )
                                            ? 'bg-black'
                                            : 'bg-transparent'
                                    }`}
                                />
                            )}
                            <span className=" text-start group-hover/option:translate-x-2 group-hover/option:text-black transition-transform duration-300 ease-in-out">
                                {parseInt(item.text)
                                    ? parseInt(item.text)?.toLocaleString()
                                    : item?.text}
                            </span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default SelectField