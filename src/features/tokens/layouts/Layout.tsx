import type { LayoutProps } from 'rwsdk/router'
import { AuthProvider } from "@/features/tokens/layouts/AuthContext"

export function MainLayout({ children, requestInfo }: LayoutProps) {

  const user: string = requestInfo?.ctx?.user?.id ?? ""

  return (

    <div className="app">

        <AuthProvider.Provider value={user}>
            <main>{children}</main>
        </AuthProvider.Provider>

    </div>

  );

}