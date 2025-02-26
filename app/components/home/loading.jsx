import Image from 'next/image'
import React from 'react'

export default function Loading() {
    return (
        <div className='fixed w-full h-screen left-0 top-0 bg-bgColor flex items-center justify-center z-50'>
            <Image src={'/onOpining.gif'} width={300} height={300} alt='Opining Aqary Store' />
        </div>
    )
}
