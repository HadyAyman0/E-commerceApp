import React, { useContext, useEffect } from "react";
import {
    Navbar,
    Collapse,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import img1 from "../../assets/freshcart-logo.svg"
import { Link, NavLink } from "react-router-dom";
import { Usercontext } from "../Context/User.context";
import { Cartcontext } from "../Context/Cart.context";
import { WishListContext } from "../Context/WishList.context";


function NavList() {
    const { token } = useContext(Usercontext);
    return (<>
        {token ? <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <NavLink to="/" className={({ isActive }) => {
                    return `flex items-center lg:hover:before:w-full before:transition-[width] before:duration-300 before:h-0  lg:hover:before:h-[0.9px] before:absolute before:bg-green-500 before:bottom-[-2px] before:left-0  relative before:w-0 hover:text-green-500 transition-colors ${isActive ? `font-extrabold text-green-500 before:w-full ` : ""} `
                }}>
                    Home
                </NavLink>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <NavLink to="/products" className={({ isActive }) => {
                    return `flex items-center lg:hover:before:w-full before:transition-[width] before:duration-300 before:h-0  lg:hover:before:h-[0.9px] before:absolute before:bg-green-500 before:bottom-[-2px] before:left-0  relative before:w-0 hover:text-green-500 transition-colors ${isActive ? `font-extrabold text-green-500 before:w-full ` : ""} `
                }}>
                    Products
                </NavLink>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <NavLink to="/categories" className={({ isActive }) => {
                    return `flex items-center lg:hover:before:w-full before:transition-[width] before:duration-300 before:h-0  lg:hover:before:h-[0.9px] before:absolute before:bg-green-500 before:bottom-[-2px] before:left-0  relative before:w-0 hover:text-green-500 transition-colors ${isActive ? `font-extrabold text-green-500 before:w-full ` : ""} `
                }}>
                    Categories
                </NavLink>
            </Typography>

            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <NavLink to="/allorders" className={({ isActive }) => {
                    return `flex items-center lg:hover:before:w-full before:transition-[width] before:duration-300 before:h-0  lg:hover:before:h-[0.9px] before:absolute before:bg-green-500 before:bottom-[-2px] before:left-0  relative before:w-0 hover:text-green-500 transition-colors ${isActive ? `font-extrabold text-green-500 before:w-full ` : ""} `
                }}>
                    All orders
                </NavLink>
            </Typography>
        </ul> : ""}
    </>

    );
}
function NavListIcon() {
    return (
        <ul className="my-2 flex justify-center gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-3">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <a href="#" className="flex items-center hover:text-green-500 transition-colors">
                    <i className="fa-brands fa-facebook"></i>
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <a href="#" className="flex items-center hover:text-green-500 transition-colors">
                    <i className="fa-brands fa-twitter"></i>
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <a href="#" className="flex items-center hover:text-green-500 transition-colors">
                    <i className="fa-brands fa-youtube"></i>
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <a href="#" className="flex items-center hover:text-green-500 transition-colors">
                    <i className="fa-brands fa-tiktok"></i>
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <a href="#" className="flex items-center hover:text-green-500 transition-colors">
                    <i className="fa-brands fa-instagram"></i>
                </a>
            </Typography>
        </ul>
    );
}
function NavCart() {
    const {token} = useContext(Usercontext);
    const {getAllProudctCart , proudctInfo } = useContext(Cartcontext);
    const {getItemsForWishList , wishItem , itemNum} = useContext(WishListContext)
    useEffect(()=>{
        getAllProudctCart()
        getItemsForWishList()
    },[])
    return (
        <>
        {token?<ul className="my-2 flex justify-center gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-3">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <NavLink to="/cart" className={({isActive})=>{
                    return `flex items-center relative hover:text-green-500 transition-colors ${isActive ? `font-extrabold text-green-500  ` : ""}`
                }}>
                 <i className="fa-solid text-2xl fa-cart-plus fa-bounce "></i>
                    <div className="bg-green-500 fa-bounce text-white flex justify-center items-center -top-4 -right-2  absolute rounded-full w-6 h-6">
                        <span>{proudctInfo === null ? <i className="fa-solid fa-spinner fa-spin"></i> : proudctInfo.numOfCartItems ||0 }</span>
                        {/*  */}
                       
                    </div> 
                </NavLink>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <NavLink to="/WishList" className={({isActive})=>{
                    return `flex items-center relative hover:text-green-500 transition-colors ${isActive? `font-extrabold text-green-500  ` : ""} `
                }}>
                <i className="fa-regular fa-beat-fade text-2xl fa-face-grin-hearts"></i>
                <div className="bg-green-500 fa-beat-fade  text-white flex justify-center items-center -top-3 -right-2 p-2 absolute rounded-full w-5 h-5">
                       {wishItem === null ? <i className="fa-solid fa-spinner fa-spin"></i> :  itemNum.length || wishItem.count  || 0   }
                    </div>
                </NavLink>
            </Typography>
        </ul>:""}

        </>
    );
}
function NavListRegister() {
    const { token, logout } = useContext(Usercontext);
    return (<>
        <ul className="my-2 flex flex-col  gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:gap-2 lg:items-center ">
            {!token ? <>
                <Typography
                    as="li"
                    variant="small"
                    color="blue-gray"
                    className="p-1 font-medium"
                >
                    <NavLink to="/auth/login" className={({ isActive }) => {
                        return `flex items-center lg:hover:before:w-full before:transition-[width] before:duration-300 before:h-0  lg:hover:before:h-[0.9px] before:absolute before:bg-green-500 before:bottom-[-2px] before:left-0  relative before:w-0 hover:text-green-500 transition-colors ${isActive ? `font-extrabold text-green-500 before:w-full ` : ""} `
                    }}>
                        Login
                    </NavLink>
                </Typography>
                <Typography
                    as="li"
                    variant="small"
                    color="blue-gray"
                    className="p-1 font-medium"
                >
                    <NavLink to="/auth/signup" className={({ isActive }) => {
                        return `flex items-center lg:hover:before:w-full before:transition-[width] before:duration-300 before:h-0  lg:hover:before:h-[0.9px] before:absolute before:bg-green-500 before:bottom-[-2px] before:left-0  relative before:w-0 hover:text-green-500 transition-colors ${isActive ? `font-extrabold text-green-500 before:w-full ` : ""} `
                    }}>
                        Sign Up
                    </NavLink>
                </Typography>
            </> : <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <NavLink className="flex items-center font-semibold hover:text-green-500 transition-colors">
                    <i onClick={logout} className="fa-solid fa-right-from-bracket"></i>
                </NavLink>
            </Typography>
            }


        </ul>


    </>

    );
}

export function NavbarSimple() {
    const [openNav, setOpenNav] = React.useState(false);

    const handleWindowResize = () =>
        window.innerWidth >= 960 && setOpenNav(false);

    React.useEffect(() => {
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return (

        <Navbar className="sticky bg-[#f0f3f2]  top-0 z-50 h-max max-w-full border-none rounded-none px-4 py-3 lg:px-8 lg:py-4">
            <div className="container">
                <div className="flex items-center gap-7 text-blue-gray-900">
                    <div className="flex items-center gap-7 text-blue-gray-900">
                        <Typography
                            as="li"
                            href=""
                            variant="h6"
                            className="mr-4  py-1.5"
                        >
                            <img src={img1} alt="" />
                        </Typography>
                        <div className="hidden lg:block">
                            <NavList />

                        </div>
                    </div>
                    <div className="hidden ml-auto lg:block ">
                       <NavCart/>
                    </div>
                    <div className="hidden  lg:block ">
                        <NavListIcon />
                    </div>
                    <div className="hidden   lg:block ">
                        <NavListRegister />

                    </div>
                    <IconButton
                        variant="text"
                        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                        ripple={false}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                        ) : (
                            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                        )}
                    </IconButton>
                </div>
                <Collapse open={openNav}>
                    <NavList />
                    <NavListRegister />
                    <NavCart/>
                    <NavListIcon />

                </Collapse>
            </div>
        </Navbar>

    );
}