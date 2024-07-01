import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading';
import { useQuery } from '@tanstack/react-query';

export default function Categoryslider() {
    const setting = {
        autoplay: true,
        autoplaySpeed: 2000,
    }
    async function getcategories() {
        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/categories`,
            method: "GET",
        }
        return await axios.request(options);
    }
    const { data, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: getcategories,
        refetchOnMount: true,

    })

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <section className='p-2'>
                <div className='flex gap-3 mx-10 items-center'>
                <span className='bg-green-500 py-5 rounded-lg px-3 w-[10px] h-[10px]'></span>
                <h1 className='text-2xl font-semibold mb-2 text-[#5f5f5f] '>Shop popular Categories</h1>
                </div>
                <div className='container  p-5'>
                    <swiper-container loop={true} {...setting} slides-per-view="2" space-Between={20} breakpoints={JSON.stringify({ 1200: { slidesPerView: 6 } })}>
                        {data.data.data.map((categories) => {
                            return <swiper-slide key={categories._id} >
                                <div className=' cursor-pointer flex flex-col  items-center border border-green-300 p-3'>
                                    <picture>
                                        <img src={categories.image} className='h-[300px] w-full object-contain' alt="" />
                                    </picture>
                                    <h1 className='  mt-1 font-semibold text-green-300'>{categories.name}</h1>
                                </div>
                            </swiper-slide>

                        })}
                    </swiper-container>
                </div>
            </section>
        </>
    )
}


