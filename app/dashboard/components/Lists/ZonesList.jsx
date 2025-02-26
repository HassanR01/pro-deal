import Link from 'next/link'
import React from 'react'

const getZones = async () => {
    const apiUrl = process.env.API_URL;
    
    try {
        const res = await fetch(`${apiUrl}/api/zones`);

        if (!res.ok) {
            throw new Error(`❌ Failed to fetch zones: ${res.status} ${res.statusText}`);
        }

        return await res.json();

    } catch (error) {
        console.error(`🚨 Error fetching zones:`, error.message);
        return [];
    }
};


export default async function ZonesList() {
    const { zones } = await getZones()
    return (
        <>
            <div className="zonesList w-full flex items-center justify-center flex-col p-5">
                <table>
                    <thead className='bg-mainColor text-bgColor'>
                        <tr>
                            <th className=' rounded-r-xl'>الاسم</th>
                            <th>العنوان</th>
                            <th>المشاريع</th>
                            <th>الوحدات</th>
                            <th className='rounded-l-xl'>تعديل</th>
                        </tr>
                    </thead>
                    <tbody>
                        {zones.map(zone => (
                            <tr key={zone._id}>
                                <td>{zone.name}</td>
                                <td>{zone.location}</td>
                                <td>{zone.projects.length} مشروع</td>
                                <td>{zone.properties.length} وحدة</td>
                                <td><Link href={`/dashboard/zones/${zone.name}`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">   <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />   <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" /> </svg></Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
