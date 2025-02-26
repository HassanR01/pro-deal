'use client'
import React, { useState } from 'react'

export default function AddZoneForm() {
    const [nameText, setname] = useState("")
    const [image, setimage] = useState('')
    const [location, setlocation] = useState("")
    const [x, setX] = useState()
    const [y, setY] = useState()
    const [projects, setprojects] = useState([])
    const [properties, setproperties] = useState([])
    const [alert, setAlert] = useState('')
    let position = [+x, +y]

    let name = nameText.trim()

    const handleAddZone = async (e) => {
        e.preventDefault()
        setAlert("يتم مراجعة البيانات..")
        if (nameText && location && position.length === 2) {
            try {
                const res = await fetch(`/api/zones`, {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({ name, image, location, position, projects, properties })
                })

                if (res.ok) {
                    setAlert('تم إضافة المنطقة بنجاح')
                    setname('')
                    setlocation('')
                    setX(0)
                    setY(0)
                } else {
                    setAlert('مشكلة تقنية')
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
            <form onSubmit={handleAddZone} onChange={() => setAlert()}>
                <div className="data">
                    <input type="text" name='zone nameText' value={nameText} onChange={(e) => setname(e.target.value)} placeholder='اسم المنطقة' />
                    <input type="text" name="location" value={location} onChange={(e) => setlocation(e.target.value)} placeholder='العنوان مكتوب' />
                    <input type="text" name="image" value={image} onChange={(e) => setimage(e.target.image)} placeholder='لينك الصورة من Cloudinary'/>
                </div>
                <div className="positon">
                    <input type="number" step={0.00001} name="Xaxis Line" value={x} onChange={(e) => setX(e.target.value)} placeholder='دائرة عرض' />
                    <input type="number" step={0.00001} name="Xaxis Line" value={y} onChange={(e) => setY(e.target.value)} placeholder='خط طول' />
                </div>
                <div className="btns flex items-center justify-center flex-col">
                    <h5 className='text-xl text-red-500 font-semibold'>{alert}</h5>
                    <button type="submit" className='link'>إضافة منطقة</button>
                </div>
            </form>
        </>
    )
}
