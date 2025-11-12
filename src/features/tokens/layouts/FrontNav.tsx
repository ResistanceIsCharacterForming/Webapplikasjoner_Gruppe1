"use client"

export default function FrontNav() {

    return (
        <section className="flex flex-3 gap-3 sm:gap-15! w-auto">
            <a className="text-lg italic text-raisinBlack! hover:text-cedarChest!" href="./register">Register</a>
            <a className="text-lg italic text-raisinBlack! hover:text-cedarChest!" href="./login">Login</a>
            <a className="text-lg italic text-raisinBlack! hover:text-cedarChest!" href="./home">Kart</a>
        </section>
    )
}