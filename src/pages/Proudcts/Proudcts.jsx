import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import React, { useEffect } from 'react'
import Loading from '../../components/Loading/Loading';
import ProudectCard from '../../components/ProudectCard/ProudectCard';
import { Slide } from 'react-awesome-reveal';
import { Helmet } from 'react-helmet';

export default function Proudcts() {

    async function getProudcts() {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/products`,
                method: "GET",
            }
            return await axios.request(options);
        } catch (error) {
            console.log(error);
        }

    }
    const { data, isLoading } = useQuery({
        queryKey: ["proudcts"],
        queryFn: getProudcts,
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
            <title>Proudcts Page</title>
        </Helmet>
            <section className='min-h-screen'>
                <Slide>
                    <div className="container  p-5 gap-5 grid grid-cols-12">
                        {data.data.data.map((proudct) => {
                            return <ProudectCard key={proudct.id} proudectInfo={proudct} />
                        })}
                    </div>
                </Slide>
            </section>

        </>
    )
}
