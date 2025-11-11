import type { LayoutProps } from 'rwsdk/router'

export function SplashLayout({ children, requestInfo }: LayoutProps) {

  const user: string = requestInfo?.ctx?.user?.id ?? ""

  return (

    <div className="app">
      
        <main>{children}</main>

    </div>

  );

}