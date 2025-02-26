import React from 'react'
import EditDeveloper from '../../components/edits/EditDeveloper'

const getDeveloper = async (id) => {
    const apiUrl = process.env.API_URL
    try {
        const res = await fetch(`${apiUrl}/api/developers/${id}`)

        if (!res.ok) {
            throw new Error('Connot fetch The Developer')
        }

        return res.json()

    } catch (error) {
        console.log(error);
    }
}

export default async function page({ params }) {
    const {developerName} = params
    const { developer } = await getDeveloper(developerName)
    const { name, description, image } = developer
  return (
      <section>
          <h1>{name}</h1>
          <EditDeveloper developer={developer} />
    </section>
 )
}
