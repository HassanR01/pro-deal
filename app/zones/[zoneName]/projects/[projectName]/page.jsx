
import HTMLReactParser from 'html-react-parser'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'
import TitlePage from '../../../../components/main/title'
import AddLead from '../../../../components/lead/AddLead'
import ListData from '../../../../components/filter/ListData'

const getProject = async (id) => {
  const apiUrl = process.env.API_URL
  try {
    const res = await fetch(`${apiUrl}/api/projects/${id}`, {
      cache: 'no-store'
    })

    if (!res.ok) {
      throw new Error('Caonnot Catch the Project Data')
    }

    return res.json()

  } catch (error) {
    console.log(error);
  }
}

export async function generateMetadata({ params }) {
  const { projectName } = params
  const { project } = await getProject(projectName)
  const { title, image, startBudget, description, developer, zone, location, position } = project

  function insertDots(number) {
    let numStr = number.toString();
    let result = '';
    for (let i = numStr.length - 1; i >= 0; i--) {
      result = numStr[i] + result;
      if ((numStr.length - i) % 3 === 0 && i !== 0) {
        result = '.' + result;
      }
    }
    return result;
  }

  return {
    title: `${title} - برو ديل`,
    description: `يقع في ${location} ، السعر يبدأ من: ${insertDots(startBudget)} ، المطور: ${developer} - برو ديل ، استثمر في الاناقة و عٍش في الرفاهية`,
    siteName: 'prodealeg.com',
    images: [
      {
        url: image, // Must be an absolute URL
        width: 800,
        height: 600,
      },
    ]
  }
}

export default async function page({params}) {
  const { zoneName, projectName } = params
  const { project } = await getProject(projectName)
  const { title, image, startBudget, description, developer, zone, location, position } = project

  function insertDots(number) {
    let numStr = number.toString();
    let result = '';
    for (let i = numStr.length - 1; i >= 0; i--) {
      result = numStr[i] + result;
      if ((numStr.length - i) % 3 === 0 && i !== 0) {
        result = '.' + result;
      }
    }
    return result;
  }
  
  return (
    <>
      <TitlePage />
      <section>
        <div className="data my-10 lg:my-20 w-full flex flex-wrap justify-center items-center p-4">
          <div className="head flex flex-col lg:flex-row items-center justify-around">
            <div className="image p-2 overflow-hidden m-4">
              <Image className='rounded-xl lg:h-72' src={image} width={450} height={450} alt={`${title} من Aqary Store | متجر عقاري .. عقارك هو عقاري`} />
            </div>
            <div className="mainData relative w-full lg:w-3/5 m-4">
              <div className="ctgShare mb-4 flex items-center justify-between">
                <div className="ctg w-24 p-1 rounded-xl items-center justify-center flex bg-mainColor text-bgColor font-bold">
                  <h3>كمباوند</h3>
                </div>
                <div className="share flex items-center justify-center">
                  <div className="links flex items-center justify-around">
                    <Link className='mx-2 hover:shadow-xl hover:scale-110 duration-700' href={"#"} target='_blank'><Image src={'/facebookIcon.png'} width={30} height={30} alt='Facebook Icon' /></Link>
                    <Link className='mx-2 hover:shadow-xl hover:scale-110 duration-700' href={"#"} target='_blank'><Image src={'/tiktokIcon.png'} width={30} height={30} alt='Tiktok Icon' /></Link>
                    <Link className='mx-2 hover:shadow-xl hover:scale-110 duration-700' href={"#"} target='_blank'><Image src={'/instagram.png'} width={30} height={30} alt='instagram Icon' /></Link>
                    <Link className='mx-2 hover:shadow-xl hover:scale-110 duration-700' href={"#"} target='_blank'><Image src={'/linkedin.png'} width={30} height={30} alt='linkedin Icon' /></Link>
                    <Link className='mx-2 hover:shadow-xl hover:scale-110 duration-700' href={"#"} target='_blank'><Image src={'/whatsapp.png'} width={30} height={30} alt='whatsapp Icon' /></Link>
                  </div>
                </div>
              </div>
              <h2 className='text-xl font-bold mb-2'>{title}</h2>
              <div className="location  flex items-center justify-start mb-2">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" /></svg>
                <h4 className='text-gray-500 text-lg mr-2'>{location}</h4>
              </div>
              <div className="budget  flex items-center justify-start mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">   <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />   <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z" clipRule="evenodd" /> </svg>
                <h4 className='text-gray-500 text-lg mr-2'>تبدأ من: <span className='text-black'>{insertDots(startBudget)} جنية مصري</span></h4>
              </div>
              <div className="AddLeadForm">
                <AddLead zone={zone} budget={startBudget} inst={title} />
              </div>
            </div>
          </div>

          <div className="article w-full flex text-center items-center justify-center flex-col sm:justify-start sm:items-start text-textColor p-3 my-5">
            {HTMLReactParser(description)}
          </div>
        </div>

        <h3 className='text-xl font-bold text-center mb-4'>وحدات في {zone}</h3>
        <ListData ftr={zone} showProperty={true} />
        <h3 className='text-xl font-bold text-center mb-4'>وحدات من نفس المطور</h3>
        <ListData ftr={developer} showProperty={true} />
      </section>
            <GoogleAnalytics gaId="G-3EVKQWKC3S" />
    </>
  )
}
