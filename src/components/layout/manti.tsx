import React from 'react'
import Header from './header'
// import Footer from './footer'
import { Mulish } from 'next/font/google'

const mulish = Mulish({
    subsets: ['latin'],
    weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
})

type Props = {
    children: React.ReactNode
}

const Manti = ({ children }: Props) => {
    return (
        //  <div className="flex flex-col items-center">
        <div className={mulish.className}>
            <Header />
            <div className="flex flex-col w-full min-h-screen justify-between">
                <main className="flex flex-col items-center w-full mt-15">
                    {children}
                </main>
                {/* <Footer /> */}
            </div>
        </div>
    )
}

export default Manti