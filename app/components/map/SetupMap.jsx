'use client'
import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import MarkerIcon from '../../../public/marker-icon.png'
import MarkerShadow from '../../../node_modules/leaflet/dist/images/marker-shadow.png'
import "leaflet/dist/leaflet.css";
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function SetupMap({ locations, units, developers }) {
    const [stateFtr, setStateFtr] = useState('')
    const [min, setMin] = useState()
    const [max, setMax] = useState()
    const [typePropertyFtr, setTypePropertyFtr] = useState('')
    const [developerFtr, setDeveloperFtr] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
    }, [])

    const State = locations.filter(zone => {
        const ZoneMatched = !stateFtr || zone.name === stateFtr
        return ZoneMatched
    })

    let avgX = 0
    let avgY = 0


    State.map(location => {
        avgX = avgX + location.position[0]
        avgY = avgY + location.position[1]
    })

    // Units Type
    let types = []
    units.forEach(unit => {
        types.push(unit.category)
    })
    const ftrCtg = types.filter((unit, index) => types.indexOf(unit) === index)

    const handleForm = (e) => {
        e.preventDefault()
    }

    if (loading) {
        return null
    } else {

        return (
            <>
                <MapContainer center={[avgX / State.length, avgY / State.length]} zoom={7} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://https://rockaidev.vercel.app">Rockai Dev</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {State.map((location, ind) => (
                        <Marker key={ind} position={location.position} icon={
                            new L.Icon({
                                iconUrl: MarkerIcon.src,
                                iconRetinaUrl: MarkerIcon.src,
                                iconSize: [25, 41],
                                iconAnchor: [12.5, 41],
                                popupAnchor: [0, -41],
                                shadowUrl: MarkerShadow.src,
                                shadowSize: [41, 41],
                            })
                        }>
                            <Popup>
                                <Link className='w-full h-full flex flex-col items-center' href={`/zones/${location.name}`}>
                                    <Image src={location.image ? location.image : '/city.png'} width={100} height={100} alt='city Icon' className='rounded-xl' />
                                    <h2 className=' text-textColor font-mainFont font-bold'>{location.name}</h2>
                                    <div className="flex flex-row items-center justify-center my-2 font-mainFont font-bold">
                                        <div className="flex flex-col items-center justify-center mx-4">
                                            <h3 className='text-sm'>{location.projects.length}</h3>
                                            <h4 className='text-sm'>مشروع</h4>
                                        </div>
                                        <div className="flex flex-col items-center justify-center mx-4">
                                            <h3 className='text-sm'>{location.properties.length}</h3>
                                            <h4 className='text-sm'>وحدة</h4>
                                        </div>
                                    </div>
                                </Link>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>

                {/* Filter Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="filterContainer w-full flex justify-center items-center absolute lg:-bottom-20 left-0 z-20"
                >

                    <div className="FilterForm w-10/12 bg-bgColor rounded-lg p-2 flex items-center justify-center flex-col shadow-xl">
                        <h2 className='w-full text-right font-bold text-2xl mb-2 text-mainColor'>نظام بحث برو ديل</h2>
                        <form onSubmit={handleForm} className=''>
                            <div className="inputs">
                                <div className="">
                                    <div className="state">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" /></svg>
                                        <select id="state" name="state" value={stateFtr} onChange={(e) => setStateFtr(e.target.value)}>
                                            <option value="">المنطقة</option>
                                            {locations.map((zone, ind) => (
                                                <option key={ind} value={zone.name}>{zone.name}</option>
                                            ))}
                                        </select>
                                        <label htmlFor="state" className=' hidden'>اختار</label>
                                    </div>
                                    <div className="property">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19.006 3.705a.75.75 0 1 0-.512-1.41L6 6.838V3a.75.75 0 0 0-.75-.75h-1.5A.75.75 0 0 0 3 3v4.93l-1.006.365a.75.75 0 0 0 .512 1.41l16.5-6Z" /><path fillRule="evenodd" d="M3.019 11.114 18 5.667v3.421l4.006 1.457a.75.75 0 1 1-.512 1.41l-.494-.18v8.475h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3v-9.129l.019-.007ZM18 20.25v-9.566l1.5.546v9.02H18Zm-9-6a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75H9Z" clipRule="evenodd" /></svg>
                                        <select id="propertyType" name="propertyType" value={typePropertyFtr} onChange={(e) => setTypePropertyFtr(e.target.value)}>
                                            <option value="">نوع الوحدة</option>
                                            {ftrCtg.map((ctg, ind) => (
                                                <option key={ind} value={ctg}>{ctg}</option>
                                            ))}
                                        </select>
                                        <label htmlFor="propertyType" className=' hidden'>اختار</label>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="developer">
                                        <svg className='w-5 h-5' viewBox="0 0 24 24" fill="currentColor"><path d="m11.379,24l3.091-4.415L.936,10.325l1.129-1.65,2.739,1.874.919-2.561c.289-.806.91-1.451,1.705-1.771.795-.32,1.689-.284,2.456.098l.47.177c1.148.572,2.022,1.552,2.461,2.759l1.425,4.143-1.881.684-1.424-4.143c-.039-.106-.094-.202-.143-.302l-1.407,3.923,6.232,4.393,3.474-4.962,4.957,11.015h-12.668Zm.121-19c1.381,0,2.5-1.119,2.5-2.5s-1.119-2.5-2.5-2.5-2.5,1.119-2.5,2.5,1.119,2.5,2.5,2.5ZM0,24h2.154l2.827-7.878-1.729-1.183L0,24Zm8,0h2v-4.443l-2-1.368v5.812Z" /></svg>
                                        <select id="developer" name="developer" value={developerFtr} onChange={(e) => setDeveloperFtr(e.target.value)}>
                                            <option value="">المطور العقاري</option>
                                            {developers.map((dev, ind) => (
                                                <option key={ind} value={dev.name}>{dev.name}</option>
                                            ))}
                                        </select>
                                        <label htmlFor="developer" className=' hidden'>اختار</label>
                                    </div>
                                    <div className="budget flex items-center justify-between">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">   <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />   <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z" clipRule="evenodd" /> </svg>
                                        <div className="min">
                                            <select id="Min" name="Min Budget" value={min} onChange={(e) => setMin(e.target.value)}>
                                                <option value="">اقل مبلغ</option>
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
                                            <label htmlFor="Min" className=' hidden'>اختار</label>
                                        </div>
                                        <span className='mx-2'>الى</span>
                                        <div className="max">
                                            <select id="Max" name="Max Budget" value={max} onChange={(e) => setMax(e.target.value)}>
                                                <option value="">اكبر مبلغ</option>
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
                                            <label htmlFor="Max" className=' hidden'>اختار</label>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="btns bg-mainColor hover:bg-green-500 duration-700 flex text-lg items-center justify-center rounded-full cursor-pointer m-1">
                                <Link href={{
                                    pathname: '/finder',
                                    query: {
                                        stateFtr: stateFtr,
                                        min: min,
                                        max: max,
                                        typePropertyFtr: typePropertyFtr,
                                        developerFtr: developerFtr
                                    }
                                }} className='link w-full h-full py-2 flex text-base items-center justify-center px-6 text-bgColor'><svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mx-1"><path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" /> </svg>ابحث عن وحدتك</Link>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </>
        )
    }
}
