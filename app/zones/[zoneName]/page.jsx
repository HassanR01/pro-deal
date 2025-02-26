import ListData from '@/app/components/filter/ListData'
import TitlePage from '@/app/components/main/title'
import React from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'

const getZone = async (name) => {
  const apiUrl = process.env.API_URL
  try {
    const res = await fetch(`${apiUrl}/api/zones/${name}`, {
      cache: 'no-store'
    })

    if (!res.ok) {
      throw new Error('Cannot Fetch The zone Data')
    }
    return res.json()
  } catch (error) {
    console.log(error);
  }
}

export async function generateMetadata({ params }) {
  const { zoneName } = params
  const { zone } = await getZone(decodeURIComponent(zoneName))
  const { name, image } = zone

  return {
    title: `${name} - Aqary Store | ${name} - متجر عقاري`,
    description: ` متجر عقاري - عقارك هتلاقيه في عقاري - ${name} منطقة`,
    siteName: 'Aqay Store',
    images: [
      {
        url: image, // Must be an absolute URL
        width: 800,
        height: 600,
      },
    ]
  }
}

export default async function page({ params }) {
  const { zoneName } = params
  const { zone } = await getZone(decodeURIComponent(zoneName))
  const { name, image } = zone

  return (
    <>
      <TitlePage />
      <section>
        <div className="title my-8 flex items-center justify-center flex-col text-center">
          <h3 className='text-3xl lg:text-5xl items-center font-black'>مشاريع للاستثمار و وحدات للتملك في {name}</h3>
        </div>
        <ListData showProject={true} showProperty={true} ftr={decodeURIComponent(zoneName)} />
      </section>
      <GoogleAnalytics gaId="G-3EVKQWKC3S" />
    </>
  )
}
