import React from 'react'
import EditProjects from '../../components/edits/EditProjects'

const getProject = async (id) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    try {
        const res = await fetch(`${apiUrl}/api/projects/${id}`)

        if (!res.ok) {
            throw new Error('Connot fetch The Project')
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
    const { projectName } = params
    const { project } = await getProject(projectName)
    const { zones } = await getZones()
    const { developers } = await getDevelopers()

    return (
        <section>
            <h1>{project.title}</h1>
            <EditProjects project={project} zones={zones} developers={developers} />
        </section>
    )
}
