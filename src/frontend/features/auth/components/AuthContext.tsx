"use client"

import { createContext, ReactNode } from "react";

export interface UserContextType {
  userId: string | undefined
  isAdmin: boolean
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
  values: UserContextType
}

export default function AuthProvider({ children, values }: AuthProviderProps) {

  return (
    <UserContext.Provider value={ values }>
      {children}
    </UserContext.Provider>
  );
}
