import React, { useContext, useEffect } from 'react'
import Styles from './WishList.module.css'
import img1 from "../../assets/pngwing.png"
import { Button } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import { WishListContext } from '../../components/Context/WishList.context'
import Loading from '../../components/Loading/Loading'
import { Helmet } from 'react-helmet'

export default function WishList() {
    const {getItemsForWishList , wishItem , removeItemsFromWishList} = useContext(WishListContext);
    function scrollToTop(){
        window.scrollTo(0,0)
    }
    useEffect(()=>{
        getItemsForWishList()
        scrollToTop()
    },[])

    return (
        <>
        <Helmet>
            <title>Wish List page</title>
        </Helmet>
        {wishItem === null ? <Loading/> :  <section className=' my-3  '>
                <div className="container bg-[#f0f3f2] min-h-[50vh] p-5">
                    <div className='flex items-center gap-4' >
                        <img src={img1} className=' w-[100px]  drop-shadow opacity-90 ' alt="" />
                        <h2 className='text-3xl font-extrabold uppercase text-[#5f5f5f]'> Whish List </h2>
                    </div>
                    {wishItem.length === 0 ? <div className='flex p-5 mt-2 flex-col gap-2 justify-center items-center'>
                        <p>There Are Not Items Yet. </p>
                        <Button className='uppercase font-semibold'><Link to="/">Add your first proudct to Your Wish List</Link></Button>
                    </div> : wishItem.data.map((item)=>{
                        return  <div key={item._id} className='border-b-[1px] gap-8 grid grid-cols-12 justify-center items-center  border-green-500  p-5 my-5'>
                        <div className='col-span-12 md:col-span-4 flex justify-center items-center'> 
                        <picture className={`${Styles.pic} pic my-3 `}>
                            <img src={ `https://ecommerce.routemisr.com/Route-Academy-products/${item.images[0]}` } className={` img1 lg:w-[200px]   lg:h-[200px] w-[150px]  lg:rounded-full lg:border-[1px]  lg:border-green-500 lg:object-contain hover:transition-all duration-1000 hover:scale-75 lg:shadow-2xl `} alt="" />
                            <img src={`https://ecommerce.routemisr.com/Route-Academy-products/${item.images[1]}` } className='lg:w-[200px] img2 lg:h-[200px] w-[150px] lg:rounded-full lg:border-[1px] hidden lg:border-green-500 lg:object-contain hover:transition-all duration-1000 hover:scale-75 lg:shadow-2xl' alt="" />
                        </picture>  
                        </div>
                        <div className='flex flex-col gap-2 items-center md:items-start justify-center col-span-12 md:col-span-8'>
                        <h1 className='font-extrabold text-3xl text-center md:text-start '>{item.title}</h1>
                        {item.ratingsAverage > 3.5 ? <div>
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
                        <p className='text-green-500 '> price: {item.price}</p>
                        <p className='font-bold  my-2 text-center md:text-start'>{item.description}</p>
                        <div className='my-2 flex items-center  gap-3'>
                            <img src={item.category.image} className='w-[80px] h-[80px] object-contain rounded-full border-2' alt="" />
                            <h3 className=' font-bold uppercase'>Category :{item.category.name}</h3>
                        </div>
                        <Button className='uppercase md:self-end self-center font-semibold' onClick={()=>{
                            removeItemsFromWishList({id:item.id});

                        }}>Remove item</Button>
                        </div>
                    </div>
                    })  }
                </div>
            </section>}
        </>
    )
}



                    