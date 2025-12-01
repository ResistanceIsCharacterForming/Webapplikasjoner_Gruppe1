import type { LayoutProps } from 'rwsdk/router'
import AuthProvider from './AuthContext'

export interface UserContextType {
  userId: string | null
  isAuthenticated: boolean
  isAdmin: boolean
}


export function MainLayout({ children, requestInfo  }: LayoutProps) {

  const userId: any = requestInfo?.ctx.user
 
  const user: any = {userId: userId, isAuthenticated: true, isAdmin: false}

  console.log(requestInfo)

  return (
    
    <div className="app">

        <AuthProvider values={{userId: user, isAuthenticated: true, isAdmin: false}}>
            <main>{children}</main>
        </AuthProvider>

    </div>
    
  )

}