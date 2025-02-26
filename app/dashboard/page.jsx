'use client'
import React, { useEffect, useState } from 'react'
import Loading from '../components/home/loading'
import Analysis from './components/main/Analysis'

export default function Page() {
  const [zones, setzones] = useState(null)
  const [developers, setdevelopers] = useState(null)
  const [properties, setproperties] = useState(null)
  const [projects, setprojects] = useState(null)
  const [leads , setLeads] = useState(null)
  const [loading, setLoading] = useState(true)


  const getData = async () => {
    try {
      const res = await fetch(`/api/zones`, {
        cache: 'no-store',
      })

      const res1 = await fetch(`/api/developers`, {
        cache: 'no-store',
      })
      const res2 = await fetch(`/api/properties`, {
        cache: 'no-store',
      })
      const res3 = await fetch(`/api/projects`, {
        cache: 'no-store',
      })
      const res4 = await fetch(`/api/leads`, {
        cache: 'no-store'
      })

      if (!res.ok && !res1.ok && !res2.ok && !res3.ok) {
        throw new Error('Connot fetch The Zones')
      }

      const result = await res.json()
      setzones(result.zones)

      const result1 = await res1.json()
      setdevelopers(result1.developers)

      const result2 = await res2.json()
      setproperties(result2.properties)

      const result3 = await res3.json()
      setprojects(result3.projects)

      const result4 = await res4.json()
      setLeads(result4.leads)

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {


    const timer = setTimeout(() => {
      getData()
    }, 1000);

    return () => clearTimeout(timer)
  }, [])


  if (loading) {

    return (
      <Loading />
    )
  } else {

    return (
      <section>
        <h1>الرئيسية</h1>
        <Analysis zones={zones} developers={developers} projects={projects} properties={properties} leads={leads} />
      </section>
    )
  }
}
