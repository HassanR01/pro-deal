'use client'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'

export default function Analysis({ zones, developers, projects, properties, leads }) {
    const {data: session} = useSession()
    return (
        <>
            <div className="w-full flex items-center justify-center flex-wrap my-10">
                <div className="cards flex items-center justify-center flex-wrap">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="card"
                    >
                        <Link href={{
                            pathname: `/dashboard/zones`,
                            query: {
                                email: session?.user?.email
                            }
                        }} className='w-full h-full p-2 flex items-center justify-around flex-col'>
                            
                        <h2 className='text-xl font-bold mb-2'>المناطق</h2>
                        <h5 className='text-lg'>تم تسجيل: <span className='font-bold'>{zones.length} منطقة</span></h5>
                        <div className="line bg-green-500"></div>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="card shadow-md rounded-xl w-60 h-32 hover:shadow-2xl hover:bg-slate-300 duration-300"
                    >
                        <Link href={{
                            pathname: `/dashboard/developers`,
                            query: {
                                email: session?.user?.email
                            }
                        }} className='w-full h-full p-2 flex items-center justify-around flex-col'>
                            
                        <h2 className='text-xl font-bold mb-2'>المطورين</h2>
                        <h5 className='text-lg'>تم تسجيل: <span className='font-bold'>{developers.length} مطور عقاري</span></h5>
                        <div className="line bg-cyan-500"></div>
                        </Link>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="card shadow-md rounded-xl w-60 h-32 hover:shadow-2xl hover:bg-slate-300 duration-300"
                    >
                        <Link href={{
                            pathname: `/dashboard/projects`,
                            query: {
                                email: session?.user?.email
                            }
                        }} className='w-full h-full p-2 flex items-center justify-around flex-col'>
                            
                        <h2 className='text-xl font-bold mb-2'>المشروعات</h2>
                        <h5 className='text-lg'>تم تسجيل: <span className='font-bold'>{projects.length} مشروع</span></h5>
                        <div className="line bg-orange-500"></div>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="card shadow-md rounded-xl w-60 h-32 hover:shadow-2xl hover:bg-slate-300 duration-300"
                    >
                        <Link href={{
                            pathname: `/dashboard/properties`,
                            query: {
                                email: session?.user?.email
                            }
                        }} className='w-full h-full p-2 flex items-center justify-around flex-col'>
                            
                        <h2 className='text-xl font-bold mb-2'>الوحدات</h2>
                            <h5 className='text-lg'>تم تسجيل: <span className='font-bold'>{properties.length > 10 ? `${properties.length} وحدة` : `${properties.length} وحدات`}</span></h5>
                        <div className="line bg-pink-500"></div>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        className="card shadow-md rounded-xl w-60 h-32 hover:shadow-2xl hover:bg-slate-300 duration-300"
                    >
                        <Link href={{
                            pathname: `/dashboard/users`,
                            query: {
                                email: session?.user?.email
                            }
                        }} className='w-full h-full p-2 flex items-center justify-around flex-col'>
                            
                        <h2 className='text-xl font-bold mb-2'>العملاء المحتملين</h2>
                            <h5 className='text-lg'>تم تسجيل: <span className='font-bold'>{leads.length > 10 ? `${leads.length} عميل` : `${leads.length} عملاء` }</span></h5>
                        <div className="line bg-blue-500"></div>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </>
    )
}
