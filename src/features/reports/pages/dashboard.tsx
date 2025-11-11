"use client"

import { useEffect, useState } from "react"

/* Dette er en side for å teste auth for pages. */
export default function DashboardScreen() {

    const [ auth, setAuth ] = useState(null)

    /* Tror ikke vi kan komme unna useEffect på grunn av HttpOnly */
    useEffect(() => {

        const checkAuth = async () => {

            const token = ""
            
            try {

                /* Vi må bruke credentials her på grunn av at HttpOnly er satt i cookie. */
                const response = await fetch("/api/v1/tokens", {
                    method: "GET",
                    credentials: "include",
                })

                const id: any = await response.json()

                /* Vi får tilbake pålogget bruker sin id hvis auth virker */
                setAuth(id)

            } catch (error) {
                console.error(error);
            }

        }

        checkAuth()

    }, [])

    /* Render en av to sider, utifra om auth har en verdi */
    if (!auth) return (<h2>Øyeblikk, autorisere.</h2>)
    if (auth) return(<h2>You are supposed to be here : )</h2>)
}