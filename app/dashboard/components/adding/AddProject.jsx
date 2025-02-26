'use client'
import dynamic from 'next/dynamic'
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
import React, { useRef, useState } from 'react'

export default function AddProject({ zones, developers }) {
    const [titleText, settitle] = useState('')
    const [image, setimage] = useState('')
    const [x, setX] = useState()
    const [y, setY] = useState()
    const [startBudget, setstartBudget] = useState()
    const [description, setdescription] = useState('')
    const [developer, setdeveloper] = useState('')
    const [zone, setzone] = useState('')
    const [location, setlocation] = useState('')
    const [alert, setAlert] = useState('')
    const editor = useRef(null)
    let position = [+x, +y]

    let title = titleText.trim()

    // Zone Matched
    const Zone = zones.filter(zoneWanted => {
        const Matched = !zone || zoneWanted.name === zone
        return Matched
    })
    const [zoneprojects, setzoneprojects] = useState(Zone[0].projects)
    let Zprojects = [...zoneprojects, title]

    // Developer Matched
    const Developer = developers.filter(developerWanted => {
        const Matched = !developer || developerWanted.name === developer
        return Matched
    })
    const [devprojects, setprojects] = useState(Developer[0].projects)
    let Dprojects = [...devprojects, title]

    const AddPrjectForm = async (e) => {
        e.preventDefault()
        setAlert('يتم مراجعة البيانات.. ')
        if (titleText && startBudget && description && developer && zone && location) {
            try {
                const res = await fetch(`/api/projects`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({ title, image, startBudget, description, developer, zone, location, position })
                })

                const res2 = await fetch(`/api/zones/${zone}`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ Zprojects })
                })

                const res3 = await fetch(`/api/developers/${developer}`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ Dprojects })
                })


                if (res.ok && res2.ok && res3.ok) {
                    setAlert('تم إضافة المشروع بنجاح')
                    settitle('')
                    setimage('')
                    setstartBudget('')
                    setdescription('')
                    setdeveloper('')
                    setzone('')
                    setlocation('')
                    setX(0)
                    setY(0)
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            setAlert('كل البيانات مهمة !')
        }
    }

    return (
        <>
            <form onSubmit={AddPrjectForm} onChange={() => setAlert('')}>
                <div className="inputs flex items-center justify-center flex-col">
                    <div className="mainData">
                        <input type="text" name="titleText" value={titleText} onChange={(e) => settitle(e.target.value)} placeholder='اسم المشروع' />
                        <input type="text" name="image" value={image} onChange={(e) => setimage(e.target.value)} placeholder='صورة للمشروع من Cloudinary' />
                    </div>
                    <div className="secData">
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
                    <div className="positon">
                        <input type="number" step={0.00001} name="Xaxis Line" value={x} onChange={(e) => setX(e.target.value)} placeholder='دائرة عرض' />
                        <input type="number" step={0.00001} name="Xaxis Line" value={y} onChange={(e) => setY(e.target.value)} placeholder='خط طول' />
                        <input type="number" name="startBudget" value={startBudget} onChange={(e) => setstartBudget(e.target.value)} placeholder='بداية الاسعار في هذا المشروع' />
                    </div>

                    <div className="description">

                        <JoditEditor ref={editor} value={description} onChange={e => setdescription(e)} />
                    </div>
                </div>
                <div className="btns flex items-center justify-center flex-col">
                    <h5 className='text-xl text-red-500 font-semibold'>{alert}</h5>
                    <button type="submit" className='link'>إضافة مشروع</button>
                </div>
            </form>
        </>
    )
}
