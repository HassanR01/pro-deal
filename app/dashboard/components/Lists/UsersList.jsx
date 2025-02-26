import Image from 'next/image'
import React from 'react'
import EditUserRole from '../edits/EditUserRole'

const getUsers = async () => {
    const apiUrl = process.env.API_URL; // تأكد من استخدام NEXT_PUBLIC حتى يكون متاحًا في الواجهة الأمامية

    if (!apiUrl) {
        console.error("❌ API_URL is missing! Set API_URL in .env");
        return null;
    }

    try {
        const res = await fetch(`${apiUrl}/api/users`);

        if (!res.ok) {
            throw new Error(`❌ Failed to fetch users: ${res.status} ${res.statusText}`);
        }

        return await res.json();

    } catch (error) {
        console.error(`🚨 Error fetching users:`, error.message);
        return [];
    }
};

export default async function UsersList() {
    const { users } = await getUsers()
    return (
        <>
            <div className="usersList w-full flex items-center justify-center flex-col p-5">
                <table>
                    <thead className='bg-mainColor text-bgColor'>
                        <tr>
                            <th className=' rounded-r-xl'>الاسم</th>
                            <th>الايميل</th>
                            <th>الصلاحية</th>
                            <th className='rounded-l-xl'>تعديل</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td className='flex items-center justify-start'>
                                    <Image className='ml-2 rounded-lg' src={user.image} width={50} height={50} alt={user.title} />
                                    <h3 className='text-xl font-bold max-w-60'>{user.name}</h3>
                                </td>
                                <td title={`${user.email}`}>{user.email?.slice(0, 11)}..</td>
                                <td>{user.role}</td>
                                <EditUserRole user={user} />
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
