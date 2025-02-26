import React from 'react'
import AddZoneForm from '../components/adding/AddZoneForm'
import ZonesList from '../components/Lists/ZonesList'

export default function page() {
    return (
        <section>
            <h1>المناطق</h1>
            <ZonesList />
            <h1>إضافة منطقة</h1>
            <AddZoneForm />
        </section>
    )
}
