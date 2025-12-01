"use client"

import { ReactNode } from "react"

/* Eget interface for funksjoner vi bruker for callback. */
interface ModalContainerCallbacks {
    onPrevious: () => void
    onForward: () => void
    onClose: () => void
}

/* Types for props til ModalContainer. Siden children er et JSX element brukes ReactNode. */
interface ModalContainerProps {
    children: ReactNode,
    actions: ModalContainerCallbacks
}

/* Forvent et children element og et objekt kalt actions med callbacks. */
export default function ModalContainer({ children, actions }: ModalContainerProps) {
    {/* Dette er den ytre "rammen" for alle modals. */}
    return (
        <article className="bg-lotion w-[75%] h-[90%] overflow-scroll absolute z-10 border border-blackChocolate rounded-lg">
            <section className="flex wrap bg-lotion px-2 m-0 sticky my-1 top-0 border-b-2 border-blackChocolate">
                <svg className="size-6 w-[15%] h-[15%]" onClick={actions.onPrevious} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z" clipRule="evenodd" />
                </svg>
                <svg className="size-6 w-[15%] h-[15%]" onClick={actions.onForward} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z" clipRule="evenodd" />
                </svg>
                <svg className="size-6 w-[15%] h-[15%] ml-auto" onClick={actions.onClose} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                </svg>
            </section>
            {children}
        </article>
    )
}