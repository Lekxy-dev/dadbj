"use client"

import {signIn} from 'next-auth/react'
import { useState } from "react";
import Container from "../Component/Container";
import Heading from "../Component/Heading";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../Component/Input/Input";
import Button from "../Component/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';





const Registerform = () => {
    const [isLoading, setIsLoading] = useState(false);

    const {register,handleSubmit, formState:{errors}} = useForm<FieldValues>({
      defaultValues: {
        name: "",
        email: "",
        password: "",
      }
    })
    const router = useRouter()
    const onsubmit:SubmitHandler<FieldValues> = (data) => {
      setIsLoading(true);
      axios.post('/api/register', data).then(() => {
        toast.success('Account created')

        signIn('credentials',
          {
            email: data.email,
            password: data.password,
            redirect: false,
          }
        ).then((callback) => {
          if(callback?.ok){
            router.push('/Cart')
           router.refresh()
           toast.success("Logged in")
          }
          if(callback?.error){
            toast.error(callback.error)
          }
        })
      }).catch(() => toast.error("something went wrong")).finally(() => setIsLoading(false))
    }
    return (
        <>
         <Heading title="Sign up for Dsquare"/>
         <Button  outline label="Sign up with Google" icon={AiOutlineGoogle} onclick={() => {}}/>
         <hr className="bg-slate-300 w-full h-px" />
         <div className="mt-6 w-full space-y-4"> 
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Button label= {isLoading ? "Loading" : 'Sign Up'} onclick={handleSubmit(onsubmit)} />
    </div>
    <p>
      Already have an account? <Link className="underline" href="/login">Log in</Link>
    </p>
        </>
    );
}
 
export default Registerform;