'use client'
import React, { useState } from 'react'

export default function AddDeveloper() {
    const [nameText, setname] = useState('')
    const [description, setdescription] = useState('')
    const [image, setimage] = useState('')
    const [projects, setprojects] = useState([])
    const [properties, setproperties] = useState([])
    const [alert, setAlert] = useState('')

    let name = nameText.trim()

    const handleAddDevloperForm = async (e) => {
        e.preventDefault()
        setAlert('يتم مراجعة البيانات..')
        if (nameText && description) {
            try {
                const res = await fetch(`/api/developers`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({ name, description, image })
                })

                if (res.ok) {
                    setAlert('تم إضافة المطور بنجاح')
                    setname('')
                    setdescription('')
                    setimage('')
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
            <form onSubmit={handleAddDevloperForm} onChange={() => setAlert('')}>
                <div className="inputs flex items-center justify-center flex-col">
                    <div className="mainData">
                        <input type="text" name="nameText" value={nameText} onChange={(e) => setname(e.target.value)} placeholder='اسم المطور' />
                        <input type="text" name="image" value={image} onChange={(e) => setimage(e.target.value)} placeholder='لوجو المطور من cloudinary' />
                    </div>
                    <div className="desc">
                        <textarea name="description" value={description} onChange={(e) => setdescription(e.target.value)} placeholder='وصف مبسط عن المطور'></textarea>
                    </div>
                    <div className="btns flex items-center justify-center flex-col">
                        <h5 className='text-xl text-red-500 font-semibold'>{alert}</h5>
                        <button type="submit" className='link'>إضافة مشروع</button>
                    </div>
                </div>
            </form>
        </>
    )
}
