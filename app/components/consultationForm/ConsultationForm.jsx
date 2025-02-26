'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'


export default function ConsultationForm({ zones, developers }) {
    const [minBudget, setminBudget] = useState()
    const [maxBudget, setmaxBudget] = useState()
    const [name, setName] = useState('')
    const [callMethod, setCallMethod] = useState('')
    const [zone, setzone] = useState('')
    const [message, setmessage] = useState('')
    const [CountryCode, setCountryCode] = useState('+20')
    const [phoneNum, setPhoneNum] = useState('')
    const phone = CountryCode + phoneNum
    const [alert, setAlert] = useState('')

    const router = useRouter()


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

    let messageText =
        `
            <div>
                <a href='https://aqarystore.com'>
                    <div>
                        <h3>Aqary Store</h3>
                    </div>
                </a>
                <h3>lead Info:</h3>
                <ul>
                    <li><h5>Lead Name:</h5> ${name}</li>
                    <li><h5>Phone Number:</h5> ${phone}</li>
                    <li><h5>Contact him on</h5> ${callMethod}</li>
                    <li><h5>Zone:</h5> ${zone}</li>
                    <li><h5>Budget:</h5> form ${insertDots(+minBudget)} EGP, to ${insertDots(+maxBudget)} EGP</li>
                    <li><h5>Message:</h5> ${message}</li>
                </ul>
            </div>
        `



    const handleAddLeadForm = async (e) => {
        e.preventDefault()
        if (name && maxBudget && callMethod && phoneNum && CountryCode) {
            try {
                const res = await fetch(`/api/leads`, {
                    method: 'POST',
                    headers: {
                        'Content-type': "application/json"
                    },
                    body: JSON.stringify({ name, phone, callMethod, maxBudget, zone, minBudget, message })
                })

                const res1 = await fetch(`/api/sendEmail`, {
                    method: 'POST',
                    headers: {
                        'Content-type': "application/json"
                    },
                    body: JSON.stringify({ messageText })
                })

                if (res.ok && res1.ok) {
                    setAlert(`شكراً لإرسالك الطلب سيتم التواصل في اقرب وقت`)
                    router.push('/contact/thanks')
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            setAlert('كل البيانات مهمة')
            setTimeout(() => {
                setAlert('')
            }, 2000);
        }
    }

    return (
        <>
            <form onSubmit={handleAddLeadForm} className=' bg-white border max-w-3xl w-full border-gray-300 p-3 rounded-xl shadow-xl z-10'>
                <h2 className='font-black text-2xl mb-2 text-mainColor'>احصل علي عقارك من برو ديل</h2>
                <div className="inputs flex flex-col items-center justify-center">
                    <input type="text" name="name" id="LeadName" className='mt-1 w-full py-2 px-2 border border-gray-300 bg-white rounded-xl shadow-sm focus:outline-none sm:text-sm' value={name} onChange={(e) => setName(e.target.value)} placeholder='الاسم' />
                    <div className="data mt-4 w-full flex flex-wrap items-center justify-between">
                        <select name="zone" value={zone} onChange={(e) => setzone(e.target.value)} className='py-2 px-2 w-full lg:w-6/12 border border-gray-300 bg-white rounded-xl shadow-sm focus:outline-none sm:text-sm'>
                            <option value="">اختر منطقة</option>
                            {zones.map(zone => (
                                <option key={zone._id} value={zone.name}>{zone.name}</option>
                            ))}
                        </select>
                        <div id='bgt' className="budget flex items-center justify-center py-2 mt-4 sm:mt-0 px-2 w-full lg:w-5/12 border border-gray-300 bg-white rounded-xl shadow-sm focus:outline-none sm:text-sm">
                            <div className="min">
                                <select name="Min Budget" value={minBudget} onChange={(e) => setminBudget(e.target.value)}>
                                    <option value="">السعر الادني</option>
                                    <option value="1000000">1 مليون</option>
                                    <option value="2000000">2 مليون</option>
                                    <option value="3000000">3 مليون</option>
                                    <option value="4000000">4 مليون</option>
                                    <option value="5000000">5 مليون</option>
                                    <option value="6000000">6 مليون</option>
                                    <option value="7000000">7 مليون</option>
                                    <option value="8000000">8 مليون</option>
                                    <option value="9000000">9 مليون</option>
                                    <option value="10000000">10 مليون</option>
                                    <option value="15000000">15 مليون</option>
                                    <option value="20000000">20 مليون</option>
                                    <option value="25000000">25 مليون</option>
                                    <option value="30000000">30 مليون</option>
                                    <option value="35000000">35 مليون</option>
                                    <option value="40000000">40 مليون</option>
                                    <option value="45000000">45 مليون</option>
                                    <option value="50000000">50 مليون</option>
                                    <option value="75000000">75 مليون</option>
                                    <option value="100000000">100 مليون</option>
                                    <option value="150000000">150 مليون</option>
                                </select>
                            </div>
                            <span className='mx-2'>الى</span>
                            <div className="max">
                                <select name="Max Budget" value={maxBudget} onChange={(e) => setmaxBudget(e.target.value)}>
                                    <option value="">السعر الاقصى</option>
                                    <option value="2000000">2 مليون</option>
                                    <option value="3000000">3 مليون</option>
                                    <option value="4000000">4 مليون</option>
                                    <option value="5000000">5 مليون</option>
                                    <option value="6000000">6 مليون</option>
                                    <option value="7000000">7 مليون</option>
                                    <option value="8000000">8 مليون</option>
                                    <option value="9000000">9 مليون</option>
                                    <option value="10000000">10 مليون</option>
                                    <option value="15000000">15 مليون</option>
                                    <option value="20000000">20 مليون</option>
                                    <option value="25000000">25 مليون</option>
                                    <option value="30000000">30 مليون</option>
                                    <option value="35000000">35 مليون</option>
                                    <option value="40000000">40 مليون</option>
                                    <option value="45000000">45 مليون</option>
                                    <option value="50000000">50 مليون</option>
                                    <option value="75000000">75 مليون</option>
                                    <option value="100000000">100 مليون</option>
                                    <option value="150000000">150 مليون</option>
                                    <option value="200000000">200 مليون</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 w-full flex flex-wrap items-center justify-between">
                        <div className="method flex items-center justify-center">
                            <input type="radio" className=' hidden' name="callMethod" id="WA" value={"WhatsApp"} onChange={(e) => setCallMethod(e.target.value)} />
                            <label className='px-3 py-2 min-w-32 border flex items-center justify-center rounded-r-xl cursor-pointer' htmlFor="WA">واتساب</label>
                            <input type="radio" className=' hidden' name='callMethod' id='Call' value={"Call"} onChange={(e) => setCallMethod(e.target.value)} />
                            <label className='px-3 py-2 min-w-32 border flex items-center justify-center rounded-l-xl cursor-pointer' htmlFor="Call">مكالمة تلفونية</label>
                        </div>
                        <div className="PN w-full mt-4 sm:mt-0 lg:w-6/12 flex items-center justify-center">
                            <input type="tel" id="phone" name="phone" value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} className="mt-1 py-2 w-10/12 px-1 border-r border-gray-300 bg-white rounded-r-xl focus:outline-none shadow-sm sm:text-sm" placeholder="رقم هاتفك" title="رقم الهاتف" required />
                            <select id="countryCode" name="countryCode" value={CountryCode} onChange={(e) => setCountryCode(e.target.value)} className="mt-1 w-20 py-2 px-2 border-l border-gray-300 bg-white rounded-l-xl shadow-sm focus:outline-none sm:text-sm">
                                <option value="+20">(+20)</option>
                                <option value="+966">(+966)</option>
                                <option value="+971">(+971)</option>
                                <option value="+961">(+961)</option>
                                <option value="+962">(+962)</option>
                                <option value="+963">(+963)</option>
                                <option value="+964">(+964)</option>
                                <option value="+965">(+965)</option>
                                <option value="+968">(+968)</option>
                                <option value="+974">(+974)</option>
                                <option value="+973">(+973)</option>
                                <option value="+970">(+970)</option>
                                <option value="+213">(+213)</option>
                                <option value="+253">(+253)</option>
                                <option value="+218">(+218)</option>
                                <option value="+212">(+212)</option>
                                <option value="+222">(+222)</option>
                                <option value="+252">(+252)</option>
                                <option value="+249">(+249)</option>
                                <option value="+216">(+216)</option>
                                <option value="+967">(+967)</option>
                            </select>
                        </div>
                    </div>

                    <div className="message w-full mt-4">
                        <textarea name="message" id="message" className='py-2 px-2 w-full border border-gray-300 bg-white rounded-xl shadow-sm focus:outline-none sm:text-sm' value={message} onChange={(e) => setmessage(e.target.value)} placeholder='اكتب رسالتك'></textarea>
                    </div>

                    <div className="btns w-full mt-4">
                        <button className='link bg-mainColor hover:bg-green-500 duration-700  rounded-xl w-full h-full py-2 flex text-lg font-bold items-center justify-center px-6 text-bgColor' type="submit">{alert ? alert : "طلب تواصل"}</button>
                    </div>
                </div>
            </form>
        </>
    )
}
