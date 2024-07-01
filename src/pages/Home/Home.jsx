import React, { useContext, useEffect, useState } from 'react'
import ProudectCard from '../../components/ProudectCard/ProudectCard'
import axios from 'axios';
import Loading from '../../components/Loading/Loading';
import Homeslider from '../../components/Homeslider/Homeslider';
import Categoryslider from '../../components/Categoryslider/Categoryslider';
import { WishListContext } from '../../components/Context/WishList.context';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Usercontext } from '../../components/Context/User.context';
import { Slide } from 'react-awesome-reveal';
import { Helmet } from 'react-helmet';

export default function Home() {
    const { token } = useContext(Usercontext)
    async function getproducts() {
        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/products`,
            method: "GET",
        }
        return await axios.request(options);

    }
    const { data, isLoading } = useQuery({
        queryKey: ["Homeproducts"],
        queryFn: getproducts,
        refetchOnMount: true,
    })
    function scrollToTop() {
        window.scrollTo(0, 0)
    }
    useEffect(() => {
        scrollToTop()
    }, [])

    if (isLoading) {
        return <Loading />
    }
    const proudctsSlice = data.data.data.slice(0, 6);
    const { name } = jwtDecode(token);


    return (
        <>
        <Helmet>
            <title>Home Page</title>
        </Helmet>
            <section className='min-h-screen'>
                <Slide duration={500}>
                    <div className='h-[90vh] bg-fixed  overflow-hidden  p-5' >
                        <picture className='relative'>
                            <img src="https://www.lux.camera/content/images/size/w1000/2023/10/hero-4.jpg" className='lg:w-[100%] lg:h-[100%] h-[100vh] object-cover w-[100%] lg:object-cover ' alt="" />
                            <div className='absolute top-0 p-5 bg-black flex-col gap-5 left-0 right-0 bottom-0 bg-opacity-50 flex justify-center items-center'>
                                <h3 className='text-green-400 font-anton text-6xl font-extrabold uppercase fa-bounce'>Hello {name} ,</h3>
                                <p className='text-green-400 font-anton text-4xl font-extrabold uppercase text-center'> Welcome to Our E-commerce App</p>
                            </div>
                        </picture>

                    </div></Slide>
                <Slide duration={500} >
                    <Homeslider />
                    <Categoryslider />
                    <div className='my-5'>
                        <div className="container p-5 ">
                            <img src="https://www.computerlounge.co.nz/Data/Media/Images/Brand/JBL/JBL-brand-banner.jpg" className='w-full h-full]' alt="" />
                        </div>
                    </div>
                    <div className='flex gap-3 mx-10 items-center'>
                        <span className='bg-green-500 py-5 rounded-lg px-3 w-[10px] h-[10px]'></span>
                        <h1 className='text-2xl font-semibold mb-2  text-[#5f5f5f] '>Shop popular Proudcts</h1>
                    </div>
                </Slide>
                <Slide duration={500} >

                    <div className="container  p-5 gap-5 grid grid-cols-12">
                        {proudctsSlice.map((proudct) => {
                            return <ProudectCard key={proudct.id} proudectInfo={proudct} />
                        })}
                        <div className=' col-span-12 flex justify-center items-center'>
                            <Link to="/products"><Button className=' '>View All Products</Button></Link>
                        </div>
                    </div>
                </Slide>





            </section>
        </>
    )
}
