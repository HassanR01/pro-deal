import React from 'react'
import TitlePage from '../components/main/title'
import FinderPage from '../components/finder/FinderPage'
import { GoogleAnalytics } from '@next/third-parties/google'

const fetchData = async (endpoint) => {
  const apiUrl = process.env.API_URL; // تأكد من أن API_URL متاحة في البيئة
  if (!apiUrl) {
    console.error("❌ API_URL is missing! Set API_URL in .env");
    return null;
  }

  try {
    const res = await fetch(`${apiUrl}/api/${endpoint}`);

    if (!res.ok) {
      throw new Error(`❌ Failed to fetch ${endpoint}: ${res.status} ${res.statusText}`);
    }

    return await res.json();

  } catch (error) {
    console.error(`🚨 Error fetching ${endpoint}:`, error.message);
    return []; // تجنب كسر التطبيق عند الخطأ
  }
};

// استخدام الدالة العامة لجميع الطلبات
const getZones = () => fetchData("zones");
const getDevelopers = () => fetchData("developers");
const getProperties = () => fetchData("properties");
const getProjects = () => fetchData("projects");


export const metadata = {
  title: "Free Finder - Pro Deal | ابحث بحرية عن عقارك في برو ديل",
  description: "استثمر في الاناقة و عٍش في الرفاهية، برو ديل هو الموقع العقاري الرائد في تجارة العقارات و الاستشارات العقارية و الاستثمارية في سواحل مصر و المدن الحديثة، استثمارك الآمن مع فريق برو ديل - Generated By Rockai Dev",
};


export default async function Finder({ searchParams }) {
  const { zones } = await getZones()
  const { developers } = await getDevelopers()
  const { properties } = await getProperties()
  const { projects } = await getProjects()


  return (
    <>
      <TitlePage />
      <section>
        <FinderPage developers={developers} zones={zones} projects={projects} properties={properties} params={searchParams} />
      </section>
      <GoogleAnalytics gaId="G-3EVKQWKC3S" />
    </>
  )
}
