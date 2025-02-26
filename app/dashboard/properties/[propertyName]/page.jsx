import React from 'react'
import EditProperty from '../../components/edits/EditProperty'


const getProperty = async (id) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    console.log(apiUrl)
    try {
        const res = await fetch(`${apiUrl}/api/properties/${id}`)

        if (!res.ok) {
            throw new Error('Connot fetch The Property')
        }

        return res.json()

    } catch (error) {
        console.log(error);
    }
}

const getZones = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
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
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
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

export default async function page({ params }) {
    const { propertyName } = params
    const { property } = await getProperty(propertyName)
    const { zones } = await getZones()
    const { developers } = await getDevelopers()

    return (
        <section>
            <h1>{property.title}</h1>
            <EditProperty property={property} zones={zones} developers={developers} />
        </section>
    )
}
