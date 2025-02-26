'use client'
import Image from "next/image";
import Link from 'next/link'
import GetDataForConsultingForm from "./components/consultationForm/GetDataForConsultingForm";
import { GoogleAnalytics } from '@next/third-parties/google'
import { useEffect, useState } from "react";
import Loading from "./components/home/loading";
import { motion } from "framer-motion";
import { useDataContext } from "./components/context/DataContext";




export default function Home() {
  const { zones, developers, properties, projects } = useDataContext()

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

  if (!zones || !developers || !properties || !projects) {
    return (
      <>
        <Loading />
      </>
    )
  } else {
    const FilteredProjects = projects.filter(project => {
      const minPrice = project.startBudget >= 1000000
      const maxPrice = project.startBudget <= 20000000
      return maxPrice && minPrice
    })
    const SetupMap = require('./components/map/SetupMap').default
    return (
      <>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="Home"
        >
          <div className="map w-full relative">
            <SetupMap locations={zones} units={properties} developers={developers} />
          </div>
          <div className="text text-center mt-56 lg:mt-0 p-2">
            <h1 className=" text-3xl lg:text-5xl items-center text-center font-black mb-8">استثمر في  <span className="text-mainColor">الأناقة</span>، وعِشها <span className="text-mainColor">برفاهية</span></h1>
            <p className="text-sm lg:text-lg font-medium">إيجاد عقارك اصبح ابسط من خلال نظام بحث برو ديل</p>
            <p className="text-sm lg:text-lg font-medium">استكشف قوائم العقارات الواسعة حسب الفئة</p>
            <Image className="bottom-0 left-0 absolute" src={'/locationHome.svg'} width={150} height={150} alt="ابحث عن العقار في متجر عقاري" />
            <Image className="top-20 hidden lg:block right-8 absolute" src={'/searchHome.svg'} width={150} height={150} alt="ابحث عن العقار في متجر عقاري" />
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="ConsultationForm p-5 text-center my-20"
        >
          <div className="titles flex items-center justify-center flex-col mb-8">
            <h2 className="text-3xl items-center font-bold mb-4">استشارات عقارية <span className="text-mainColor">مجانيــة</span></h2>
            <p className="text-sm lg:text-lg font-medium">يمكن شراء العقارات أو بيعها أو تأجيرها أو استئجارها</p>
            <p className="text-sm lg:text-lg font-medium">ويمكن أن تكون فرصة استثمارية قيمة. يمكن أن تكون قيمة العقارات</p>
          </div>
          <div className="FixedContent w-full flex items-center justify-center flex-col relative">
            <GetDataForConsultingForm />
            <div className="svgs absolute top-10 right-5">
              <Image src={'/sendLocation.svg'} width={150} height={150} alt='send Message aqary Store' />
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="Sug p-5"
        >
          <div className="titles flex items-center justify-center flex-col mb-16">
            <h2 className="text-3xl items-center font-bold mb-4">اشهر <span className="text-mainColor">المناطق</span> و الأكثر بحثاً</h2>
          </div>
          <div className="FixedContent w-full flex items-center justify-center">
            <div className="MainZones w-full flex flex-wrap items-center justify-center">
              {zones.map(zone => (
                <Link href={`/zones/${zone.name}`} key={zone._id} className="card zone border m-4 h-64 w-80 duration-700 hover:shadow-xl rounded-xl">
                  <div className="image overflow-hidden rounded-tl-xl rounded-br-xl w-80 h-40">
                    <Image src={zone.image} className="w-full h-full duration-700 hover:scale-125" width={350} height={350} alt={`${zone.name}`} />
                  </div>
                  <div className="text h-24 flex flex-col items-start justify-between p-2">
                    <h2 className="text-lg font-bold mb-1">{zone.name}</h2>
                    <div className="location flex items-center justify-start">
                      <span className='text-gray-500 text-sm'>{zone.location}</span>
                    </div>
                    <div className="data flex items-center justify-between w-full">
                      <h5>{zone.projects.length} مشروع</h5>
                      <h5>{zone.properties.length} وحدة</h5>
                    </div>
                  </div>
                </Link>
              )).slice(0, 6)}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="titles flex items-center justify-center flex-col mb-16">
            <h2 className="text-3xl items-center font-bold mb-4 text-center">استثمارك الآمن في <span className="text-mainColor">الكمباوندات</span> المصرية</h2>
          </div>
          <div className="FixedContent flex items-center justify-center flex-col mb-20">
            <div className="lists flex flex-wrap items-center justify-around w-full">
              {FilteredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  custom={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index / 10 * 0.01 }}
                  className="rounded-xl h-72 w-80 lg:w-96 m-4 hover:shadow-xl duration-500"
                >
                  <Link href={`/zones/${project.zone}/projects/${project.title}`} className="projectCart w-full h-full">
                    <div className="relative image h-3/5 rounded-br-2xl rounded-tl-2xl overflow-hidden">
                      <Image className='w-full h-full duration-700 hover:scale-125' src={project.image} width={340} height={340} alt={project.title} />
                    </div>
                    <div className="data p-2 flex flex-col items-start justify-between h-2/5">
                      <h2 className='text-base font-semibold text-black'>{project.title}</h2>
                      <div className="location flex items-center justify-start">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" /></svg>
                        <h6 className='text-gray-500 text-sm mr-2'>{project.location}</h6>
                      </div>
                      <div className="startBudget flex items-center justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">   <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />   <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 21 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z" clipRule="evenodd" /> </svg>
                        <h6 className='text-gray-500 text-sm mr-2'>تبدأ من: <span className='text-black'>{insertDots(project.startBudget)} جنية مصري</span></h6>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )).slice(0, 6)}
            </div>
            <Link className="m-4 rounded-lg p-2 bg-mainColor text-bgColor font-bold" href={'/zones/%D9%85%D8%B5%D8%B1/projects'}>عرض المشروعات</Link>
          </div>
        </motion.section>
        <GoogleAnalytics gaId="G-3EVKQWKC3S" />
      </>
    );
  }
}
