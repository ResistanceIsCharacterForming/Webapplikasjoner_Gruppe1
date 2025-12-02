"use client"

import { logo } from "@/db/base64backups";

export default function Landing() {

    return (
        <section className="h-screen bg-gradient-to-l from-blackChocolate via-darkVanilla to-purple-lotion">
                <section className="flex justify-start items-center h-full gap-5 mx-auto w-[80%]">
                    <article className="basis-2/5">
                        <h1 className="font-prata text-oldRose text-6xl pb-3">Bokkroken</h1>
                        <p className="font-manrope">Velkommen til en verden av bøker.</p>
                        <span className="block text-center text-lg text-lotion hover:text-darkVanilla! bg-oldRose h-auto mt-4 p-3"><a href="/login">Gå videre</a></span>
                    </article>
                    <section className="basis-3/5">
                         <img className="inline-block" src={"data:image/png;base64,"+logo} />
                    </section>
                </section>
        </section>
    )
}