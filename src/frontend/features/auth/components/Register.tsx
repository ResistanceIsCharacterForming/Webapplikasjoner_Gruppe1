"use client";

import { useRandomNameGenerator } from "@/backend/features/shared/utils/useRandomNameGenerator";
import { useEffect, useState } from "react"

import { navigate } from "rwsdk/client";

/* Denne komponenten skulle fulgt presenter-container designmønsteret om vi hadde tid. */
/* Komponent for å lage ny bruker. */
export default function RegisterScreen() {

  /* Standard form handling. Vi benytter state for å huske verdien i selve formen etterhvert som bruker skriver. */

  type userForm = {
    name: string;
    password: string;
    email: string;
  }

  const [ user, setUser ] = useState<userForm>({name: "", password: "", email: ""})

  /* Vår egen handling når form skulle bli sendt av bruker */
  const onCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const userFormData = new FormData

    userFormData.append("name", user.name)
    userFormData.append("password", user.password)
    userFormData.append("email", user.email)

    /* Her gjør vi et nettverskall mot vår API-løsning. Vi har brukte både dette og React serverside components bevist i forskjellige sammenhenger.  */
    try {
      const result = await fetch("/api/v1/users", {
        method: "POST",
        body: userFormData,
      })
      if(result.ok){
        setUser({name: "", password: "", email: ""})
        navigate("/login")
      }
      else alert("Feilet å lage ny bruker.")
    } catch (error) {
    }
  }

  const callbackForUser = (value: string, type: string) => {

    const key = type as keyof userForm

    setUser(prevUser => ({
    ...prevUser,
    [key]: value
    }))
  }

  type inputFields = {
    label: string, name: string, type: string
  }

  const fields: inputFields[] = [
    { label: "Navn", name: "name", type: "text" },
    { label: "Epost", name: "email", type: "email" },
    { label: "Password", name: "password", type: "password" },
  ]
  
  useEffect(() => {
    const initialName = useRandomNameGenerator()
    callbackForUser(initialName, "name")
  },[])
  
  return (
    <article className="bg-lotion shadow-md border-darkVanilla border-1 rounded-bl-lg rounded-tr-lg m-auto w-auto row-span-2 p-3 sm:p-5 sm:w-lg">
        <h2 className="text-oldRose text-2xl font-prata pb-3">Registrer en ny bruker</h2>
        <form onSubmit={onCreateUser}>
          <section className="pb-3">
            {fields.map((field) => (
              <article className="my-3">
                <label className="font-manrope text-blackChocolate" htmlFor={field.type}>{field.label}:</label>
                  <input
                  className = "w-full border-blackChocolate border-1 p-1 focus:outline-none focus:shadow focus:border-darkVanilla rounded-md"
                  placeholder= "Skriv her ..."
                  required
                  key={field.name}
                  type={field.type}
                  id={field.type}
                  name={field.type}
                  value={user[field.name as keyof userForm]}
                  onChange={(e) => callbackForUser(e.target.value, field.name)}
                />
              </article>
            ))}
          </section>
          <button className="font-manrope border-2 rounded-xl border-darkVanilla py-2 px-3 font-semibold text-darkChocolate bg-oldRose hover:bg-darkVanilla" type="submit">Lag bruker</button>
        </form>
    </article>
  )
}