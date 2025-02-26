'use client'
import dynamic from 'next/dynamic'
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
import React, { useRef, useState } from 'react'

export default function AddProperty({ zones, developers }) {
    const [titleText, settitle] = useState('')
    const [category, setcategory] = useState('')
    const [image, setimage] = useState('')
    const [location, setlocation] = useState('')
    const [description, setdescription] = useState('')
    const [zone, setzone] = useState('')
    const [developer, setdeveloper] = useState('')
    const [bathrooms, setbathrooms] = useState()
    const [bedrooms, setbedrooms] = useState()
    const [area, setarea] = useState()
    const [startBudget, setstartBudget] = useState()
    const editor = useRef(null)
    const [x, setX] = useState()
    const [y, setY] = useState()
    let position = [+x, +y]

    let title = titleText.trim()

    // Zone Matched
    const Zone = zones.filter(zoneWanted => {
        const Matched = !zone || zoneWanted.name === zone
        return Matched
    })
    const [zoneProperties , setzoneProperties] = useState(Zone[0].properties)
    let Zproperties = [...zoneProperties, title]
    
    // Developer Matched
    const Developer = developers.filter(developerWanted => {
        const Matched = !developer || developerWanted.name === developer
        return Matched
    }) 
    const [devProperties, setprojects] = useState(Developer[0].properties)
    let Dproperties = [...devProperties, title]


    const [alert, setAlert] = useState('')

    const handleAddPropertyForm = async (e) => {
        e.preventDefault()
        setAlert('يتم مراجعة البيانات')
        if (titleText && category && location && description && zone && developer && bathrooms && bedrooms && area && startBudget ) {
            try {
                const res = await fetch(`/api/properties`, {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({ title, category, image, location, description, position, bathrooms, bedrooms, area, startBudget, zone, developer })
                })

                const res2 = await fetch(`/api/zones/${zone}`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ Zproperties })
                })

                const res3 = await fetch(`/api/zones/${developer}`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ Dproperties })
                })


                if (res.ok && res2.ok && res3.ok) {
                    setAlert('تم إضافة الوحدة بنجاح')
                    settitle('')
                    setcategory('')
                    setimage('')
                    setlocation('')
                    setdescription('')
                    setzone('')
                    setdeveloper('')
                    setbathrooms(0)
                    setbedrooms(0)
                    setarea(0)
                    setstartBudget(0)
                    setX(0)
                    setY(0)
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            setAlert('كل البيانات مهمة')
        }
    }

    return (
        <>
            <form onSubmit={handleAddPropertyForm} className='w-full'>
                <div className="inputs flex items-center justify-center flex-col">
                    <div className="mainData">
                        <input type="text" name="titleText" value={titleText} onChange={(e) => settitle(e.target.value)} placeholder='اسم الوحدة' />
                        <select name="category" list="categories" value={category} onChange={(e) => setcategory(e.target.value)} placeholder='نوع الوحدة' id='categories'>
                            <option value="">نوع الوحدة</option>
                            <option value="شقة">شقة</option>
                            <option value="فيلا مستقلة">فيلا مستقلة</option>
                            <option value="فيلا توين هاوس">فيلا توين هاوس</option>
                            <option value="فيلا تاون هاوس">فيلا تاون هاوس</option>
                            <option value="دوبلكس">دوبلكس</option>
                            <option value="بنتهاوس">بنتهاوس</option>
                            <option value="شالية">شالية</option>
                            <option value="كابينة">كابينة</option>
                            <option value="استوديو">استوديو</option>
                            <option value="عيادة">عيادة</option>
                            <option value="مكتب إداري">مكتب إداري</option>
                            <option value="محل تجاري">محل تجاري</option>
                        </select>
                        <input type="text" name="imgae" value={image} onChange={(e) => setimage(e.target.value)} placeholder='صورة للوحدة من Cloudinary' />
                    </div>
                    <div className="norData">
                        <input type="text" name="location" value={location} onChange={(e) => setlocation(e.target.value)} placeholder='العنوان مكتوب' />
                        <select name="zone" value={zone} onChange={(e) => setzone(e.target.value)}>
                            <option value="">اختر منطقة</option>
                            {zones.map(zone => (
                                <option key={zone._id} value={zone.name}>{zone.name}</option>
                            ))}
                        </select>

                        <select name="developer" value={developer} onChange={(e) => setdeveloper(e.target.value)}>
                            <option value="">اختر المطور العقاري</option>
                            {developers.map(dev => (
                                <option key={dev._id} value={dev.name}>{dev.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="details">
                        <input type="number" name="area" value={area} onChange={(e) => setarea(e.target.value)} placeholder='المساحة' />
                        <input type="number" name="bedrooms" value={bedrooms} onChange={(e) => setbedrooms(e.target.value)} placeholder='عدد الغرف' />
                        <input type="number" name="bathrooms" value={bathrooms} onChange={(e) => setbathrooms(e.target.value)} placeholder='عدد الحمامات' />
                    </div>
                    <div className="positon">
                        <input type="number" step={0.00001} name="Xaxis Line" value={x} onChange={(e) => setX(e.target.value)} placeholder='دائرة عرض' />
                        <input type="number" step={0.00001} name="Xaxis Line" value={y} onChange={(e) => setY(e.target.value)} placeholder='خط طول' />
                        <input type="number" name="startBudget" value={startBudget} onChange={(e) => setstartBudget(e.target.value)} placeholder='بداية السعر في هذه الوحدة' />
                    </div>
                    <div className="description my-4">
                        <JoditEditor ref={editor} value={description} onChange={e => setdescription(e)} />
                    </div>
                    <div className="btns flex items-center justify-center flex-col">
                        <h5 className='text-xl text-red-500 font-semibold'>{alert}</h5>
                        <button type="submit" className='link'>إضافة الوحدة</button>
                    </div>
                </div>
            </form>
        </>
    )
}
