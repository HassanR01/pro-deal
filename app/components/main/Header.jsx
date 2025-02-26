'use client'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDataContext } from '../context/DataContext'
import Loading from '../home/loading'
import { motion, useScroll } from 'framer-motion'


export default function Header() {
    const { admins } = useDataContext()
    const { status, data: session } = useSession()


    const { scrollY } = useScroll()
    const [scrolled, setScrolled] = useState()

    useEffect(() => {
        return scrollY.onChange((latest) => {
            setScrolled(latest > 100)
        })
    }, [scrollY])

    if (!admins) {
        return <Loading />
    } else {

        console.log(admins)
        const adminEmails = []
        admins.forEach(admin => {
            adminEmails.push(admin.email)
        });

        return (
            <motion.header
                className={`w-full ${scrolled ? "lg:w-[100%]" : 'lg:w-[80%] lg:rounded-b-xl'} py-2  flex items-center justify-between bg-white fixed top-0 left-1/2 -translate-x-1/2 z-50 duration-700`}
            >
                <Link href={'/'} className="logo px-2 py-1 flex items-center justify-center">
                    <div className="text flex flex-col items-end justify-center ml-2">
                        <h3 className='lg:text-4xl text-xl text-textColor font-black'>Pro Deal</h3>
                        <span className='font-bold text-[5.5px] lg:text-[9.5px] -mt-1'>Invest in Elegance, Live in Luxury</span>
                    </div>
                    <Image src={'/logo.svg'} width={40} height={40} alt='Aqary Store Logo' />
                </Link>

                <nav>
                    <ul className='sm:flex items-center justify-between duration-700'>
                        <li className='font-bold text-base py-1 px-2'><Link href={'/'}>الرئيسية</Link></li>
                        <li className='font-bold text-base py-1 px-2'><Link href={'/zones'}>المناطق</Link></li>
                        <li className='font-bold text-base py-1 px-2'><Link href={'/zones/مصر/projects'}>المشروعات</Link></li>
                        <li className='font-bold text-base py-1 px-2'><Link href={'/zones/مصر/properties'}>الوحدات</Link></li>
                        <li className='font-bold text-base py-1 px-2'><Link href={'/developers'}>المطورين</Link></li>
                        <li className='font-bold text-base py-1 px-2'><Link href={'/contact'}>التواصل</Link></li>
                    </ul>
                </nav>

                <div className="access px-4 flex items-center justify-center">

                    {status === "authenticated" ? (
                        <>
                            {admins.includes(session?.user?.email) ? (
                                <>
                                    <Link href={{
                                        pathname: `/dashboard/`,
                                        query: {
                                            email: session?.user?.email
                                        }
                                    }} ><svg className='h-7 w-7' fill="currentColor" id="Isolation_Mode" dataName="Isolation Mode" viewBox="0 0 24 24"><path d="M15,11H0V3A3,3,0,0,1,3,0H15Z" /><path d="M24,11H17V0h4a3,3,0,0,1,3,3Z" /><path d="M7,24H3a3,3,0,0,1-3-3V13H7Z" /><path d="M21,24H9V13H24v8A3,3,0,0,1,21,24Z" /></svg></Link>
                                </>
                            ) : (
                                <>
                                    <Link href={{
                                        pathname: '/finder',
                                        query: {
                                            email: session?.user?.email
                                        }
                                    }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-9 p-1 rounded-lg bg-textColor text-bgColor"><path fillRule="evenodd" d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z" clipRule="evenodd" /></svg></Link>
                                </>
                            )}
                            <div className="vLine flex sm:hidden rounded-xl h-8 w-1 mx-4 bg-textColor"></div>
                        </>
                    ) : (
                        <>
                            <button onClick={() => signIn('google')} className='btnH'>تسجيل دخول</button>
                            <div className="vLine flex sm:hidden rounded-xl h-8 w-1 mx-4 bg-textColor"></div>
                        </>
                    )}
                    <div className="brgIcon w-8 flex sm:hidden flex-col items-center justify-center">
                        <span className=' w-4 h-1 bg-black rounded-xl my-0.5 duration-700'></span>
                        <span className=' w-full h-1 bg-black rounded-xl my-0.5 duration-700'></span>
                        <span className=' w-4 h-1 bg-black rounded-xl my-0.5 duration-700'></span>
                    </div>
                </div>
            </motion.header>
        )
    }

}