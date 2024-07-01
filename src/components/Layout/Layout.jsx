import React from 'react'
import { NavbarSimple } from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'




export default function Layout() {
    return (
        <>
            <NavbarSimple />
            <div className=''>
            <Outlet/>
            </div>
            <Footer />
        </>
    )
}
