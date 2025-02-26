import React from 'react'
import EditZones from '../../components/edits/EditZones'

const getZone = async (name) => {
    const apiUrl = process.env.API_URL
    try {
        const res = await fetch(`${apiUrl}/api/zones/${name}`)
        if (res.ok) {
            return res.json()
        }
    } catch (error) {
        console.log(error);
    }
}

export default async function page({ params }) {
    const { zoneName } = params
    const { zone } = await getZone(zoneName)
    const { name, location, position, projects, properties } = zone
    return (
        <section>
            <h1>منطقة {name}</h1>
            <EditZones zone={zone} />
        </section>
    )
}
