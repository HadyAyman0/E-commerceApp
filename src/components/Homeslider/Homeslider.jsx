import React from 'react';
import img1 from "../../assets/slider-image-1.jpeg";
import img2 from "../../assets/slider-image-2.jpeg";
import img3 from "../../assets/slider-image-3.jpeg";

export default function Homeslider() {
    const setting = {
        autoplay: true,
         autoplaySpeed: 2000,
       }
    return (
        <>
            <section className='mt-3 p-5'>
                <div className="container  gap-0 grid grid-cols-12 ">
                    <div className='md:col-span-8  col-span-12'>
                    <swiper-container {...setting} loop={true} style={{height :"100%"}} >
                        <swiper-slide style={{height :"100%"}} >
                        <img src={img1} className='w-full h-full  ' alt="" />
                        </swiper-slide>
                        <swiper-slide style={{height :"100%"}}>
                        <img src={img2} className='w-full h-full  ' alt="" />
                        </swiper-slide>
                        <swiper-slide style={{height :"100%"}}>
                        <img src={img3} className='w-full h-full  ' alt="" />
                        </swiper-slide>
                    </swiper-container>
                    </div>
                    <div className='md:col-span-4 col-span-12 h-1/2 bg-blue-gray-500  '>
                    <img src={img2} className='w-full h-full  ' alt="" />
                    <img src={img3} className='w-full h-full  ' alt="" />
                    </div>
                </div>

            </section>

        </>
    )
}
