"use client"

export default function AdminNav() {
 
    return (
        <div className="col-span-5 content-center  row-start-1">
            <section className="grid grid-cols-3 gap-30 sm:gap-[25vw]! w-full " >
                <a className="text-lg italic text-blackChocolate! hover:text-darkVanilla!" href="./login">Login</a>
                <a className="text-lg italic text-blackChocolate! hover:text-darkVanilla!" href="./home">Kart</a>
                <a className="text-lg italic text-blackChocolate! hover:text-darkVanilla!" href="./dashboard">Dashboard</a>
            </section>
        </div>
    )
}