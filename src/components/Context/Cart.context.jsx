import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Usercontext } from "./User.context";
import toast from "react-hot-toast";
export const Cartcontext = createContext(null)
export default function CartProvider({children}){
    const {token} = useContext(Usercontext)
    const [proudctInfo , setProudctInfo ] = useState(null)
    async function addProudctToCart({id}){
        try {
            const options = {
                url : `https://ecommerce.routemisr.com/api/v1/cart`,
                method:"POST",
                 headers:{
                    token,
                } , 
                 data : {
                    productId : id,
                 } ,
            }
            const {data} = await axios.request(options)
            console.log(data);
            toast.success(data.message + "🛺")
            setProudctInfo(data)
            
        } catch (error) {
            console.log(error);
            
        }
    }
    async function getAllProudctCart(){
        try {
            const options = {
                url : `https://ecommerce.routemisr.com/api/v1/cart`,
                method : "GET" , 
                headers : {
                    token
                }
            }
            const {data} = await axios.request(options)
            console.log(data);
            if(data.numOfCartItems===0)
                {
                    setProudctInfo([])
                }else
                {
                    setProudctInfo(data)
                }
            
        } catch (error) {
            console.log(error);
            if(error.response.data.message.includes("No cart"))
                {
                    setProudctInfo([])
                }
        }
    }
     async function updateProudctCart({id,count}){
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                method : "PUT",
                headers : {
                    token
                }, 
                data : {
                    count
                }
            }
            const data = await axios.request(options)

            toast.success("🥱")
            setProudctInfo(data.data)

        } catch (error) {
            console.log(error);
        }
    }
    async function removeProudctCart({id}){
        try {
            const options = {
                url:`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                method : "DELETE" , 
                headers:{
                    token
                },
            }
            const {data} = await axios.request(options);

            toast.success("item deleted successfully 💀 ")
            if(data.numOfCartItems ===0){
                setProudctInfo([])
            }else{
                setProudctInfo(data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    async function clearProudctCart(){
        try {
            const options = {
                url : `https://ecommerce.routemisr.com/api/v1/cart` , 
                method : "DELETE" , 
                headers :{
                    token 
                },
            }
            const {data} = await axios.request(options);

            toast.success("All Cart is Deleted successfully 💀")
            setProudctInfo([]);
        } catch (error) {
            console.log(error);
        }
    }
    return <Cartcontext.Provider value={{addProudctToCart , getAllProudctCart , proudctInfo , setProudctInfo ,updateProudctCart , removeProudctCart , clearProudctCart }} >
        {children}
    </Cartcontext.Provider>

}
