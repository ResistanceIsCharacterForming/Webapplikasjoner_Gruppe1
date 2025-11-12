"use client";

import { useState } from "react"

import '../../../styles/temp.css'

import 'bootstrap/dist/css/bootstrap.min.css'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

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
    <article>
      <form onSubmit={onCreateUser}>
        <section>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={details.password}
            onChange={(e) => updateDetails({...details, password: e.target.value })}
          />
        </section>
        <section>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={details.email}
            onChange={(e) => updateDetails({...details, email: e.target.value })}
          />
        </section>
        <button type="submit">Login</button>
      </form>
    </article>
  )
}