import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const getProperties = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL; // تأكد من ضبط NEXT_PUBLIC لكي يعمل في الواجهة الأمامية

    if (!apiUrl) {
        console.error("❌ API_URL is missing! Set NEXT_PUBLIC_API_URL in .env");
        return null;
    }

    try {
        const res = await fetch(`${apiUrl}/api/properties`);

        if (!res.ok) {
            throw new Error(`❌ Failed to fetch properties: ${res.status} ${res.statusText}`);
        }

        return await res.json();

    } catch (error) {
        console.error("🚨 Error fetching properties:", error.message);
        return [];
    }
};

export default async function PropertiesList() {
    const { properties } = await getProperties()
    // { title, category, image, description, position, bathrooms, bedrooms, area, startBudget, zone, developer }
  return (
      <>
          <div className="propertiesList w-full flex items-center justify-center flex-col p-5">
              <table>
                  <thead className='bg-mainColor text-bgColor'>
                      <tr>
                          <th className=' rounded-r-xl'>الاسم</th>
                          <th>المنطقة</th>
                          <th>العنوان</th>
                          <th>المطور العقاري</th>
                          <th className='rounded-l-xl'>تعديل</th>
                      </tr>
                  </thead>
                  <tbody>
                      {properties.map(property => (
                          <tr key={property._id}>
                              <td className='flex items-start justify-start'>
                                  <Image className='ml-2 rounded-lg' src={property.image} width={80} height={80} alt={property.title} />
                                  <h3 className='text-sm max-w-60'>{property.title}</h3>
                              </td>
                              <td>{property.zone}</td>
                              <td>{property.location}</td>
                              <td>{property.developer}</td>
                              <td><Link href={`/dashboard/properties/${property.title}`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">   <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />   <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" /> </svg></Link></td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </>
  )
}
