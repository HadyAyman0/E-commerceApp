import { Button, Input } from '@material-tailwind/react';
import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

export default function Signup() {
  const navigate = useNavigate();
  async function SendRegister(values) {
    let id;
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        method: 'POST',
        data: values,
      }
      id = toast.loading("please Wating ...")
      const { data } = await axios.request(options);
      console.log(data);
      toast.dismiss(id)
      toast.success("User Created Successfuly");
      setTimeout(() => {
        navigate("/auth/login")
      }, 2000)
    } catch (error) {
      console.log(error);
      toast.dismiss(id)
      toast.error(error.response.data.message)
    }
  }
  const PhoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
  const validationSchema = Yup.object({
    name: Yup.string().required(" name is required").min(3, " name should be at leaset 3 char").max(16, "The name should be max 16 char"),
    email: Yup.string().required(" email is required").email(" email should ba an email"),
    password: Yup.string().required(" password is required").matches(/^[A-Z][0-9a-zA-Z]{5,25}$/, "password should be start with a capital letter and follwed by a combinations od letters and numbers"),
    rePassword: Yup.string().required(" rePassword is required").oneOf([Yup.ref("password")], " passsowrd and repassword should be the same "),
    phone: Yup.string().required("phone is required").matches(PhoneRegex, "phone number is not vaild"),
  })
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    validationSchema,
    onSubmit: SendRegister,
  });

  return (
    <>
    <Helmet>
      <title>Signup Page</title>
    </Helmet>
      <section className='min-h-[50vh]'>
        <div className="container p-5 mt-5">
          <div className='flex items-center gap-2 mb-2'>
            <i class="fa-solid fa-user-plus text-[#5f5f5f] text-4xl"></i>
            <h1 className="uppercase text-3xl  font-extrabold">Register Now</h1>
          </div>
          <p className="text-[#5f5f5f] mt-1 ">Nice to meet you! Enter your details to register.</p>
          <form onSubmit={formik.handleSubmit} >
            <div className='mt-3'>
              <Input label='User Name' type='text' name='name' onBlur={formik.handleBlur} value={formik.values.name} onChange={formik.handleChange} />
              {formik.errors.name && formik.touched.name ? <div>
                <p className='mt-3 text-red-500 font-extralight'> * {formik.errors.name}</p>
              </div> : ""}
            </div>
            <div className='mt-3'>
              <Input label='Email' type='email' name='email' onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} />
              {
                formik.errors.email && formik.touched.email ? <div>
                  <p className='mt-3 text-red-500 font-extralight'> * {formik.errors.email}</p>
                </div> : ""
              }
            </div>
            <div className='mt-3'>
              <Input label='phone' type='number' name='phone' onBlur={formik.handleBlur} value={formik.values.phone} onChange={formik.handleChange} />
              {formik.errors.phone && formik.touched.phone ? <div>
                <p className='mt-3 text-red-500 font-extralight'> * {formik.errors.phone}</p>
              </div> : ""}
            </div>
            <div className='mt-3'>
              <Input label='password' type='password' name='password' onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} />
              {formik.errors.password && formik.touched.password ? <div>
                <p className='mt-3 text-red-500 font-extralight'> * {formik.errors.password}</p>
              </div> : ""}
            </div>
            <div className='mt-3'>
              <Input label='rePassword' type='password' name='rePassword' onBlur={formik.handleBlur} value={formik.values.rePassword} onChange={formik.handleChange} />
              {formik.errors.rePassword && formik.touched.rePassword ? <div>
                <p className='mt-3 text-red-500 font-extralight'> * {formik.errors.rePassword}</p>
              </div> : ""}
            </div>
            <Button type='submit' className='mt-3 flex justify-center'>REGISTER</Button>
          </form>
        </div>
      </section>
    </>
  );
}