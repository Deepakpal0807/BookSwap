import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@mui/material";
import Avatar from "../Images/Avatar.jpg";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [exist, setexist] = useState(false)
  const [validemail, setvalidemail] = useState(true);
  const [validpassword,setvalidpassword]=useState(true);
  const toggle = () => {
    setIsLogin(!isLogin);
    const preview = document.getElementById("avatar-preview");
    preview.src = Avatar;
  };

  const onSubmit = async(data) => {
    setvalidemail(true);
    setvalidpassword(true);
    const queryParams = new URLSearchParams(data).toString();
    // console.log(queryParams);

    const request = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    const response = await fetch(`http://localhost:3000/login?${queryParams}`, request);
    const result = await response.json();
    console.log(result);   

    if(result.message==="Invalid email"){
      setvalidemail(false);
    }
   if(result.message==="Invalid password"){
      setvalidpassword(false);
    }
  };
  const onSignup=async(data)=>{
    setexist(false);
    // console.log("Signup done");
    // console.log(data);
    const request={
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({data})
    }
    const response=await fetch('http://localhost:3000/signup',request);
    const result=await response.json();
    console.log(result);
    if(result.message==="Error creating user"){
      // console.log("Email connect to other account");
      setexist(true);
    }
       
  }
  return (
    <div className="outerbody flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-white via-blue-200 to-indigo-500">
      {isLogin && (
        <div className="flex-grow flex items-center justify-center w-full">
          <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border border-purple-500">
            <div className="text-center">
              <h1 className="mb-2 text-2xl font-bold"><span className='text-blue-700'>B</span>ook <span className='text-blue-700'>S</span>wap</h1>
              <h2 className="mb-6 text-xl font-serif font-bold">Login</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">Email <span className='text-red-600'>*</span></label>
                <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="username@gmail.com" {...register('email', { required: true,minLength:{value:14,message:"email are to short"} })} onChange={(e)=>{
                  setvalidemail(true);

                }} />
                {errors.email && <span className="text-red-600">{errors.email.message}</span>}
                {!validemail && <span className='text-red-600'>{"Invalid Email, User not found"}</span>}
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">Password <span className='text-red-600'>*</span></label>
                <input className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="********" {...register('password', { required: true ,minLength:{value:8,message:"Password are too short"},maxLength:{value:16,message:"Password are too long"}})}  onChange={(e)=>{
                  setvalidpassword(true);
                }}/>
                {errors.password && <div className="text-red-600">{errors.password.message}</div> }
                {!errors.password && !validpassword && <div className='text-red-600 text-xs'>{"Wrong Password, Try again"}</div>}

              </div>
              <div className="mb-4">
                <button className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="submit">LOGIN</button>
              </div>
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">Don't have an account yet? <Button onClick={toggle}>Sign up</Button></p>
              </div>
            </form>
          </div>
        </div>
      )}
      {!isLogin && (
        <div className="flex-grow flex items-center justify-center w-full my-6">
          <div className="w-full max-w-4xl px-8 bg-white  shadow-lg rounded-2xl mx-6 ">
            <div className="text-center mb-6">
              <h1 className="mb-2 text-2xl font-bold font-serif">Book Swap</h1>
              <h2 className="text-2xl font-bold font-serif">Sign Up</h2>
            </div>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit(onSignup)}>
              <div className="flex items-center justify-center mb-4 md:col-span-2">
                <div className="w-24 h-24 rounded-full overflow-hidden border border-black">
                  <img id="avatar-preview" src={Avatar} alt="Avatar" className="w-full h-full object-fit rounded-xl" />
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="name">Name <span className='text-red-600'>*</span></label>
                <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="John Doe" {...register('name', { required: true })} />
                {errors.name && <span className="text-red-600">This field is required</span>}
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">Email <span className='text-red-600'>*</span></label>
                <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="username@gmail.com" {...register('email', { required: true,minLength:{value:14,message:"email are to short"}  })} />
                {errors.email && <span className="text-red-600">{errors.email.message}</span>}
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">Password <span className='text-red-600'>*</span></label>
                <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="********" {...register('password', { required: true,minLength:{value:8,message:"email are to short"},maxLength:{value:16,message:"Password is too long"} })} />
                {errors.password && <span className="text-red-600">{errors.password.message}</span>}
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="city">City <span className='text-red-600'>*</span></label>
                <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="city" type="text" placeholder="San Francisco" {...register('city', { required: true,minLength:{value:4} })} />
                {errors.city && <span className="text-red-600">This field is required</span>}
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="state">State <span className='text-red-600'>*</span></label>
                <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="state" type="text" placeholder="California" {...register('state', { required: true  })} />
                {errors.state && <span className="text-red-600">This field is required</span>}
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="pincode">Pincode <span className='text-red-600'>*</span></label>
                <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="pincode" type="text" placeholder="94101" {...register('pincode', { required: true ,minLength:{value:6,message:"email are to short"},maxLength:6 })} />
                {errors.pincode && <span className="text-red-600">Enter Pincode Correctly</span>}
              </div>
              <div className="mb-4 md:col-span-2">
                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="avatar">Avatar <span className='text-gray-400'>(supported format .jpg .png)</span></label>
                <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="avatar" type="file" {...register('avatar')} onChange={(e) => {
                  const preview = document.getElementById("avatar-preview");
                  preview.src = URL.createObjectURL(e.target.files[0]);
                }} />
              </div>

              <div className="mb-4 md:col-span-2">
              <div>
                {
                  exist && <div className='text-red-500 font-serif font-semibold text-md py-2 md-2'>{"* Email already in use. Please log in or use another email "}</div>
                }
              </div>
                <button className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="submit">Sign Up</button>
              </div>
              <div className="mt-6 mb-4 text-center md:col-span-2">
                <p className="text-sm text-gray-600">Already have an account? <Button onClick={toggle}>Login</Button></p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
