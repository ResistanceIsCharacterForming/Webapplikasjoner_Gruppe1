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
    <>
    <Form
      className="mx-auto mt-5 p-4 border rounded"
      style={{ maxWidth: '400px' }}
      onSubmit={async (e) => {
        const formdata= new FormData()
        formdata.append("name",user.name)
        formdata.append("password",user.password)
        formdata.append("email",user.email)
      e.preventDefault()
        try {
          const result = await fetch("/api/v1/users", {
            method: "POST",
            body: formdata,
          })
          console.log( result)
          updateUser({name: "", password: "", email: ""})
        } catch (error) {
          console.error(error)
        }
      }}
    >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name:</Form.Label>
        <Form.Control 
          type="name"
          name="name"
          value={user.name}
          onChange={(e) =>
            updateUser({...user, name: e.target.value 
          })}
          placeholder="Enter name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={user.password}
          onChange={(e) =>
            updateUser({...user, password: e.target.value 
          })}
          placeholder="Password" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={user.email}
          onChange={(e) =>
            updateUser({...user, email: e.target.value 
          })}
          placeholder="Email" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
    </>
  )
}