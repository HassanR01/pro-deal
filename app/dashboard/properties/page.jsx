import React from 'react'
import AddProperty from '../components/adding/AddProperty'
import PropertiesList from '../components/Lists/PropertiesList'

const getZones = async () => {
    const apiUrl = process.env.API_URL
    try {
        const res = await fetch(`${apiUrl}/api/zones`)

        if (!res.ok) {
            throw new Error('Connot fetch The Zones')
        }

        return res.json()

    } catch (error) {
        console.log(error);
    }
}

const getDevelopers = async () => {
    const apiUrl = process.env.API_URL
    try {
        const res = await fetch(`${apiUrl}/api/developers`)

        if (!res.ok) {
            throw new Error('Connot fetch The Developers')
        }

        return res.json()

    } catch (error) {
        console.log(error);
    }
}

export default async function page() {
    const { zones } = await getZones()
    const { developers } = await getDevelopers()
    return (
        <section>
            <h1>الوحدات</h1>
            <PropertiesList />
            <h1>إضافة وحدة</h1>
            <AddProperty zones={zones} developers={developers} />
        </section>
    )
}
