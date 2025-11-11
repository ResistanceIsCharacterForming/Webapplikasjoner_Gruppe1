"use client"
import type { LayoutProps } from 'rwsdk/router'
/*import { AuthProvider } from "@/features/tokens/layouts/AuthContext"*/

export default function MainLayout({ children, requestInfo }: LayoutProps) {
  
  const user: any = requestInfo?.ctx?.user ?? ""

  return (
    <></>
/*
    <div className="app">

        <AuthProvider value={user}>
            <main>{children}</main>
        </AuthProvider>

    </div>
*/
  )

}