'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function EditDeveloper({ developer }) {
    const { name, description, image, projects, properties } = developer
    const [newname, setnewname] = useState(name)
    const [newdescription, setnewdescription] = useState(description)
    const [newimage, setnewimage] = useState(image)
    const [newprojects, setnewprojects] = useState(projects)
    const [newproperties, setnewproperties] = useState(properties)
    const [alert, setAlert] = useState('')
    const router = useRouter()

    const handleEditDevloperForm = async (e) => {
        e.preventDefault()
        setAlert('يتم مراجعة البيانات..')
        if (newname && newdescription && newimage) {
            try {
                const res = await fetch(`/api/developers/${name}`, {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({ newname, newdescription, newimage, newprojects, newproperties })
                })

                if (res.ok) {
                    setAlert('تم تعديل المطور بنجاح')
                    router.push(`/dashboard/developers/${newname}`)
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

    const DeleteDeveloper = async (id) => {
        if (confirm('هل تريد حذف هذا المطور!')) {
            try {
                const res = await fetch(`/api/developers/${id}`, {
                    method: "DELETE"
                })

                if (res.ok) {
                    setAlert('تم حذف المطور بنجاح')
                    router.push('/dashboard/developers')
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
            <form onSubmit={handleEditDevloperForm} onChange={() => setAlert('')}>
                <div className="inputs flex items-center justify-center flex-col">
                    <div className="mainData">
                        <input type="text" name="name" value={newname} onChange={(e) => setnewname(e.target.value)} placeholder='اسم المطور' />
                        <input type="text" name="image" value={newimage} onChange={(e) => setnewimage(e.target.value)} placeholder='لوجو المطور من cloudinary' />
                    </div>
                    <div className="desc">
                        <textarea name="description" value={newdescription} onChange={(e) => setnewdescription(e.target.value)} placeholder='وصف مبسط عن المطور'></textarea>
                    </div>
                    <div className="btns flex items-center justify-center flex-col">
                        <h5 className='text-xl text-red-500 font-semibold'>{alert}</h5>
                        <div className="clicks flex items-center justify-center flex-wrap">
                            <button type="submit" className='link'>تعديل المشروع</button>
                            <div className='remove' onClick={() => DeleteDeveloper(name)}>حذف المشروع</div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
