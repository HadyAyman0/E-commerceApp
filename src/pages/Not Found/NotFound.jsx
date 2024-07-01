import React from 'react'
import img1 from "../../assets/error.svg"
export default function NotFound() {
    return (
        <>
        <section className='flex min-h-screen justify-center items-center'>
        <img src={img1} alt="error" />
        </section>
        </>
    )
}
