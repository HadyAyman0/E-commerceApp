import React, { useContext, useEffect, useState } from 'react'
import { Usercontext } from '../../components/Context/User.context'
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import { Slide } from 'react-awesome-reveal';
import { Helmet } from 'react-helmet';

export default function Orders() {
    const { token } = useContext(Usercontext);
    const { id } = jwtDecode(token);
    async function getOrders() {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
                method: "GET",
            }
            return await axios.request(options);


        } catch (error) {
            console.log(error);
        }
    }

    const { data, isLoading } = useQuery({
        queryKey: ["orders"],
        queryFn: getOrders,
        refetchOnMount: true
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

    return (
        <>
        <Helmet>
            <title>orders page</title>
        </Helmet>
            {data.data.length === 0 ? <section className=' p-5'>
                <div className="container min-h-[50vh] flex justify-center my-5 items-center p-5">
                    <h3 className='font-bold uppercase text-3xl'>That No orders Yet</h3>
                </div>
            </section> : <section>
                <Slide >
                    <div className="container min-h-screen p-5 ">
                        {data.data.map((item) => {
                            return <div key={item._id} className='grid my-5 p-5 border-[2px] border-green-400 rounded-md grid-cols-12 gap-5'>
                                <div className='col-span-12 flex md:flex-row flex-col justify-between items-center'>
                                    <div className='flex-row items-center'>
                                        <p className='uppercase text-[#5f5f5f]'>Order Id</p>
                                        <p className='uppercase font-bold'>#{item.id}</p>
                                        <p className='uppercase text-[#5f5f5f]'> total Order Price : {item.totalOrderPrice}</p>
                                    </div>
                                    <div className='flex items-center gap-3 p-2 '>
                                        <span className='px-7 rounded-2xl py-1 bg-green-500'> {item.isPaid === false ? "غير مدفوع" : "مدفوع"} </span>
                                        <span className='px-7 rounded-2xl py-1 bg-blue-500'> {item.isDelivered === false ? "قيد التوصيل" : "تم التوصيل"} </span>
                                    </div>
                                </div>
                                <div className='col-span-12 justify-center items-center flex flex-col lg:flex-row gap-3 '>
                                    {item.cartItems.map((product) => {
                                        return <div key={product._id} className='border-[1px] flex rounded-lg flex-col gap-3 justify-center items-center shadow-2xl w-fit border-green-500 p-5'>
                                            <picture>
                                                <img src={product.product.imageCover} className='w-[150px] h-[150px] object-contain' alt="" />
                                            </picture>
                                            <div className=' flex flex-col justify-center   items-center '>
                                                <h2 className='font-extrabold my-1 text-center lg:line-clamp-2 text-[10px]'>{product.product.title}</h2>
                                                {item.ratingsAverage > 3.5 ? <div>
                                                    <i className="fa-solid fa-star  text-yellow-700 "></i>
                                                    <i className="fa-solid fa-star  text-yellow-700"></i>
                                                    <i className="fa-solid fa-star  text-yellow-700"></i>
                                                    <i className="fa-solid fa-star  text-yellow-700"></i>
                                                    <i className="fa-regular fa-star "></i>
                                                </div>
                                                    : <div>
                                                        <i className="fa-solid fa-star text-yellow-700 "></i>
                                                        <i className="fa-solid fa-star text-yellow-700"></i>
                                                        <i className="fa-solid fa-star text-yellow-700"></i>
                                                        <i className="fa-regular fa-star"></i>
                                                    </div>}
                                                <p className='text-green-500 text-[10px]'>price : {product.price}</p>
                                                <p className='text-green-500 text-[10px]'>count : {product.count} </p>
                                            </div>
                                        </div>
                                    })}

                                </div>

                            </div>

                        })}
                    </div>
                </Slide>
            </section>}
        </>
    )
}






