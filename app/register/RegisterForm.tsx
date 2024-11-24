"use client";

import { signIn } from 'next-auth/react';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

import Container from "../Component/Container";
import Heading from "../Component/Heading";
import Input from "../Component/Input/Input";
import Button from "../Component/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";

import { safeUser } from '@/types';

interface RegisterFormProps {
  currentUser: safeUser | null;
}

const Registerform: React.FC<RegisterFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  useEffect(() => {
    console.log("currentUser:", currentUser); // Debug
    if (currentUser) {
      router.push("/Cart");
      router.refresh();
    }
  }, [currentUser]);

  const onsubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios.post('/api/register', data)
      .then(() => {
        toast.success('Account created');
        signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            toast.success("Logged in");
            router.replace('/cart'); // Replaces history
          }
          if (callback?.error) {
            toast.error(callback.error);
          }
        });
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setIsLoading(false));
  };

  if (currentUser) {
    return <p className="text-center">Logged in. Redirecting....</p>;
  }

  return (
    <>
      <Heading title="Sign up for Dsquare" />
      <Button
        outline
        label="Sign up with Google"
        icon={AiOutlineGoogle}
        onclick={() => { signIn('google'); }}
      />
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
        <Button label={isLoading ? "Loading..." : 'Sign Up'} onclick={handleSubmit(onsubmit)} />
      </div>
      <p>
        Already have an account? <Link className="underline" href="/login">Log in</Link>
      </p>
    </>
  );
};

export default Registerform;
