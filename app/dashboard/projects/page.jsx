import React from 'react'
import AddProject from '../components/adding/AddProject'
import ProjectsList from '../components/Lists/ProjectsList'

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

export default async function page() {
  const { zones } = await getZones()
  const { developers } = await getDevelopers()

  return (
    <section>
      <h1>المشروعات</h1>
      <ProjectsList />
      <h1>إضافة مشروع</h1>
      <AddProject zones={zones} developers={developers} />
    </section>
  )
}
