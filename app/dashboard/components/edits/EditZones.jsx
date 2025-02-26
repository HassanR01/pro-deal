'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function EditZones({ zone }) {

    const { name, image, location, position, projects, properties } = zone
    const [newname, setname] = useState(name)
    const [newimage, setimage] = useState(image)
    const [newlocation, setlocation] = useState(location)
    const [x, setX] = useState(position[0])
    const [y, setY] = useState(position[1])
    const [newprojects, setprojects] = useState(projects)
    const [newproperties, setproperties] = useState(properties)
    const [alert, setAlert] = useState('')
    let newposition = [+x, +y]

    const router = useRouter()

    const handleEditZone = async (e) => {
        e.preventDefault()
        setAlert('يتم مراجعة البيانات..')
        if (newname && newlocation && newposition.length === 2) {
            try {
                const res = await fetch(`/api/zones/${name}`, {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({ newname, newimage, newlocation, newposition, newprojects, newproperties })
                })

                if (res.ok) {
                    setAlert('تم التعديل بنجاح')
                    router.push(`/dashboard/zones/${newname}`)
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            setAlert('كل البيانات مهمة')
        }
    }

    const DeleteZone = async (id) => {
        if (confirm('هل تريد حذف هذه المنطقة!')) {
            try {
                const res = await fetch(`/api/zones/${id}`, {
                    method: "DELETE"
                })

                if (res.ok) {
                    setAlert('تم حذف المنطقة بنجاح')
                    router.push('/dashboard/zones')
                } else {
                    setAlert('مشكلة تقنية')
                }

            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <>
            <form onSubmit={handleEditZone} onChange={() => setAlert()}>
                <div className="data">
                    <input type="text" name='zone name' value={newname} onChange={(e) => setname(e.target.value)} placeholder='اسم المنطقة' />
                    <input type="text" name="location" value={newlocation} onChange={(e) => setlocation(e.target.value)} placeholder='العنوان مكتوب' />
                    <input type="text" name="image" value={newimage} onChange={(e) => setimage(e.target.value)} placeholder='لينك الصورة من Cloudinary' />
                </div>
                <div className="positon">
                    <input type="number" step={0.00001} name="Xaxis Line" value={x} onChange={(e) => setX(e.target.value)} placeholder='دائرة عرض' />
                    <input type="number" step={0.00001} name="Xaxis Line" value={y} onChange={(e) => setY(e.target.value)} placeholder='خط طول' />
                </div>
                <div className="btns flex items-center justify-center flex-col">
                    <h5 className='text-xl text-red-500 font-semibold'>{alert}</h5>
                    <div className="clicks  flex items-center justify-center flex-wrap">
                        <button type="submit" className='link'>تعديل المنطقة</button>
                        <div className='remove' onClick={() => DeleteDeveloper(name)}>حذف المنطقة</div>
                    </div>
                </div>
            </form>
        </>
    )
}
