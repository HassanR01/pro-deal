import React from 'react'

const getLeads = async () => { 
    const apiUrl = process.env.API_URL
    try {
        const res = await fetch(`${apiUrl}/api/leads`)

        if (!res.ok) {
            throw new Error('Caonnot Catch the Leads Data')
        }

        return res.json()

    } catch (error) {
        console.log(error);
    }
}

export default async function LeadsList() {
    const { leads } = await getLeads()
    
    console.log(leads)

    const calculateDaysAgo = (date) => {
        const now = new Date();
        const createdDate = new Date(date);
        const diffTime = Math.abs(now - createdDate);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };



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
                            <th>التوقيت</th>
                            <th className='rounded-l-xl'>الرسالة</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads?.map((lead, ind) => (
                            <tr title={`${new Date(lead.createdAt).toLocaleDateString()}`} key={ind}>
                                <td className='max-w-20 text-sm'>{lead.name}</td>
                                <td className='max-w-20 text-sm'>{lead.phone}</td>
                                <td className='max-w-20 text-sm'>{lead.callMethod}</td>
                                <td className='max-w-20 text-sm' title={`${lead.inst}`}>{lead.inst?.slice(0,20)}..</td>
                                <td className='max-w-20 text-sm'>{lead.zone}</td>
                                <td className='max-w-20 text-sm'>{lead.minBudget} الي {lead.maxBudget}</td>
                                <td className='max-w-20 text-sm'>{calculateDaysAgo(lead.createdAt)} يوم</td>
                                <td className='max-w-20 text-sm'>{lead.message}</td>
                            </tr>
                        )).reverse()}
                    </tbody>
                </table>
            </div>
        </>
    )
}
