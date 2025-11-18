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

  return (
    <>

    <Form
      className="mx-auto mt-5 p-4 border rounded"
      style={{ maxWidth: '400px' }}
      onSubmit={async (e) => {
      e.preventDefault()
        try {
          const result = await fetch("/api/v1/tokens", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(details),
          }
        )
          updateDetails({password: "", email: ""})
        } catch (error) {
          console.error(error)
        }
      }}
    >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control 
          type="email"
          name="email"
          value={details.email}
          onChange={(e) =>
            updateDetails({...details, email: e.target.value 
          })}
          placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={details.password}
          onChange={(e) =>
            updateDetails({...details, password: e.target.value 
          })}
          placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
    </>
  )
}