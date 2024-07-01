import { Button, Input } from '@material-tailwind/react'
import React from 'react'
import img1 from '../../assets/amazon-pay.png'
import img2 from '../../assets/American-Express-Color.png'
import img3 from '../../assets/mastercard.webp'
import img4 from '../../assets/paypal.png'
import img5 from '../../assets/get-apple-store.png'
import img6 from '../../assets/get-google-play.png'

export default function Footer() {
    return (
        <>
         <footer className=' bg-[#f0f3f2] p-10'>
            <div className="container">
                <h1 className='font-semibold text-3xl mb-2'>Get The FreshCart App</h1>
                <p className='text-[#5f5f5f] mb-2'>We Will send you a link, open it on your phone to download tha app</p>
                <div className='flex items-center flex-col md:flex-row md:gap-20 gap-7 '>
                    <Input
                        size="lg"
                        placeholder="name@mail.com"
                        className=" !border-t-blue-gray-200 ml-3 focus:!border-t-gray-900 "
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                    />
                    <Button className=' py-4 md:w-[20%]'> Share App Link </Button>
                </div>
                <div className='my-3 flex-col border-y-2 p-1 lg:p-3 border-gray-300 flex gap-4  lg:flex lg:flex-row items-center lg:justify-between'>
                    <div className='sm:flex-row flex-col flex justify-center gap-2 sm:gap-3 items-center'>
                        <h4>Payment Partners</h4>
                        <img src={img1} alt="" className='w-[60px] object-contain ' />
                        <img src={img2} alt="" className='w-[60px] object-contain  ' />
                        <img src={img3} alt="" className='w-[60px] object-contain  ' />
                        <img src={img4} alt="" className='w-[60px] object-contain  ' />
                    </div>
                    <div className='flex gap-3' >
                        <h4>Get Deleveries With FreshCart</h4>
                        <img src={img5} alt="" className='w-[60px] object-contain  ' />
                        <img src={img6} alt="" className='w-[60px] object-contain  ' />
                    </div>
                </div>


            </div>
            
        </footer>
        </>

    )
}
