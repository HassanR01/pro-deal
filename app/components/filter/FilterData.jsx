'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function FilterData({ ftr, properties, projects, showProject, showProperty, showFilter }) {
    const [filter, setFilter] = useState(ftr ? ftr : '')


    const [endPrj, setEndPrj] = useState(21)
    const [endPpt, setEndPpt] = useState(21)

    const ShowMoreBtnPrj = () => {
        setEndPrj(FilteredProjects.length)
    }

    const ShowMoreBtnPpt = () => {
        setEndPpt(FilteredProperties.length)
    }



    const FilteredProjects = projects.filter(project => {
        const MatchedZone = project.zone.toLowerCase().includes(filter.toLowerCase())
        const MatchedDeveloper = project.developer.toLowerCase().includes(filter.toLowerCase())
        const MatchedName = project.title.toLowerCase().includes(filter.toLowerCase())
        // const MatchedLocation = project.location.toLowerCase().includes(filter.toLowerCase())
        return MatchedDeveloper || MatchedZone || MatchedName // || MatchedLocation
    })

    const FilteredProperties = properties.filter(property => {
        const MatchedZone = property.zone.toLowerCase().includes(filter.toLowerCase())
        const MatchedDeveloper = property.developer.toLowerCase().includes(filter.toLowerCase())
        const MatchedName = property.title.toLowerCase().includes(filter.toLowerCase())
        // const MatchedLocation = property.location?.toLowerCase().includes(filter.toLowerCase())
        return MatchedDeveloper || MatchedZone || MatchedName // || MatchedLocation
    })

    function insertDots(number) {
        let numStr = number.toString();
        let result = '';
        for (let i = numStr.length - 1; i >= 0; i--) {
            result = numStr[i] + result;
            if ((numStr.length - i) % 3 === 0 && i !== 0) {
                result = '.' + result;
            }
        }
        return result;
    }


    return (
        <>
            <div className="filterContainer flex w-full items-center justify-center flex-col mb-20">
                {showFilter ? (
                    <div className="filterForm text-center px-4  w-full lg:w-2/4 flex items-center justify-center flex-col mb-10">
                        <label htmlFor="search" className=' font-bold text-xl'>ابحث عن عقارك</label>
                        <p className='mb-5'>يمكنك البحث بأستخدام عنوان الإعلان ، المنطقة ، الموقع و المطورين</p>
                        <input type="text" name="filter" id="search" className='mt-1 w-full py-2 px-2 border border-gray-300 bg-white rounded-xl shadow-sm focus:outline-none sm:text-sm' value={filter} onChange={(e) => setFilter(e.target.value)} placeholder='مثال: إعمار مصر' />
                    </div>
                ) : null}

                {showProperty ? (
                    <>
                        <div className="lists flex flex-wrap items-center justify-around w-full mb-20">
                            {FilteredProperties.map((property , index) => (
                                <motion.div
                                    key={property._id} 
                                    custom={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index/10 * 0.01 }}
                                    className=" rounded-xl h-72 w-80 lg:w-96 m-2 hover:shadow-xl"
                                >
                                <Link href={`/zones/${property.zone}/properties/${property.title}`} className="PropertyCard w-full h-full">
                                    <div className="relative image h-3/5 rounded-br-2xl rounded-tl-2xl overflow-hidden">
                                        <Image className='w-full h-full duration-700 hover:scale-125' src={property.image} width={340} height={340} alt={property.title} />
                                        <div className="popup absolute top-3 right-3 p-0.5 w-20 font-bold bg-mainColor text-bgColor rounded-xl flex items-center justify-center text-center">
                                            <h5>{property.category}</h5>
                                        </div>
                                    </div>
                                    <div className="data p-2 flex flex-col items-start justify-between h-2/5">
                                        <h2 className='text-sm lg:text-base font-semibold text-black' title={`${property.title}`}>{property.title.slice(0, 40)}..</h2>
                                        <div className="location flex items-center justify-start">
                                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" /></svg>
                                            <h6 className='text-gray-500 text-sm mr-2'>{property.location}</h6>
                                        </div>
                                        <div className="startBudget flex items-center justify-start">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">   <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />   <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 21 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z" clipRule="evenodd" /> </svg>
                                            <h6 className='text-gray-500 text-sm mr-2'>تبدأ من: <span className='text-black'>{insertDots(property.startBudget)} جنية مصري</span></h6>
                                        </div>
                                        <div className="spans text-xs sm:text-base flex items-center justify-center mt-2">
                                            <div className="rooms flex items-center justify-center mx-2">
                                                <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M3 7v11m0 -4h18m0 4v-8a2 2 0 0 0 -2 -2h-8v6" />  <circle cx="7" cy="10" r="1" /></svg>
                                                <span className='text-black mr-1 font-bold'>{property.bedrooms} غرف نوم</span>
                                            </div>
                                            <div className="bathrooms flex items-center justify-center mx-2">
                                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" /></svg>
                                                <span className='text-black mr-1 font-bold'>{property.bathrooms} حمامات</span>
                                            </div>
                                            <div className="area flex items-center justify-center mx-2">
                                                <svg className="h-4 w-4" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M10 12h-7l3 -3m0 6l-3 -3" />  <path d="M14 12h7l-3 -3m0 6l3 -3" />  <path d="M3 6v-3h18v3" />  <path d="M3 18v3h18v-3" /></svg>
                                                <span className='text-black mr-1 font-bold'>{property.area} متر مربع</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                </motion.div>
                            )).slice(0, endPpt)}
                        </div>
                        <>
                            <div className="btns my-2 w-full sm:w-auto flex items-center justify-center">
                                {FilteredProperties.length > endPpt && (<button onClick={() => ShowMoreBtnPpt()} className='btn'>عرض الكل</button>)}
                            </div>
                        </>
                    </>
                ) : null}

                {showProject ? (
                    <>
                        <div className="lists flex flex-wrap items-center justify-around w-full mb-20">
                            {FilteredProjects.map((project, index) => (
                                <motion.div
                                    key={project._id}
                                    custom={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index / 10 * 0.01 }}
                                    className="rounded-xl h-72 w-80 lg:w-96 m-4 hover:shadow-xl"
                                >
                                <Link href={`/zones/${project.zone}/projects/${project.title}`} className="projectCart w-full h-full">
                                    <div className="relative image h-3/5 rounded-br-2xl rounded-tl-2xl overflow-hidden">
                                        <Image className='w-full h-full duration-700 hover:scale-125' src={project.image} width={340} height={340} alt={project.title} />
                                    </div>
                                    <div className="data p-2 flex flex-col items-start justify-between h-2/5">
                                        <h2 className='text-base font-semibold text-black'>{project.title}</h2>
                                        <div className="location flex items-center justify-start">
                                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" /></svg>
                                            <h6 className='text-gray-500 text-sm mr-2'>{project.location}</h6>
                                        </div>
                                        <div className="startBudget flex items-center justify-start">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">   <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />   <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 21 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z" clipRule="evenodd" /> </svg>
                                            <h6 className='text-gray-500 text-sm mr-2'>تبدأ من: <span className='text-black'>{insertDots(project.startBudget)} جنية مصري</span></h6>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                            )).slice(0, endPrj)}
                        </div>
                        <>
                            <div className="btns my-2 w-full sm:w-auto flex items-center justify-center">
                                {FilteredProjects.length > endPrj && (<button onClick={() => ShowMoreBtnPrj()} className='btn'>عرض الكل</button>)}
                            </div>
                        </>
                    </>
                ) : null}

            </div>
        </>
    )
}
