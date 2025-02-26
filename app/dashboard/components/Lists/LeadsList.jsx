import React from 'react'

const getLeads = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL; // استخدم NEXT_PUBLIC_API_URL لأنه يتم تشغيله على الواجهة الأمامية

    if (!apiUrl) {
        console.error("❌ API_URL is missing! Set NEXT_PUBLIC_API_URL in .env.local");
        return null;
    }

    try {
        const res = await fetch(`${apiUrl}/api/leads`);
        
        if (!res.ok) {
            throw new Error(`❌ Failed to fetch leads: ${res.status} ${res.statusText}`);
        }

        return await res.json();

    } catch (error) {
        console.error("🚨 Error fetching leads:", error.message);
        return null;
    }
};

export default async function LeadsList() {
    const { leads } = await getLeads()

    return (
        <>
            <div className="LeadsList w-full flex items-center justify-center flex-col p-5">
                <table>
                    <thead className='bg-mainColor text-bgColor'>
                        <tr>
                            <th className=' rounded-r-xl'>الاسم</th>
                            <th>رقم الهاتف</th>
                            <th>طريقة التواصل</th>
                            <th>الوحدة</th>
                            <th>المنطقة</th>
                            <th>الميزانية</th>
                            <th className='rounded-l-xl'>الرسالة</th>

                        </tr>
                    </thead>
                    <tbody>
                        {leads.map(lead => (
                            <tr key={lead._id}>
                                <td className='max-w-20 text-sm'>{lead.name}</td>
                                <td className='max-w-20 text-sm'>{lead.phone}</td>
                                <td className='max-w-20 text-sm'>{lead.callMethod}</td>
                                <td className='max-w-20 text-sm' title={`${lead.inst}`}>{lead.inst?.slice(0,20)}..</td>
                                <td className='max-w-20 text-sm'>{lead.zone}</td>
                                <td className='max-w-20 text-sm'>{lead.minBudget} الي {lead.maxBudget}</td>
                                <td className='max-w-20 text-sm'>{lead.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
