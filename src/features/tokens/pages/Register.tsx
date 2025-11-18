"use client";

import { useState } from "react"

import InputFieldAuth from "@/shared/frontend/InputFieldAuth";

export default function RegisterScreen() {

  type userForm = {
    name: string;
    password: string;
    email: string;
  }

  const [ user, setUser ] = useState<userForm>({name: "", password: "", email: ""})

  const onCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const userFormData = new FormData

    userFormData.append("name", user.name)
    userFormData.append("password", user.password)
    userFormData.append("email", user.email)

    setUser({name: "", password: "", email: ""})

    /*
    try {
      const result = await fetch("/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
      console.log(result)
    } catch (error) {
      console.error(error)
    }*/
  }

  const callbackForUser = (value: string, type: string) => {

    const key = type as keyof userForm

    setUser(prevUser => ({
    ...prevUser,
    [key]: value
    }))
    
  }

  return (
    <article className="bg-lotion shadow-md border-darkVanilla border-1 rounded-bl-lg rounded-tr-lg m-auto w-auto row-span-2 p-3 sm:p-5 sm:w-lg">
        <h2 className="text-oldRose! font-prata pb-3">Registrer en ny bruker</h2>
        <form onSubmit={onCreateUser}>
        <section className="pb-3">
          <InputFieldAuth params={{labelTitle : "Name", inputType : "name", onChangeCallBack: callbackForUser}}/>
        </section>
        <section className="pb-3">
          <InputFieldAuth params={{labelTitle : "Passord", inputType : "password", onChangeCallBack: callbackForUser}}/>
        </section>
        <section className="pb-3">
          <InputFieldAuth params={{labelTitle : "Epost", inputType : "email", onChangeCallBack: callbackForUser}}/>
        </section>
        <button className="font-manrope border-2 rounded-xl border-darkVanilla py-2 px-3 font-semibold text-darkChocolate bg-oldRose hover:bg-darkVanilla" type="submit">Lag bruker</button>
      </form>
    </article>
  )
}