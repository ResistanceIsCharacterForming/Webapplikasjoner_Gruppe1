"use client"

export default function AdminNav() {
 
    return (
        <div className="col-span-5 content-center">
            <section className="flex flex-3 gap-[25vw] sm:gap-[25vw]! w-full " >
                <a className="text-lg italic text-blackChocolate! hover:text-darkVanilla!" href="./register">Register</a>
                <a className="text-lg italic text-blackChocolate! hover:text-darkVanilla!" href="./login">Login</a>
                <a className="text-lg italic text-blackChocolate! hover:text-darkVanilla!" href="./home">Kart</a>
                <a className="text-lg italic text-blackChocolate! hover:text-darkVanilla!" href="./dashboard">dashboard</a>
            </section>
        </div>
    )
}