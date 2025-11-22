"use client"

export default function Landing() {

    const splashImgs = [
        "s1.jpg",
        "s2.jpg",
        "s3.jpg",
        "s4.jpg",
        "s5.jpg",
        "s6.jpg",
        "s7.jpg",
        "s8.jpg",
        "s9.jpg",
        "s10.jpg",
        "s11.jpg",
        "s12.jpg",
        "s13.jpg",
        "s14.jpg",
        "s15.jpg",
        "s16.jpg",
        "s17.jpg",
        "s18.jpg",
        "s19.jpg",
        "s20.jpg",
        "u.jpg",
        "b.jpg"
    ]

    const getRandomImg = () => {
        const randomNumber = Math.floor(Math.random() * splashImgs.length);
        return splashImgs[randomNumber]
    }

    const splashImg = getRandomImg()

    return (
        <section className="h-screen bg-gradient-to-l from-blackChocolate via-darkVanilla to-purple-lotion">
                <section className="flex justify-start items-center h-full gap-5 mx-auto w-[80%]">
                    <article className="basis-2/5">
                        <h1 className="font-prata text-oldRose text-6xl pb-3">Bokkroken</h1>
                        <p className="font-manrope">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non est ac enim bibendum mollis. Aliquam cursus nibh interdum lacus aliquet faucibus. Integer nec commodo tellus. Duis nisl ante, sodales quis vehicula id, bibendum non augue. Praesent vel scelerisque leo. Phasellus tristique iaculis nunc, a mollis mauris convallis at. </p>
                        <span className="block text-center text-lg text-lotion hover:text-darkVanilla! bg-oldRose h-auto mt-4 p-3"><a href="/login">Gå videre</a></span>
                    </article>
                    <section className="basis-3/5">
                        <img className="border-1 border-solid border-oldLace rounded-md inline-block" src={`src/features/libraries/pages/img/${splashImg}`} />
                    </section>
                </section>
        </section>
    )
}