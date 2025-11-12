"use client";

import { useState } from "react"

import '../../../styles/temp.css'

import 'bootstrap/dist/css/bootstrap.min.css'

export default function LoginScreen() {

  type detailsForm = {
    password: string;
    email: string;
  }

  const [ details, updateDetails ] = useState<detailsForm>({password: "", email: ""})

  const onCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const result = await fetch("/api/v1/tokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      })
      console.log(result)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <article className="bg-timberwolf shadow-lg border-raisinBlack border-1 rounded-bl-lg rounded-tr-lg m-auto w-auto row-span-2 p-3 sm:p-5! sm:w-lg!">
      <h2 className="text-burntUmber! font-prata pb-3">Logg deg på Bokkroken</h2>
      <form onSubmit={onCreateUser}>
      <section className="pb-3">
        <label className="font-manrope text-raisinBlack" htmlFor="password">Passord:</label>
        <input
          className = "w-full border-raisinBlack border-1 p-1 focus:outline-none focus:shadow focus:border-cedarChest rounded-md"
          placeholder="Skriv her ..."
          required
          type="password"
          id="password"
          name="password"
          value={details.password}
          onChange={(e) => updateDetails({...details, password: e.target.value })}
        />
      </section>
      <section className="pb-3">
        <label className="font-manrope text-raisinBlack" htmlFor="email">Email:</label>
        <input
          className = "w-full border-raisinBlack border-1 p-1 focus:outline-none focus:shadow focus:border-cedarChest rounded-md"
          placeholder="Skriv her ..."
          required
          type="email"
          id="email"
          name="email"
          value={details.email}
          onChange={(e) => updateDetails({...details, email: e.target.value })}
        />
      </section>
      <button className="font-manrope py-2 px-3 font-bold text-timberwolf bg-burntUmber hover:bg-cedarChest rounded-lg" type="submit">Logg på</button>
    </form>
    </article>
  )
}