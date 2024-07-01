import React, { useContext, useEffect } from 'react'
import img1 from "../../assets/pngwing.png"
import { Button } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import { Cartcontext } from '../../components/Context/Cart.context'
import Loading from '../../components/Loading/Loading'
import { Helmet } from 'react-helmet'

export default function ProudctCart() {
    const { proudctInfo , getAllProudctCart , updateProudctCart ,removeProudctCart , clearProudctCart } = useContext(Cartcontext)
    function scrollToTop(){
        window.scrollTo(0,0)
    }
    useEffect(()=>{
        getAllProudctCart()
        scrollToTop()
    },[]) 
    return (
        <>
        <Helmet>
            <title>Proudct cart page</title>
        </Helmet>
            {proudctInfo === null ? <Loading /> : <section className=' my-3  '>
                <div className="container bg-[#f0f3f2] min-h-[50vh] p-5">
                    <div className='flex items-center gap-4' >
                        <img src={img1} className=' w-[100px]  drop-shadow opacity-90 ' alt="" />
                        <h2 className='text-3xl font-extrabold uppercase text-[#5f5f5f]'> Shop Cart </h2>

                    </div>
                    {proudctInfo.length === 0 ? <div className='flex p-5 mt-2 flex-col gap-2 justify-center items-center'>
                        <p>There Are Not Items Yet. </p>
                        <Button className='uppercase font-semibold'><Link to="/">Add your first proudct to cart</Link></Button>
                    </div> : <>
                        <div className=' flex-col lg:flex-row  justify-between items-center'>
                            <h5 className=' my-4 font-bold uppercase'> Total Cart Price : {proudctInfo.data.totalCartPrice} EGP</h5>
                                <div className='flex justify-center items-center lg:justify-end lg:items-end gap-3'>
                                <Button className='font-bold ' onClick={()=>{
                                clearProudctCart()
                            }}>Clear Cart</Button>
                            <Link to="/chekout">  <Button className='uppercase font-bold'>Check Out</Button> </Link>
                                </div>
                        </div>
                        { proudctInfo.data.products.map((product) => {
                            return <div key={product._id}>
                                <div className='   gap-2  my-2 grid grid-cols-12  p-5 border-b-[1px] border-green-500'>
                                    <div className='flex p-3  items-center gap-8  lg:col-span-8 col-span-12  '>
                                        <picture>
                                            <img src={product.product.imageCover} className=' lg:w-[200px] lg:h-[200px] w-[150px] lg:rounded-full lg:border-[1px] lg:border-green-500 lg:object-contain hover:transition-transform duration-1000 hover:scale-75 lg:shadow-2xl ' alt="" />
                                        </picture>
                                        <div className='flex m-2   flex-col gap-2'>
                                            <h2 className=' font-semibold '>{product.product.title} </h2>
                                            {product.product.ratingsAverage > 3 ? <div>
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
                                            <p className='text-green-500'>Price: {product.price} L.E </p>
                                            <Button className='uppercase p-[9px] lg:p-[13px] w-fit' onClick={()=>{
                                                removeProudctCart({id: product.product.id})
                                            }} > REMOVE item </Button>
                                        </div>
                                    </div>
                                    <div className=' lg:justify-end flex gap-5 items-center justify-center lg:col-span-4 col-span-12  '>
                                    <div className=' flex overflow-hidden mr-15 self-center  w-fit border rounded-md  justify-center items-center border-green-800'>
                                        <i className="fa-solid lg:p-2  px-3  sm:ml-0 lg:ml-0   lg:px-4 fa-minus cursor-pointer   " onClick={()=>{
                                            updateProudctCart({id:product.product.id , count : product.count -1 > 0 ? product.count -1 : 0  })
                                        }} >
                                        </i>
                                        <span className=' p-2 px-7 border-x-[1px] font-extrabold border-green-800 '>{product.count}</span>
                                        <div className='bg-[#212121] lg:py-1 py-2 '>
                                            <i className="fa-solid px-3  sm:mr-0 lg:mr-0  lg:p-2  lg:px-4 cursor-pointer text-white  fa-plus" onClick={()=>{
                                          updateProudctCart({id : product.product.id , count : product.count + 1})   
                                        }}></i>
                                        
                                        </div>   
                                    </div>
                                    <Link to={`/ProductDetails/${product.product.id}`}>  <i class="fa-regular w-fit p-3 text-green-600 cursor-pointer border-[1px] border-green-500 rounded-lg fa-eye"></i>
                                    </Link>
                                    </div>
                                </div>

                            </div>
                        } ) }
                    </> 
                    }
                </div>
            </section>




            }
        </>
    )
}




