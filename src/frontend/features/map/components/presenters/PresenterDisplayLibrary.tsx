"use client"
import ReviewCard from "@/frontend/features/map/components/presenters/PresenterReviewCard";

import { library } from "@/backend/types/library"
import { reviewComponentData } from "@/backend/types/reviews";

interface PresenterLibraryProps {
  libraryData: library
  libraryImg: string
  reviewComponents: reviewComponentData[] | undefined
}

export default function PresenterLibrary({libraryImg, libraryData, reviewComponents}: PresenterLibraryProps) {
    console.log(reviewComponents)
    return (
        <article className="flex flex-wrap py-2 px-2">
          <section className="basis-4/5">
            <h2 className="font-prata text-xl">{libraryData.name}</h2>
            <span className="flex flex-wrap justify-start gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 sm:size-8 lg:size-12">
                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
              </svg>
              <p className="font-manrope">(Brukernavn)</p>
            </span>
          </section>
          <section className="basis-1/5 flex flex-wrap justify-end">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 sm:size-8 lg:size-12">
              <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
            </svg>
          </section>
          <section className="basis-full">
            <img className="size-4/5 m-auto" src={"data:image/png;base64," + libraryImg} />
          </section>
          <section className="basis-full mt-1">
            <label className="font-manrope text-blackChocolate" htmlFor="review">Ny anmeldelse:</label>
            <input
                name="review"
                id="review"
                type="text"
                placeholder = "Skriv her ..."
                className = "w-full border-blackChocolate border-1 p-1 focus:outline-none focus:shadow focus:border-darkVanilla rounded-md"
            />
          </section>
          <hr className="basis-full my-3"/>
          <section className="basis-1/2 mb-1">
            <p className="font-manrope">Anmeldelser ({reviewComponents !== undefined ? reviewComponents.length : 0})</p>
          </section>
          <section className="basis-full">
            {reviewComponents?.map((review) => {
              return <ReviewCard key={review.id} reviewData={review}/>
            })}
          </section>
        </article>
    )
}