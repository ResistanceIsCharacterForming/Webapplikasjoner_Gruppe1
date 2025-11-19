"use client";

import { useState } from "react"

import 'bootstrap/dist/css/bootstrap.min.css'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export default function RegisterScreen() {

  type userForm = {
    name: string;
    password: string;
    email: string;
  }

  const [ user, updateUser ] = useState<userForm>({name: "", password: "", email: ""})

  const onCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const result = await fetch("/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
      console.log(await result)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={onCreateUser}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
           onChange={(e) => updateUser({...user, name: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
        id="password"
        onChange={(e) => updateUser({...user, password: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
           id="email"onChange={(e) => updateUser({...user, email: e.target.value })}
        />
      </div>
      <button type="submit">Create new user</button>
    </form>
  )
}