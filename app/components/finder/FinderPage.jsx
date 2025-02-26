'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import React, { useState } from 'react'

export default function FinderPage({ projects, properties, zones, developers, params }) {
    const [stateFtr, setStateFtr] = useState(params.stateFtr)
    const [min, setMin] = useState(params.min)
    const [max, setMax] = useState(params.max)
    const [typePropertyFtr, setTypePropertyFtr] = useState(params.typePropertyFtr)
    const [developerFtr, setDeveloperFtr] = useState(params.developerFtr)
    const [rooms, setRooms] = useState()
    const [bathrooms, setbathRooms] = useState()
    const [area, setarea] = useState()
    const [ChooseSelect, setChooseSelect] = useState('project')

    const [endPrj, setEndPrj] = useState(20)
    const [endPpt, setEndPpt] = useState(20)

    // Units Type
    let types = []
    properties.forEach(unit => {
        types.push(unit.category)
    })
    const ftrCtg = types.filter((unit, index) => types.indexOf(unit) === index)

    const FilteredProperties = properties.filter(unit => {
        const MatchedState = !stateFtr || unit.zone === stateFtr
        const MatchedMinBgt = !min || unit.startBudget > +min
        const MatchedMaxBgt = !max || unit.startBudget < +max
        const MatchedUnitType = !typePropertyFtr || unit.category === typePropertyFtr
        const MatchedDev = !developerFtr || unit.developer === developerFtr
        const MatchedRooms = !rooms || unit.bedrooms <= +rooms
        const Matchedbathrooms = !bathrooms || unit.bathrooms <= +bathrooms
        const MatchedArea = !area || (+area >= 500 ? unit.area >= +area : unit.area <= +area)

        return MatchedState && MatchedMinBgt && MatchedMaxBgt && MatchedUnitType && MatchedDev && MatchedRooms && Matchedbathrooms && MatchedArea
    })

    const FilteredProjects = projects.filter(project => {
        const MatchedMinBgt = !min || project.startBudget >= +min
        const MatchedMaxBgt = !max || project.startBudget <= +max
        const MatchedDev = !developerFtr || project.developer === developerFtr
        const MatchedState = !stateFtr || project.zone === stateFtr

        return MatchedMinBgt && MatchedMaxBgt && MatchedDev && MatchedState
    })

    const ShowMoreBtnPrj = () => {
        setEndPrj(FilteredProjects.length)
    }


    const ShowMoreBtnPpt = () => {
        setEndPpt(FilteredProperties.length)
    }


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

    const handleForm = (e) => {
        e.preventDefault()
    }


    return (
        <div className="FinderPage w-full h-full p-5 flex flex-col lg:flex-row lg:items-start lg:justify-center">
            <div className="showResults w-full lg:w-9/12 flex flex-col items-start justify-center">
                <div className="title flex items-center justify-center">
                    <h4 className='text-2xl font-bold'>{FilteredProperties.length} وحدة </h4>
                    <h4 className='text-2xl font-bold mx-2'>-</h4>
                    <h4 className='text-2xl font-bold'>{FilteredProjects.length} مشروع</h4>
                </div>
                <div className="radios flex items-center justify-center my-4">
                    <div>
                        <input type="radio" id='proChoise' name="list" value={'project'} onChange={(e) => setChooseSelect(e.target.value)} />
                        <label htmlFor="proChoise">المشاريع</label>
                    </div>
                    <div>
                        <input type="radio" id='ptyChoise' name="list" value={'property'} onChange={(e) => setChooseSelect(e.target.value)} />
                        <label htmlFor="ptyChoise">الوحدات</label>
                    </div>
                </div>


                {ChooseSelect === 'project' ? (
                    <>
                        <div className="lists flex flex-wrap items-center justify-around w-full">
                            {FilteredProjects.map((project, index) => (
                                <motion.div
                                    key={project._id}
                                    custom={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index % 2 == 0 ? 0.1 : 0.2}}
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

                ) : (
                    <>
                        <div className="lists flex flex-wrap items-center justify-around w-full">
                            {FilteredProperties.map(property => (
                                <Link key={property._id} href={`/zones/${property.zone}/properties/${property.title}`} className="PropertyCard rounded-xl h-72 w-80 sm:w-96 m-4 hover:shadow-xl duration-500">
                                    <div className="relative image h-3/5 rounded-br-2xl rounded-tl-2xl overflow-hidden">
                                        <Image className='w-full h-full duration-700 hover:scale-125' src={property.image} width={340} height={340} alt={property.title} />
                                        <div className="popup absolute top-3 right-3 p-0.5 w-20 font-bold bg-mainColor text-bgColor rounded-xl flex items-center justify-center text-center">
                                            <h5>{property.category}</h5>
                                        </div>
                                    </div>
                                    <div className="data p-2 flex flex-col items-start justify-between h-2/5">
                                        <h2 className='text-sm sm:text-base font-semibold text-black' title={`${property.title}`}>{property.title.slice(0, 40)}..</h2>
                                        <div className="location flex items-center justify-start">
                                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" /></svg>
                                            <h6 className='text-gray-500 text-sm mr-2'>{property.location}</h6>
                                        </div>
                                        <div className="startBudget flex items-center justify-start">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">   <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />   <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z" clipRule="evenodd" /> </svg>

                                            <h6 className='text-gray-500 text-sm mr-2'>تبدأ من: <span className='text-black'>{insertDots(property.startBudget)} جنية مصري</span></h6>
                                        </div>
                                        <div className="spans flex text-xs sm:text-base items-center justify-center mt-2">
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
                            )).slice(0, endPpt)}
                        </div>
                        <>
                            <div className="btns my-2 w-full sm:w-auto flex items-center justify-center">
                                {FilteredProperties.length > endPpt && (<button onClick={() => ShowMoreBtnPpt()} className='btn'>عرض الكل</button>)}
                            </div>
                        </>
                    </>
                )}


            </div>

            {/* Filter Section */}
            <div className="filterInputs bg-white p-4 rounded-xl shadow-xl">
                <h1 className='text-2xl text-mainColor font-bold mb-4'>اختار ما يناسبك</h1>
                <form onSubmit={handleForm} onChange={() => {
                    setEndPpt(20)
                    setEndPrj(20)
                }}>
                    <div className="inputs">
                        <label htmlFor="state">المنطقة</label>
                        <div className="state">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" /></svg>
                            <select name="state" id="state" value={stateFtr} onChange={(e) => setStateFtr(e.target.value)}>
                                <option value="">عرض الكل</option>
                                {zones.map(zone => (
                                    <option key={zone._id} value={zone.name}>{zone.name}</option>
                                ))}
                            </select>
                        </div>
                        <label htmlFor="propertyType">نوع الوحدة</label>
                        <div className="property">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19.006 3.705a.75.75 0 1 0-.512-1.41L6 6.838V3a.75.75 0 0 0-.75-.75h-1.5A.75.75 0 0 0 3 3v4.93l-1.006.365a.75.75 0 0 0 .512 1.41l16.5-6Z" /><path fillRule="evenodd" d="M3.019 11.114 18 5.667v3.421l4.006 1.457a.75.75 0 1 1-.512 1.41l-.494-.18v8.475h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3v-9.129l.019-.007ZM18 20.25v-9.566l1.5.546v9.02H18Zm-9-6a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75H9Z" clipRule="evenodd" /></svg>
                            <select name="propertyType" id="propertyType" value={typePropertyFtr} onChange={(e) => setTypePropertyFtr(e.target.value)}>
                                <option value="">عرض الكل</option>
                                {ftrCtg.map((ctg, ind) => (
                                    <option key={ind} value={ctg}>{ctg}</option>
                                ))}
                            </select>
                        </div>
                        <label htmlFor="developer">المطور</label>
                        <div className="developer">
                            <svg className='w-5 h-5' viewBox="0 0 24 24" fill="currentColor"><path d="m11.379,24l3.091-4.415L.936,10.325l1.129-1.65,2.739,1.874.919-2.561c.289-.806.91-1.451,1.705-1.771.795-.32,1.689-.284,2.456.098l.47.177c1.148.572,2.022,1.552,2.461,2.759l1.425,4.143-1.881.684-1.424-4.143c-.039-.106-.094-.202-.143-.302l-1.407,3.923,6.232,4.393,3.474-4.962,4.957,11.015h-12.668Zm.121-19c1.381,0,2.5-1.119,2.5-2.5s-1.119-2.5-2.5-2.5-2.5,1.119-2.5,2.5,1.119,2.5,2.5,2.5ZM0,24h2.154l2.827-7.878-1.729-1.183L0,24Zm8,0h2v-4.443l-2-1.368v5.812Z" /></svg>
                            <select name="developer" id="developer" value={developerFtr} onChange={(e) => setDeveloperFtr(e.target.value)}>
                                <option value="">عرض الكل</option>
                                {developers.map(dev => (
                                    <option key={dev._id} value={dev.name}>{dev.name}</option>
                                ))}
                            </select>
                        </div>
                        <label htmlFor="area">المساحة</label>
                        <div className="area">
                            <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M10 12h-7l3 -3m0 6l-3 -3" />  <path d="M14 12h7l-3 -3m0 6l3 -3" />  <path d="M3 6v-3h18v3" />  <path d="M3 18v3h18v-3" /></svg>
                            <select name="area" id='area' value={area} onChange={(e) => setarea(e.target.value)}>
                                <option value="">عرض الكل</option>
                                <option value="100">اقل من 100 متر</option>
                                <option value="150">150 متر</option>
                                <option value="200">200 متر</option>
                                <option value="250">250 متر</option>
                                <option value="300">300 متر</option>
                                <option value="350">350 متر</option>
                                <option value="400">400 متر</option>
                                <option value="450">450 متر</option>
                                <option value="500">اكثر من 500 متر</option>
                            </select>
                        </div>
                        <label htmlFor="bgt">نطاق السعر</label>
                        <div id='bgt' className="budget flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">   <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />   <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z" clipRule="evenodd" /> </svg>
                            <div className="min">
                                <select name="Min Budget" value={min} onChange={(e) => setMin(e.target.value)}>
                                    <option value="">السعر الادني</option>
                                    <option value="1000000">1 مليون</option>
                                    <option value="2000000">2 مليون</option>
                                    <option value="3000000">3 مليون</option>
                                    <option value="4000000">4 مليون</option>
                                    <option value="5000000">5 مليون</option>
                                    <option value="6000000">6 مليون</option>
                                    <option value="7000000">7 مليون</option>
                                    <option value="8000000">8 مليون</option>
                                    <option value="9000000">9 مليون</option>
                                    <option value="10000000">10 مليون</option>
                                    <option value="15000000">15 مليون</option>
                                    <option value="20000000">20 مليون</option>
                                    <option value="25000000">25 مليون</option>
                                    <option value="30000000">30 مليون</option>
                                    <option value="35000000">35 مليون</option>
                                    <option value="40000000">40 مليون</option>
                                    <option value="45000000">45 مليون</option>
                                    <option value="50000000">50 مليون</option>
                                    <option value="75000000">75 مليون</option>
                                    <option value="100000000">100 مليون</option>
                                    <option value="150000000">150 مليون</option>
                                </select>
                            </div>
                            <span className='mx-2'>الى</span>
                            <div className="max">
                                <select name="Max Budget" value={max} onChange={(e) => setMax(e.target.value)}>
                                    <option value="">السعر الاقصى</option>
                                    <option value="2000000">2 مليون</option>
                                    <option value="3000000">3 مليون</option>
                                    <option value="4000000">4 مليون</option>
                                    <option value="5000000">5 مليون</option>
                                    <option value="6000000">6 مليون</option>
                                    <option value="7000000">7 مليون</option>
                                    <option value="8000000">8 مليون</option>
                                    <option value="9000000">9 مليون</option>
                                    <option value="10000000">10 مليون</option>
                                    <option value="15000000">15 مليون</option>
                                    <option value="20000000">20 مليون</option>
                                    <option value="25000000">25 مليون</option>
                                    <option value="30000000">30 مليون</option>
                                    <option value="35000000">35 مليون</option>
                                    <option value="40000000">40 مليون</option>
                                    <option value="45000000">45 مليون</option>
                                    <option value="50000000">50 مليون</option>
                                    <option value="75000000">75 مليون</option>
                                    <option value="100000000">100 مليون</option>
                                    <option value="150000000">150 مليون</option>
                                    <option value="200000000">200 مليون</option>
                                </select>
                            </div>
                        </div>
                        <label htmlFor="rooms">غرف نوم</label>
                        <div className="rooms">
                            <svg className="h-7 w-7" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M3 7v11m0 -4h18m0 4v-8a2 2 0 0 0 -2 -2h-8v6" />  <circle cx="7" cy="10" r="1" /></svg>
                            <select name="rooms" id='rooms' value={rooms} onChange={(e) => setRooms(e.target.value)}>
                                <option value="">عرض الكل</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <label htmlFor="bathrooms">الحمامات</label>
                        <div className="bathrooms">
                            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" /></svg>
                            <select name="bathrooms" id='bathrooms' value={bathrooms} onChange={(e) => setbathRooms(e.target.value)}>
                                <option value="">عرض الكل</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
