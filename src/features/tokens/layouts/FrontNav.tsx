"use client"

export default function FrontNav() {

    return (
        <section className="flex flex-3 gap-3 sm:gap-15! w-auto">
            <a className="text-lg italic text-blackChocolate! hover:text-darkVanilla!" href="./register">Register</a>
            <a className="text-lg italic text-blackChocolate! hover:text-darkVanilla!" href="./login">Login</a>
            <a className="text-lg italic text-blackChocolate! hover:text-darkVanilla!" href="./home">Kart</a>
        </section>
    )
}