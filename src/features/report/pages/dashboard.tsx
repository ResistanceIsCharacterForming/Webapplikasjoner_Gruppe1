"use client"

import { check } from "drizzle-orm/gel-core"
import { useEffect, useState } from "react"

export default function DashboardScreen() {

    const [ auth, setAuth ] = useState()

    useEffect(() => {
        const checkAuth = async () => {
        try {
            const response = await fetch("/api/v1/tokens", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
/*
            if (!response.success) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
*/
            const data = await response
            console.log("Admin data:", data);
        } catch (error) {
            console.error(error);
        }
        }
        checkAuth()
    }, [])

    return (
        <h2>Øyeblikk, autorisere.</h2>
    )
}