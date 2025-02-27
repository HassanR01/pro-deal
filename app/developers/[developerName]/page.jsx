
import React from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'
import TitlePage from '../../components/main/title'
import ListData from '../../components/filter/ListData'

const getDeveloper = async (name) => {
  const apiUrl = process.env.API_URL
  try {
    const res = await fetch(`${apiUrl}/api/developers/${name}`, {
      cache: 'no-store'
    })

    if (!res.ok) {
      throw new Error('Cannot Fetch The Developer Data')
    }
    return res.json()
  } catch (error) {
    console.log(error);
  }
}

export async function generateMetadata({ params }) {
  const { developerName } = params
  const { developer } = await getDeveloper(decodeURIComponent(developerName))
  const { name, description, image } = developer

  return {
    title: `${name} - Aqary Store | ${name} - متجر عقاري`,
    description: `${description} - عقارك هتلاقيه في عقاري - متجر عقاري`,
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
  const { developerName } = params
  const { developer } = await getDeveloper(decodeURIComponent(developerName))
  const { name, description, image } = developer
  
  return (
    <>
      <TitlePage />
      <section>
        <div className="title my-8 flex items-center justify-center flex-col text-center">
          <h3 className='text-3xl lg:text-5xl items-center font-black'>مشاريع للاستثمار و وحدات للتملك من {name}</h3>
        </div>
        <ListData showProject={true} showProperty={true} ftr={decodeURIComponent(developerName)} />
      </section>
      <GoogleAnalytics gaId="G-3EVKQWKC3S" />
    </>
  )
}
