"use client"

import { ReactNode } from "react"

interface LibrariesContainerInterface {
    children: ReactNode | ReactNode[]
}

export default function LibrariesContainer({ children }: LibrariesContainerInterface) {

    return (
        <section className="bg-lotion w-[75%] h-[90%] absolute z-10 border border-blackChocolate rounded-lg">
            {children}
        </section>
    )
}