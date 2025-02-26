'use client'
import React, {createContext, useContext, useEffect, useState} from "react"


const DataContext = createContext()

export default function DataProvider({ children }) { 
    const [admins, setAdmins] = useState()
    const [users, setUsers] = useState()
    const [projects, setProjects] = useState()
    const [developers, setDevelopers] = useState()
    const [properties, setProperties] = useState()
    const [zones, setZones] = useState()
    const [leads, setLeads] = useState()

    useEffect(() => {
        const GetData = async () => {
            const resAdmins = await fetch('/api/admins')
            const resUsers = await fetch('/api/users')
            const resProjects = await fetch('/api/projects')
            const resDevelopers = await fetch('/api/developers')
            const resProperties = await fetch('/api/properties')
            const resZones = await fetch('/api/zones')
            const resLeads = await fetch('/api/leads')

            const dataAdmins = await resAdmins.json()
            const dataUsers = await resUsers.json()
            const dataProjects = await resProjects.json()
            const dataDevelopers = await resDevelopers.json()
            const dataProperties = await resProperties.json()
            const dataZones = await resZones.json()
            const dataLeads = await resLeads.json()

            setAdmins(dataAdmins.admins)
            setUsers(dataUsers.users)
            setProjects(dataProjects.projects)
            setDevelopers(dataDevelopers.developers)
            setProperties(dataProperties.properties)
            setZones(dataZones.zones)
            setLeads(dataLeads.leads)
        }

        GetData()
    }, [])

    return (
        <DataContext.Provider value={{admins, users, projects, developers, properties, zones, leads}}>
            {children}
        </DataContext.Provider>
    )
}

export const useDataContext = () => useContext(DataContext)