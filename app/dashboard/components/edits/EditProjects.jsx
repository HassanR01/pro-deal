'use client'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation';
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
import React, { useRef, useState } from 'react'

export default function EditProjects({ project, zones, developers }) {
    const { title, image, startBudget, description, developer, zone, location, position } = project
    const [newtitle, setnewtitle] = useState(title)
    const [newimage, setnewimage] = useState(image)
    const [newstartBudget, setnewstartBudget] = useState(startBudget)
    const [newdescription, setnewdescription] = useState(description)
    const [newdeveloper, setnewdeveloper] = useState(developer)
    const [newzone, setnewzone] = useState(zone)
    const [newlocation, setnewlocation] = useState(location)
    const [x, setX] = useState(position[0])
    const [y, setY] = useState(position[1])
    const [alert, setAlert] = useState('')
    const editor = useRef(null)
    let newposition = [+x, +y]

    const router = useRouter()

    const handleEditProjectForm = async (e) => {
        e.preventDefault()
        setAlert('يتم مراجعة البيانات.. ')
        if (newtitle && newimage && newstartBudget && newdescription && newdeveloper && newzone && newlocation && newposition) {
            try {
                const res = await fetch(`/api/projects/${title}`, {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({ newtitle, newimage, newstartBudget, newdescription, newdeveloper, newzone, newlocation, newposition })
                })

                if (res.ok) {
                    setAlert('تم تعديل المشروع بنجاح')
                    router.push(`/dashboard/projects/${newtitle}`)
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            setAlert('كل البيانات مهمة !')
        }
    }

    const DeleteProject = async (id) => {
        if (confirm('هل تريد حذف هذا المشروع!')) {
            try {
                const res = await fetch(`/api/projects/${id}`, {
                    method: "DELETE"
                })

                if (res.ok) {
                    setAlert('تم حذف المشروع بنجاح')
                    router.push('/dashboard/projects')
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
            <form onSubmit={handleEditProjectForm} onChange={() => setAlert('')}>
                <div className="inputs flex items-center justify-center flex-col">
                    <div className="mainData">
                        <input type="text" name="title" value={newtitle} onChange={(e) => setnewtitle(e.target.value)} placeholder='اسم المشروع' />
                        <input type="text" name="image" value={newimage} onChange={(e) => setnewimage(e.target.value)} placeholder='صورة للمشروع من Cloudinary' />
                    </div>
                    <div className="secData">
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
                    <div className="positon">
                        <input type="number" step={0.00001} name="Xaxis Line" value={x} onChange={(e) => setX(e.target.value)} placeholder='دائرة عرض' />
                        <input type="number" step={0.00001} name="Xaxis Line" value={y} onChange={(e) => setY(e.target.value)} placeholder='خط طول' />
                        <input type="number" name="startBudget" value={newstartBudget} onChange={(e) => setnewstartBudget(e.target.value)} placeholder='بداية الاسعار في هذا المشروع' />
                    </div>

                    <div className="description my-2">
                        <JoditEditor ref={editor} value={newdescription} onChange={e => setnewdescription(e)} />
                    </div>
                </div>
                <div className="btns flex items-center justify-center flex-col">
                    <h5 className='text-xl text-red-500 font-semibold'>{alert}</h5>

                    <div className="clicks flex items-center justify-center flex-wrap">
                        <button type="submit" className='link'>تعديل المشروع</button>
                        <div className='remove' onClick={() => DeleteProject(title)}>حذف المشروع</div>
                    </div>
                </div>
            </form>
        </>
    )
}
