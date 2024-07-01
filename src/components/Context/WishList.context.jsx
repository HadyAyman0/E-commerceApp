import axios from "axios";
import { createContext, useContext, useState } from "react";
import { Usercontext } from "./User.context";
import { Cartcontext } from "./Cart.context";
import toast from "react-hot-toast";

export const WishListContext = createContext(null);

export default function WishListProvider({ children }) {
    const [wishItem , setWishItem] = useState(null);
    const [itemNum , setItemNum] = useState([])
    const { token } = useContext(Usercontext);
    async function addProudctToWishList({id}) {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/wishlist`,
                method: "POST",
                headers: {
                    token,
                },
                data: {
                    productId: id,
                },
            }
            const { data } = await axios.request(options);
            console.log(data);
            toast.success(data.message+"🛺");
            setItemNum(data.data);
        } catch (error) {
            console.log(error);
        }
    }
    async function getItemsForWishList(){
        try {
            const options = {
                url : `https://ecommerce.routemisr.com/api/v1/wishlist`,
                method : "GET",
                headers : {
                    token
                },
            }
            const {data} = await axios.request(options);
            console.log(data);
            if(data.data.length === 0 ){
                setWishItem([])
                setItemNum([])
            }else{
               setWishItem(data)
            }
        } catch (error) {
            console.log(error);
            if(error.response.data.message.includes("No cart"))
                {
                    setWishItem([])
                }
        }

    }

    async function removeItemsFromWishList({id}){
        try {
            const options = {
                url:`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
                method: "DELETE",
                headers : {
                    token,
                },
            }
            const {data} = await axios.request(options);
            if(data.data.length === 0 ){
                setWishItem([])
                setItemNum([])
            }else{
                getItemsForWishList()
                setItemNum(data.data)
            }
            console.log(data);
            toast.success("item deleted successfully 💀");
        } catch (error) {
            console.log(error);
        }
    }
    return <WishListContext.Provider value={{ addProudctToWishList , getItemsForWishList , wishItem , removeItemsFromWishList , itemNum }} >
        {children}
    </WishListContext.Provider>
}


