"use client"

import { useEffect, useState } from "react"

export default function DashboardScreen() {

    const [ auth, setAuth ] = useState(null)

    useEffect(() => {


        const checkAuth = async () => {

            const token = ""
            
            try {

                const response = await fetch("/api/v1/tokens", {
                    method: "GET",
                    credentials: "include",
                })

                const id: any = await response.json()

                setAuth(id)



            } catch (error) {
                console.error(error);
            }

        }

        checkAuth()

    }, [])

    if (!auth) return (<h2>Øyeblikk, autorisere.</h2>)
    if (auth) return(<h2>You are supposed to be here : )</h2>)
}