'use client'
import React, { useEffect, useState } from 'react'
import ConsultationForm from './ConsultationForm'
import { useDataContext } from '../context/DataContext'

export default function GetDataForConsultingForm() {
    const {zones, developers} = useDataContext()

    if (!developers || !zones) {
        return <h2 className='font-black text-2xl mb-2 text-mainColor text-center'>احصل علي عقارك من عقاري..</h2>

    } else {
        return (
            <>
                <ConsultationForm zones={zones} developers={developers} />
            </>
        )
    }
}
