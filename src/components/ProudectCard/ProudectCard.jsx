import React, { useContext, useEffect } from 'react'
import Styles from './proudectCard.module.css'
import { Link } from 'react-router-dom';
import { Cartcontext } from '../Context/Cart.context';
import { WishListContext } from '../Context/WishList.context';


export default function ProudectCard({proudectInfo}) {
    const {addProudctToCart} = useContext(Cartcontext)
    const {addProudctToWishList , getItemsForWishList} = useContext(WishListContext)
    const {images,title,price,ratingsAverage,category,id} = proudectInfo ; 
    return (
        <>
            <div className={` card ${Styles.card} hover:scale-90 hover:transition-all  hover:outline hover:outline-[1.5px] hover:outline-green-400   hover:duration-700 shadow-2xl rounded-xl  overflow-hidden  col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2`}>
                <picture className='rounded-xl relative'>
                    <img src={images[0]} className='w-full img1' alt={title} />
                    <img src={images[2] || images[0]} className='hidden img2' alt={title} />
                    <div className='w-full opacity-0 hover:opacity-100 hover:transition-opacity hover:duration-1000 flex justify-center items-center gap-3 top-0 bg-black bg-opacity-35 h-full absolute '>
                        <div className='p-2 hover:scale-125 hover:rotate-12 hover:transition-transform hover:duration-500 rounded-full bg-green-500 flex justify-center items-center w-fit '>
                            <i className="fa-solid cursor-pointer fa-face-grin-hearts text-white"
                             onClick={()=>{
                                addProudctToWishList({id});
                            }}></i>
                        </div>
                        <Link 
                        to={`/ProductDetails/${id}`}
                        className='p-2 hover:scale-125 hover:rotate-12 hover:transition-transform hover:duration-500 rounded-full bg-green-500 flex justify-center items-center w-fit '>
                            <i className="fa-solid cursor-pointer fa-eye text-white"></i>
                        </Link>
                        <div className='p-2 hover:scale-125 hover:rotate-12 hover:transition-transform hover:duration-500 rounded-full bg-green-500 flex justify-center items-center w-fit '>
                            <i onClick={()=>{
                                addProudctToCart({id})
                            }} className="fa-solid cursor-pointer fa-cart-arrow-down text-white"></i>
                        </div>

                    </div>
                </picture>
                <div className='p-2'>
                    <h3 className='text-2xl font-semibold text-green-500 '> {category.name}</h3>
                    <p className='font-bold mt-1 line-clamp-2'>{title}</p>
                    <div className='flex items-center justify-between mt-1'>
                        <span>{price} L.E</span>
                        <div className='flex items-center gap-2'>
                            <i className="fa-solid fa-star text-green-500"></i>
                            <span>{ratingsAverage}</span>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
