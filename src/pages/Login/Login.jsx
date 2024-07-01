import React, { useContext } from 'react'
import { Button, Input } from '@material-tailwind/react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Usercontext } from '../../components/Context/User.context';
import { Helmet } from 'react-helmet';
export default function Login() {
  const {token , SetToken} = useContext(Usercontext);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email : Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is requierd").matches(/^[A-Z][A-Za-z0-9]{5,25}$/,"password is invalid")
  })
   async function SendDatatoLogin(values) {
    let id ;
    try {
      const options = {
        url : "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST" ,
        data : values ,
  
      }
      id =  toast.loading("please Waiting...")
      const {data} = await axios.request(options);
      toast.dismiss(id);
      toast.success(data.message);
      SetToken(data.token)
      localStorage.setItem("token",data.token);
      setTimeout(()=>{
      navigate("/")
      },2000)
    } catch (error) {
        console.log(error);
        toast.dismiss(id)
        toast.error(error.response.data.message)

    }

  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema , 
    onSubmit: SendDatatoLogin , 
  })


  return (
    <>
    <Helmet>
      <title>Login Page</title>
    </Helmet>
      <section className='min-h-[50vh]'>
        <div className="container p-5 mt-5">
          <div className='flex items-center gap-2 mb-2'>
            <i className="fa-solid fa-user-plus text-[#5f5f5f] text-4xl"></i>
            <h1 className="uppercase text-3xl  font-extrabold">Login Now</h1>
          </div>
          <p className="text-[#5f5f5f] mt-1 ">Nice to meet you! Enter your details to Login.</p>
          <form onSubmit={formik.handleSubmit}>
            <div className='mt-3'>
              <Input label='Email' type='email' onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} name='email' />
            {formik.errors.email && formik.touched.email ? <div>
            <p className='mt-3 text-red-500 font-extralight'> * {formik.errors.email}</p>
          </div> : "" }
            </div>
            <div className='mt-3'>
              <Input label='password' type='password' onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} name='password' />
              {formik.errors.password && formik.touched.password ? <div>
            <p className='mt-3 text-red-500 font-extralight'> * {formik.errors.password}</p>
          </div> : ""}
            </div>

            <Button type='submit' className='mt-3 flex justify-center'>Login now</Button>



          </form>
        </div>
      </section>

    </>
  )
}
