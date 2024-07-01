import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect } from 'react'
import Loading from '../../components/Loading/Loading'
import { Slide } from 'react-awesome-reveal'
import { Helmet } from 'react-helmet'


export default function Categories() {
    function getCategories() {
        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/categories`,
            method: "GET",
        }
        return axios.request(options)
    }

    const { data, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
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

    return (
        <>
        <Helmet>
            <title>Categories page</title>
        </Helmet>
            <section className='min-h-screen'>
                <Slide duration={500}>
                    <div className="container grid gap-5 grid-cols-12 p-5">
                        {data.data.data.map((category) => {
                            return <div className={` flex flex-col justify-between hover:scale-90 hover:transition-all  hover:outline hover:outline-[1.5px] hover:outline-green-400   hover:duration-700 shadow-2xl rounded-xl  overflow-hidden  col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2`}>
                                <picture className='rounded-xl p-3'>
                                    <img src={category.image} className='w-[200px] h-[200px] object-contain' alt="" />
                                </picture>
                                <div className='p-2 flex-col text-center flex justify-center items-center'>
                                    <h3 className='text-2xl font-semibold text-green-500 '> {category.name}</h3>
                                    <p className='font-bold mt-1 line-clamp-2'>{category.slug}</p>

                                </div>
                            </div>
                        })}


                    </div>
                </Slide>
            </section>
        </>
    )
}
