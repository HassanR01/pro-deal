import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
    let date = new Date()
    let year = date.getFullYear()
    return (
        <footer className='flex flex-col justify-around items-center w-full text-center lg:text-start'>
            <div className="abstract w-full bg-mainColor p-8 lg:p-16 flex flex-col items-center lg:items-start justify-between">
                <div className="text flex flex-col lg:items-start items-center justify-center">
                    <div className="logo flex flex-col items-start justify-start mb-5">
                        {/* <Image src={'/aqaryLogo.png'} width={120} height={120} alt='aqary store متجر عقاري' /> */}
                        <h1 className='text-3xl lg:text-5xl font-black text-textColor'>برو ديل</h1>
                    </div>
                    <div className="paragraph text-textColor font-bold">
                        <p>يمكن شراء العقارات أو بيعها أو تأجيرها أو استئجارها ويمكن أن تكون فرصة استثمارية قيمة.</p>
                        <p>يمكن أن تكون قيمة العقارات...</p>
                    </div>
                    <div className="links flex items-center justify-around my-8">
                        <Link className='ml-6 hover:shadow-xl hover:scale-110 duration-700' href={"https://www.facebook.com/sa7elelielife"} target='_blank'><Image src={'/facebookIcon.png'} width={30} height={30} alt='Facebook Icon' /></Link>
                        <Link className='ml-6 hover:shadow-xl hover:scale-110 duration-700' href={"https://www.instagram.com/prodeal_eg"} target='_blank'><Image src={'/instagram.png'} width={30} height={30} alt='instagram Icon' /></Link>
                        <Link className='ml-6 hover:shadow-xl hover:scale-110 duration-700' href={"https://www.linkedin.com/in/pro-deal-74751a353"} target='_blank'><Image src={'/linkedin.png'} width={30} height={30} alt='linkedin Icon' /></Link>
                        <Link className='ml-6 hover:shadow-xl hover:scale-110 duration-700' href={"https://wa.me/+201005511089"} target='_blank'><Image src={'/whatsapp.png'} width={30} height={30} alt='whatsapp Icon' /></Link>
                    </div>
                </div>
            </div>
            <div className="copyrights w-full flex items-center justify-around bg-gray-200 text-textColor p-2">
                <p className='text-sm mb-1'>Copyright<sup>&copy;</sup>{year} <Link href={'https://www.rockaidev.com'} className='font-bold text-blue-500'>Rockai Dev</Link> | All Rights Reserved.</p>
                <p className='text-sm'><Link className='px-2 font-semibold' href="/">Teams {`&`} conditions</Link> <Link className='px-2 font-semibold' href="/">Privacy Policy</Link></p>
            </div>
        </footer>
    )
}
