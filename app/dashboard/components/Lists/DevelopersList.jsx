import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const getDevelopers = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL; // يجب استخدام NEXT_PUBLIC_API_URL لأنه يظهر في الواجهة الأمامية

    if (!apiUrl) {
        console.error("❌ API_URL is missing! Set NEXT_PUBLIC_API_URL in .env.local");
        return null;
    }

    try {
        const res = await fetch(`${apiUrl}/api/developers`, {
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            throw new Error(`❌ Failed to fetch developers: ${res.status} ${res.statusText}`);
        }

        return await res.json();

    } catch (error) {
        console.error("🚨 Error fetching developers:", error.message);
        return null;
    }
};

export default async function DevelopersList() {
    const { developers } = await getDevelopers()

    return (
        <>
            <div className="DeveloperList w-full flex items-center justify-center flex-col p-5">
                <table>
                    <thead className='bg-mainColor text-bgColor'>
                        <tr>
                            <th className=' rounded-r-xl'>الاسم</th>
                            <th>الوصف</th>
                            <th>المشاريع</th>
                            <th>الوحدات</th>
                            <th className='rounded-l-xl'>تعديل</th>
                        </tr>
                    </thead>
                    <tbody>
                        {developers.map(dev => (
                            <tr key={dev._id}>
                                <td className='flex items-center justify-start'>
                                    <Image className='ml-2 rounded-lg p-2' src={dev.image} width={80} height={80} alt={dev.name} />
                                    <h3 className='text-lg font-bold max-w-60'>{dev.name}</h3>
                                </td>
                                <td className='text-sm' title={`${dev.description}`}>{dev.description.slice(0, 51)}..</td>
                                <td>{dev.projects.length} مشروع</td>
                                <td>{dev.properties.length} وحدة</td>
                                <td><Link href={`/dashboard/developers/${dev.name}`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">   <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />   <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" /> </svg></Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
