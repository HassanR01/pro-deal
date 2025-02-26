'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function AddLead({ inst, zone, budget }) {
    const [name, setName] = useState('')
    const [CountryCode, setCountryCode] = useState('')
    const [phoneNum, setPhoneNum] = useState('')
    const [callMethod, setCallMethod] = useState('+20')
    const [maxBudget, setmaxBudget] = useState(budget)
    const [alert, setAlert] = useState('')
    const phone = CountryCode + phoneNum
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
                    <li>Lead Name: ${name}</li>
                    <li>Phone Number: ${phone}</li>
                    <li>Contact him on ${callMethod}</li>
                    <li>Zone: ${zone}</li>
                    <li>Ask About: ${inst}</li>
                    <li>Start Budget: ${insertDots(budget)} جنيه مصري</li>
                </ul>
            </div>
        `


    const handleAddLeadForm = async (e) => {
        e.preventDefault()
        if (name && maxBudget && callMethod && phoneNum && phone) {
            try {
                const res = await fetch(`/api/leads`, {
                    method: 'POST',
                    headers: {
                        'Content-type': "application/json"
                    },
                    body: JSON.stringify({ name, phone, callMethod, maxBudget, inst, zone })
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
        <form onSubmit={handleAddLeadForm}>
            <div className="inputs flex flex-col items-center justify-center">
                <input type="text" name="name" id="LeadName" className='mt-1 w-full py-2 px-2 border border-gray-300 bg-white rounded-xl shadow-sm focus:outline-none sm:text-sm' value={name} onChange={(e) => setName(e.target.value)} placeholder='الاسم' />
                <div className="mt-4 w-full flex flex-wrap items-center justify-between">
                    <div className="method flex items-center justify-center">
                        <input type="radio" className=' hidden' name="callMethod" id="WA" value={"WhatsApp"} onChange={(e) => setCallMethod(e.target.value)} />
                        <label className='px-3 py-2 min-w-32 border flex items-center justify-center rounded-r-xl cursor-pointer' htmlFor="WA">واتساب</label>
                        <input type="radio" className=' hidden' name='callMethod' id='Call' value={"Call"} onChange={(e) => setCallMethod(e.target.value)} />
                        <label className='px-3 py-2 min-w-32 border flex items-center justify-center rounded-l-xl cursor-pointer' htmlFor="Call">مكالمة تلفونية</label>
                    </div>
                    <div className="PN w-full mt-4 sm:mt-0 sm:w-6/12 flex items-center justify-center">
                        <input type="tel" id="phone" name="phone" value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} className="mt-1 py-2 w-full sm:w-10/12 px-1 border-r border-gray-300 bg-white rounded-r-xl focus:outline-none shadow-sm sm:text-sm" placeholder="رقم هاتفك" title="رقم الهاتف" required />
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
                <div className="btns w-full mt-4">
                    <button className='link bg-mainColor rounded-xl w-full h-full py-2 flex text-lg font-bold items-center justify-center px-6 text-bgColor' type="submit">{alert ? alert : "طلب تواصل"}</button>
                </div>
            </div>
        </form>
    )
}
