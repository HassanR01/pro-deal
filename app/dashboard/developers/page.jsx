import React from 'react'
import AddDeveloper from '../components/adding/AddDeveloper'
import DevelopersList from '../components/Lists/DevelopersList'

export default function page() {

    return (
        <section>
            <h1>المطورين</h1>
            <DevelopersList />
            <h1>إضافة مطورين</h1>
            <AddDeveloper />
        </section>
    )
}
