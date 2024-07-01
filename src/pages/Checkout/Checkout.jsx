import React, { useContext, useState } from 'react'
import img1 from "../../assets/pngwing.png"
import { Button, Input, Textarea } from '@material-tailwind/react'
import { useFormik } from 'formik'
import axios from 'axios'
import { Usercontext } from '../../components/Context/User.context'
import { Cartcontext } from '../../components/Context/Cart.context'
import { useNavigate } from 'react-router-dom'

export default function Checkout() {
    const { token } = useContext(Usercontext)
    const { proudctInfo, setProudctInfo } = useContext(Cartcontext);
    const [orderType, setOrederType] = useState(null);
    const Navigate = useNavigate()
    async function cashOrder(values) {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/${proudctInfo.data._id}`,
                method: "POST",
                headers: {
                    token,
                },
                data: {
                    values,
                },

            }
            const { data } = await axios.request(options);
            console.log(data);
            setProudctInfo([])
            Navigate("/allorders");
        } catch (error) {
            console.log(error);
        }
    }
    async function onlineOrder(values) {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${proudctInfo.data._id}?url=http://localhost:5173`,
                method: "POST",
                headers: {
                    token,
                },
                data: {
                    values,
                },

            }
            const { data } = await axios.request(options);
            console.log(data);

            if (data.status === "success") {
                   window.location.href = data.session.url;
            }
        } catch (error) {
            console.log(error);
        }
    }

    const formik = useFormik({
        initialValues: {
            shippingAddress: {
                details: "",
                phone: "",
                city: "",
            }
        },
        onSubmit: (values) => {
            if (orderType === "cash") {
                cashOrder(values)
            } else {
                onlineOrder(values)
            }
        },

    })
    return (<>
        <section className='my-3 '>
            <div className="container  bg-[#f0f3f2] min-h-[50vh] p-5">
                <div className='flex items-center gap-4' >
                    <img src={img1} className=' w-[100px]  drop-shadow opacity-90 ' alt="" />
                    <h2 className='text-3xl font-extrabold uppercase text-[#5f5f5f]'> Check Out now </h2>
                </div>
                <form className='p-6  flex flex-col gap-4 w-[70%]' onSubmit={formik.handleSubmit} >
                    <Input label='city' type='text' name='shippingAddress.city' value={formik.values.shippingAddress.city} onChange={formik.handleChange} ></Input>
                    <Input label='phone' type='number' name='shippingAddress.phone' value={formik.values.shippingAddress.phone} onChange={formik.handleChange} ></Input>
                    <Textarea label='ANY DETAILS' name='shippingAddress.details' value={formik.values.shippingAddress.details} onChange={formik.handleChange} />
                    <div className='flex gap-3'>
                        <Button type='submit' className='w-fit uppercase' onClick={() => {
                             setOrederType("cash");
                         }}>cash order</Button>
                        <Button type='submit' className='w-fit uppercase' onClick={() => { setOrederType("online"); }} >online order</Button>
                    </div>
                </form>

            </div>
        </section>
    </>
    )
}
