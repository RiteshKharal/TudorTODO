'use client';
import React, { useState, useEffect, ReactElement } from 'react'
import * as fonts from '@/app/font/fonts'
import { MdAccountCircle } from "react-icons/md";
import { redirect, useRouter } from 'next/navigation';
import { signIn, signUp, useSession } from '../lib/auth-client';
import { Loader, X } from 'lucide-react';

type AccManagerProps = {
  cardtype: string
}

type UserType = {
  id: string
  email: string
  name: string
  password: string
}

interface FormErrorTypes{
  action : String | null
  message : String | null
}

type AuthError = {
  code?: string
  message?: string
  status: number
  statusText: string
}

export default function Accmanager({ cardtype }: AccManagerProps) {
  

  const router = useRouter();
  const { data: user, isPending} =  useSession(); 
  const [lstype, setLstype] = useState<string | null>(null)
  const [out,setOut] = useState<ReactElement | null >(null)
  const [FormError, setFormError] = useState<null | AuthError | string>()
  const [loading , setLoading] = useState<boolean>(false)

  function ValidateData(formdata : FormData, exclude : string | null = null){
    const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const nameRegex = /^[a-zA-Z\s'-]{2,50}$/
    const email = EmailRegex.test(String(formdata.get('email'))) ? formdata.get('email') : null
    const name = nameRegex.test(String(formdata.get('name'))) ? formdata.get('name') : null
    const pass = formdata.get('password')

   if(!email && exclude!=='email'){
    setFormError('Invalid Email.')
   }else if(!name && exclude!=='name'){
    setFormError('Invalid Name.')
   }else if(!pass && exclude!=='password'){
    setFormError('Invalid Password.')
   }else{
    return formdata
   }

   return null
  }

  async function HandleSignSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formdata = new FormData(event.currentTarget)
    const ValidatedData = ValidateData(formdata)
    setLoading(true)

    if(!ValidatedData?.get('name') && !ValidatedData?.get('password') && !ValidatedData?.get('email')){    
      FormError ?? setFormError('Missing valid Info'); 
      setLoading(false);
      return
    }

    const name = ValidatedData.get('name')?.toString() ?? ''
    const email = ValidatedData.get('email')?.toString() ?? ''
    const password = ValidatedData.get('password')?.toString() ?? ''

    const { data, error } = await signUp.email({
      name: name,
      email: email,
      password: password,
    })

    if(error) setFormError(error || "Something went wrong!"); setLoading(false)

    if (data) {
      setLstype(null)
      setFormError(null)
      setLoading(false)
      router.push('/')
    }
  }

  async function HandleLogSubmit(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true)
    setFormError(null)
    event.preventDefault()
    const formdata = new FormData(event.currentTarget)
    const ValidatedData = ValidateData(formdata, 'name')
    

    if(!ValidatedData?.get('password') && !ValidatedData?.get('email')){
        setFormError('Missing valid Info');
        setLoading(false)
      return
      }

    const email = ValidatedData.get('email')?.toString() ?? ''
    const password = ValidatedData.get('password')?.toString() ?? ''

    const { data, error } = await signIn.email({
      email: email,
      password: password,
    })

    if(error) setFormError(error || "Something went wrong!"); setLoading(false)

    if (data) {
      setLstype(null)
      setLoading(false)
      setFormError(null)
      router.push('/')
    }
  }
  
        function Login({ close }: { close: () => void }) {
            
            return (
                <div className="relative w-full max-w-md text-primary rounded-2xl p-8 flex flex-col bg-secondary transition-transform">

                <button
                    onClick={close}
                    className="absolute top-4 left-4 text-sm opacity-70 hover:opacity-100 cursor-pointer"
                >
                    <X />
                </button>

                <h2 className="text-xl font-semibold text-center mb-8">
                    Log onto Account
                </h2>

              <form onSubmit={HandleLogSubmit}>
                <div className="flex flex-col gap-5 flex-1">
                  <div className='transition-transform'>
                    <input
                    type="email"
                    placeholder="Email"
                    className={`w-full p-3 rounded-lg outline-none focus:ring-1  border border-border ${FormError ? 'focus:ring-primary/20':'focus:ring-primary/10'} `}
                    name='email'
                    required
                    />
                  </div>
                    

                    <div className='transition-transform'>
                      <input
                      type="password"
                      placeholder="Password"
                      name='password'
                      className="w-full p-3 rounded-lg outline-none focus:ring-1 focus:ring-primary/10 border border-border"
                      required
                      />

                    <span className={`font-medium leading-relaxed text-sm ml-2 mt-4 italic text-start block ${fonts.workSans.className} transition-transform animate-[FlowIn_0.4s_ease_forwards]`}>
                      { typeof FormError === 'string'  ? FormError : FormError?.message}
                      </span>
                    </div>
                </div>

                <button
                  type="submit"
                  className="mt-8 w-20 p-3 rounded-xl font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-center text-center">
                    {loading ? (
                      <Loader className="animate-[spin_2s_linear_infinite] transition-transform" />
                    ) : (
                      'Log in'
                    )}
                  </div>
                </button>
                </form>

                <small className='mt-5 '><button onClick={()=>{setLstype('SignUp'); setFormError(null)}} className='cursor-pointer'>Don't have a account? Click here to sign up</button></small>

                </div>
            
            )
        }

        function Signup({ close }: { close: () => void }) {
            return (
                <div className="relative w-full max-w-md text-primary rounded-2xl p-8 flex flex-col bg-secondary transition-transform">

                <button
                    onClick={close}
                    className="absolute top-4 left-4 text-sm opacity-70 hover:opacity-100 cursor-pointer"
                >
                    <X />
                </button>

                <h2 className="text-xl font-semibold text-center mb-8">
                    Create Account
                </h2>

                <form onSubmit={HandleSignSubmit}>

                <div className="flex flex-col gap-5 flex-1">
                  

                <div className='transition-transform'>
                  <input
                  type="text"
                  name="name"
                  placeholder="Username"
                  className="w-full p-3 rounded-lg text-foreground outline-none focus:ring-1 focus:ring-primary/10 transition-all border border-border"
                />

                </div>

                

                <div className='transition-transform'>
                  <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full p-3 rounded-lg text-foreground outline-none focus:ring-1 focus:ring-primary/10 transition-all border border-border" 
                />

                </div>

               

                <div className='transition-transform'>
                   <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full p-3 rounded-lg text-foreground outline-none focus:ring-1 focus:ring-primary/10 transition-all border border-border"
                />
                <span className={`font-medium leading-relaxed text-sm ml-2 mt-1 italic text-start block ${fonts.workSans.className} animate-[FlowIn_0.4s_ease_forwards]`}>
                      { typeof FormError === 'string'  ? FormError : FormError?.message}

                </span>
                </div>
                </div>

                <button
                  type="submit"
                  className="mt-8 w-30 p-3 rounded-xl font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-center text-center">
                    {loading ? (
                      <Loader className="animate-[spin_2s_linear_infinite] transition-transform" />
                    ) : (
                      'Sign Up'
                    )}
                  </div>
                </button>

              </form>
                <small><button onClick={()=>{setLstype('Login'); setFormError(null)}} className='mt-5 cursor-pointer'>Already got a account? Click here to login</button></small>

                </div>
            )
        }
        
        
        function options() {
  user
    ? setOut(
        <div
          className={`
            flex items-center gap-2
            rounded-2xl
            backdrop-blur-md
            transition-all duration-200
            cursor-pointer
            ${fonts.comfortaa.className}
          `}
        >
          <MdAccountCircle className="text-2xl text-primary" />
          <span className="text-[1rem] font-medium">
            {user.user.name}
          </span>
        </div>
      )
    : setOut(
        <div
          onClick={() => setLstype("Signup")}
          className={`
            rounded-2xl
            text-primary
            text-sm font-semibold
            hover:shadow-lg
            hover:scale-105
            transition-all duration-200
            cursor-pointer
            ${fonts.cabin.className}
          `}
        >
          Sign Up
        </div>
      );
}

        useEffect(options,[user])  


  return (
    <>

    

      {out}

      {lstype && (
        <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm">
          {lstype === 'Login'
            ? <Login close={() => setLstype(null)} />
            : <Signup close={() => setLstype(null)} />
          }
        </div>
      )}
    </>
  )
}
