import type { LayoutProps } from 'rwsdk/router'

import FrontNav from "@/frontend/features/shared/components/FrontNav"

export function FrontLayout({ children, requestInfo }: LayoutProps) {

  return (

    <main className="grid grid-cols-1 grid-rows-3 place-items-center grid-flow-row">
      <FrontNav/>
      {children}
    </main>

  );

}