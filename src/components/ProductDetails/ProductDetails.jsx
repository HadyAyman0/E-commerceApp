import { Button } from '@material-tailwind/react'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading';
import ReactImageGallery from 'react-image-gallery';
import { Cartcontext } from '../Context/Cart.context';
import { WishListContext } from '../Context/WishList.context';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {
    const [proudctDetails, setProudctDetails] = useState(null)
    const {addProudctToCart , proudctInfo} = useContext(Cartcontext);
    const {addProudctToWishList} = useContext(WishListContext)
    const { id } = useParams();
    console.log(id);
    function scrollToTop(){
        window.scrollTo(0,0)
    }

    async function getProductDetails() {
        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
            method: "GET",
        }
        const { data } = await axios.request(options);
        console.log(data.data);
        setProudctDetails(data.data)
    }
    useEffect(() => {
        getProductDetails();
        scrollToTop()
    }, [])

    const imgURL = proudctDetails?.images.map((imageURL) => {
        return {
            original: imageURL,
            thumbnail: imageURL,
        }
    })
    return (
        <>
        <Helmet>
            <title>Proudct details page</title>
        </Helmet>
            {proudctDetails ? <section className='my-3 p-5'>
                <div className="container grid grid-cols-12 gap-5  ">
                    <div className='col-span-12 md:col-span-5  '>
                        <picture >
                            <ReactImageGallery style={{width:"0px"}}   items={imgURL} showPlayButton={false} showNav={false} autoPlay={true} />
                        </picture>
                    </div>
                    <div className='col-span-12 md:col-span-7 gap-2 flex flex-col items-center justify-center'>
                        <h2 className='text-3xl text-center font-bold'>{proudctDetails.title}</h2>
                        <div className='text-[13px] my-1 flex items-center'>
                            {proudctDetails.ratingsAverage > 3.5 ? <div>
                                <i className="fa-solid fa-star text-yellow-700 "></i>
                                <i className="fa-solid fa-star text-yellow-700"></i>
                                <i className="fa-solid fa-star text-yellow-700"></i>
                                <i className="fa-solid fa-star text-yellow-700"></i>
                                <i className="fa-regular fa-star"></i>
                            </div>
                                : <div>
                                     <i className="fa-solid fa-star text-yellow-700 "></i>
                                    <i className="fa-solid fa-star text-yellow-700"></i>
                                    <i className="fa-solid fa-star text-yellow-700"></i>
                                    <i className="fa-regular fa-star"></i>
                                </div>}
                            <p className='ml-1'>({proudctDetails.quantity} quantity) | <span className='text-yellow-800'>Sold :{proudctDetails.sold}</span> </p>
                        </div>
                        <span className='text-2xl  font-semibold'>Price: {proudctDetails.price} L.E</span>
                        <div className=' border-b-2 border-opacity-45 p-6 border-blue-gray-900'>
                            <p>{proudctDetails.description}</p>
                        </div>
                        <div className='my-2 flex items-center  gap-3'>
                            <img src={proudctDetails.category.image} className='w-[80px] h-[80px] object-contain rounded-full border-2' alt="" />
                            <h3 className=' font-bold uppercase'>Category :{proudctDetails.category.name}</h3>
                        </div>
                        <div className='xl:flex items-center'>

                            <div className='flex items-center justify-start'>
                                <Button className='m-3 shake-horizontal heartbeat' onClick={()=>{
                                    addProudctToCart({id:proudctDetails.id})
                                }} > Buy Now</Button>
                              <div className='p-2 rounded-md text-2xl border-2 border-[#212121]'><i className="fa-regular cursor-pointer  fa-face-grin-hearts  text-black" onClick={()=>{
                                addProudctToWishList({id:proudctDetails.id})
                              }}></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> : <Loading />}
        </>
    )
}
