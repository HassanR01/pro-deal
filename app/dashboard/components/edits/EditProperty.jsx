'use client'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation';
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
import React, { useRef, useState } from 'react'

export default function EditProperty({ zones, developers, property }) {
    const { title, category, image, description, location, position, bathrooms, bedrooms, area, startBudget, zone, developer } = property
    const [newtitle, setnewtitle] = useState(title)
    const [newcategory, setnewcategory] = useState(category)
    const [newimage, setnewimage] = useState(image)
    const [newlocation, setnewlocation] = useState(location)
    const [newdescription, setnewdescription] = useState(description)
    const [newzone, setnewzone] = useState(zone)
    const [newdeveloper, setnewdeveloper] = useState(developer)
    const [newbathrooms, setnewbathrooms] = useState(bathrooms)
    const [newbedrooms, setnewbedrooms] = useState(bedrooms)
    const [newarea, setnewarea] = useState(area)
    const [newstartBudget, setnewstartBudget] = useState(startBudget)
    const [x, setX] = useState(position[0])
    const [y, setY] = useState(position[1])
    const editor = useRef(null)
    let newposition = [+x, +y]

    const [alert, setAlert] = useState('')
    const router = useRouter()


    const handleEditPropertyForm = async (e) => {
        e.preventDefault()
        setAlert('يتم مراجعة البيانات')
        if (newtitle && newcategory && newimage && newlocation && newdescription && newzone && newdeveloper && newbathrooms && newbedrooms && newarea && newstartBudget && newposition.length === 2) {
            try {
                const res = await fetch(`/api/properties/${title}`, {
                    method: "PUT",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({ newtitle, newcategory, newimage, newdescription, newlocation, newposition, newbathrooms, newbedrooms, newarea, newstartBudget, newzone, newdeveloper })
                })
                if (res.ok) {
                    setAlert('تم تعديل الوحدة بنجاح')
                    router.push(`/dashboard/properties/${newtitle}`)
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            setAlert('كل البيانات مهمة')
        }
    }

    const DeleteProperty = async (id) => {
        if (confirm('هل تريد حذف هذه الوحدة!')) {
            try {
                const res = await fetch(`/api/properties/${id}`, {
                    method: "DELETE"
                })

                if (res.ok) {
                    setAlert('تم حذف الوحدة بنجاح')
                    router.push('/dashboard/properties')
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
            <form onSubmit={handleEditPropertyForm} className='w-full'>
                <div className="inputs flex items-center justify-center flex-col">
                    <div className="mainData">
                        <input type="text" name="title" value={newtitle} onChange={(e) => setnewtitle(e.target.value)} placeholder='اسم الوحدة' />
                        <input type="text" name="category" list="categories" value={newcategory} onChange={(e) => setnewcategory(e.target.value)} placeholder='نوع الوحدة' />
                        <datalist id='categories'>
                            <option value="سكني">سكني</option>
                            <option value="تجاري">تجاري</option>
                            <option value="إداري">إداري</option>
                            <option value="فندقي">فندقي</option>
                            <option value="مصيفي">مصيفي</option>
                        </datalist>
                        <input type="text" name="imgae" value={newimage} onChange={(e) => setnewimage(e.target.value)} placeholder='صورة للوحدة من Cloudinary' />
                    </div>
                    <div className="norData">
                        <input type="text" name="location" value={newlocation} onChange={(e) => setnewlocation(e.target.value)} placeholder='العنوان مكتوب' />
                        <select name="zone" value={newzone} onChange={(e) => setnewzone(e.target.value)}>
                            <option value="">اختر منطقة</option>
                            {zones.map(zone => (
                                <option key={zone._id} value={zone.name}>{zone.name}</option>
                            ))}
                        </select>

                        <select name="developer" value={newdeveloper} onChange={(e) => setnewdeveloper(e.target.value)}>
                            <option value="لحد ما نخلص بس">اختر المطور العقاري</option>
                            <option value="لحد ما نخلص بس">اختر المطور العقاري</option>
                            {developers.map(dev => (
                                <option key={dev._id} value={dev.name}>{dev.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="details">
                        <input type="number" name="area" value={newarea} onChange={(e) => setnewarea(e.target.value)} placeholder='المساحة' />
                        <input type="number" name="bedrooms" value={newbedrooms} onChange={(e) => setnewbedrooms(e.target.value)} placeholder='عدد الغرف' />
                        <input type="number" name="bathrooms" value={newbathrooms} onChange={(e) => setnewbathrooms(e.target.value)} placeholder='عدد الحمامات' />
                    </div>
                    <div className="positon">
                        <input type="number" step={0.00001} name="Xaxis Line" value={x} onChange={(e) => setX(e.target.value)} placeholder='دائرة عرض' />
                        <input type="number" step={0.00001} name="Xaxis Line" value={y} onChange={(e) => setY(e.target.value)} placeholder='خط طول' />
                        <input type="number" name="startBudget" value={newstartBudget} onChange={(e) => setnewstartBudget(e.target.value)} placeholder='بداية السعر في هذه الوحدة' />
                    </div>
                    <div className="description my-4">
                        <JoditEditor ref={editor} value={newdescription} onChange={e => setnewdescription(e)} />
                    </div>
                    <div className="btns flex items-center justify-center flex-col">
                        <h5 className='text-xl text-red-500 font-semibold'>{alert}</h5>
                        <div className="clicks  flex items-center justify-center flex-wrap">
                            <button type="submit" className='link'>تعديل الوحدة</button>
                            <div className='remove' onClick={() => DeleteProperty(title)}>حذف الوحدة</div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
