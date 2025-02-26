'use client'
import React from 'react'
import FilterData from './FilterData'
import { useDataContext } from '../context/DataContext'
import Loading from '../home/loading'

export default function ListData({ ftr, showProject, showProperty, showFilter }) {

    const { zones, developers, properties, projects } = useDataContext()

    if (!zones || !developers || !properties || !projects) {
        return <Loading />
    } else {


        return (
            <FilterData projects={projects} showFilter={showFilter} properties={properties} ftr={ftr} showProject={showProject} showProperty={showProperty} />
        )
    }
}