import React from 'react'
import titImg from '../../../public/titleImg.png'
export default function TitlePage({ text }) {
    return (
        <div style={{
            backgroundImage: `url(${titImg.src})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
        }}
            className="titleSection">
            <div className="cover w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50">

            </div>
        </div>
    )
}
