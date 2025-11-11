"use client"
import { createContext } from "react"

export const AuthContext  = createContext<string>("")
/*
export function AuthProvider({userId}: { userId: string }) {
    return (
        <AuthContext value={{ userId }}>{children}</AuthContext>
    )
}*/