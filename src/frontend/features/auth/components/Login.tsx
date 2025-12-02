"use client";

import { useState } from "react"
import { navigate } from "rwsdk/client";

/* Denne komponenten skulle fulgt presenter-container designmønsteret om vi hadde tid. */
/* Komponent for å logge inn med en bruker. */
export default function LoginScreen() {

  /* Standard form handling. Vi benytter state for å huske verdien i selve formen etterhvert som bruker skriver. */

  type detailsForm = {
    password: string;
    email: string;
  }

  const [ details, setDetails ] = useState<detailsForm>({password: "", email: ""})

  /* Vår egen handling når form skulle bli sendt av bruker */
  const onCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const detailsFormData = new FormData

    detailsFormData.append("password", details.password)
    detailsFormData.append("email", details.email)
  
    /* Her gjør vi et nettverskall mot vår API-løsning. Vi har brukte både dette og React serverside components bevist i forskjellige sammenhenger.  */
    try {
      const result = await fetch("/api/v1/tokens", {
        method: "POST",
        body: detailsFormData,
      })
    if(result.ok){
      setDetails({password: "", email: ""})
      navigate("/home")
    }
    else alert("Feilet å logge in sjekk passord eller epost.")
    } catch (error) {
    }
  }

  const callbackForDetails = (value: string, type: string) => {

    const key = type as keyof detailsForm

    setDetails(prevDetails => ({
    ...prevDetails,
    [key]: value
    }))

  }

  type inputFields = {
    label: string, name: string, type: string
  }
  const fields: inputFields[] = [
    { label: "Epost", name: "email", type: "email" },
    { label: "Password", name: "password", type: "password" }
  ]

  return (
    <article className="container mx-md bg-lotion shadow-md border-darkVanilla border-1 rounded-bl-lg rounded-tr-lg m-auto w-auto row-span-2 p-3 sm:p-5 sm:w-lg">
      <h2 className="text-oldRose text-2xl font-prata pb-3">Logg deg på Bokkroken</h2>
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
                value={details[field.name as keyof detailsForm]}
                onChange={(e) => callbackForDetails(e.target.value, field.type)}
              />
            </article>
          ))}
        </section>
      <button className="font-manrope border-2 rounded-xl border-darkVanilla py-2 px-3 font-semibold text-darkChocolate bg-oldRose hover:bg-darkVanilla" type="submit">Logg på</button>
    </form>
    </article>
  )
}