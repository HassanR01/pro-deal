'use client'
import React, { useState } from 'react'

export default function EditUserRole({ user }) {
    const { role, name, email, image } = user
    const [newrole, setnewrole] = useState(role)

    const handleChangeRole = async (e) => {
        e.preventDefault()
        if (role === 'visitor' && newrole !== 'visitor') {
            try {
                const res = await fetch(`/api/users/${email}`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ newrole })
                })

                const res2 = await fetch(`/api/admins`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ name, email })
                })

                if (res.ok && res2.ok) {
                    location.reload()
                }

            } catch (error) {
                console.log(error);
            }
        } else {
            if (role !== 'visitor' && newrole !== 'visitor') {
                const res = await fetch(`/api/users/${email}`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ newrole })
                })

                if (res.ok) {
                    location.reload()
                }
            } else {
                const res = await fetch(`/api/users/${email}`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ newrole })
                })
                
                const res2 = await fetch(`/api/admins/${email}`, {
                    method: "DELETE"
                })

                if (res.ok && res2.ok) {
                    location.reload()
                }
            }
        }
    }

    return (
        <td>
            <form onSubmit={handleChangeRole} className='flex flex-row items-center justify-center'>
                <h4>{role === newrole ? "من" : "الي"}</h4>
                <select className='w-30' name="role" value={newrole} onChange={(e) => setnewrole(e.target.value)}>
                    <option value="Admin">مسؤول</option>
                    <option value="moderator">مدير</option>
                    <option value="writer">كاتب</option>
                    <option value="visitor">زائر</option>
                </select>
                <button className='btn'>تغيير</button>
            </form>
        </td>
    )
}
