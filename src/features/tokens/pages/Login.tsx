"use client";

import { useState } from "react"

import InputFieldAuth from "@/shared/frontend/InputFieldAuth";

export default function LoginScreen() {

  type detailsForm = {
    password: string;
    email: string;
  }

  const [ details, setDetails ] = useState<detailsForm>({password: "", email: ""})

  const onCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const detailsFormData = new FormData

    detailsFormData.append("password", details.password)
    detailsFormData.append("email", details.email)

    setDetails({password: "", email: ""})
  
    try {
      const result = await fetch("/api/v1/tokens", {
        method: "POST",
        body: detailsFormData,
      })
      console.log(result)
    } catch (error) {
      console.error(error)
    }
  }

  const callbackForDetails = (value: string, type: string) => {

    const key = type as keyof detailsForm

    setDetails(prevDetails => ({
    ...prevDetails,
    [key]: value
    }))

  }

  return (
    <article className="container mx-md bg-lotion shadow-md border-darkVanilla border-1 rounded-bl-lg rounded-tr-lg m-auto w-auto row-span-2 p-3 sm:p-5 sm:w-lg">
      <h2 className="text-oldRose text-2xl font-prata pb-3">Logg deg på Bokkroken</h2>
      <form onSubmit={onCreateUser}>
      <section className="pb-3">
       <InputFieldAuth params={{labelTitle : "Passord", inputType : "password", onChangeCallBack: callbackForDetails}}/>
      </section>
      <section className="pb-3">
        <InputFieldAuth params={{labelTitle : "Epost", inputType : "email", onChangeCallBack: callbackForDetails}}/>
      </section>
      <button className="font-manrope border-2 rounded-xl border-darkVanilla py-2 px-3 font-semibold text-darkChocolate bg-oldRose hover:bg-darkVanilla" type="submit">Logg på</button>
    </form>
    </article>
  )
}