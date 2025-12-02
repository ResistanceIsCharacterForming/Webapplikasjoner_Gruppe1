"use client"

import { ReactNode } from "react"
import PresenterModal from "@/frontend/features/shared/components/presenters/PresenterModal"
import { ContainerChildrenProp } from "@/frontend/types/container"

/* Eget interface for funksjoner vi bruker for callback. */
interface ModalContainerCallbacks {
    onPrevious: () => void
    onForward: () => void
    onClose: () => void
}

/* Types for props til ModalContainer. Siden children er et JSX element brukes ReactNode. */
export interface PresenterModalProps extends ContainerChildrenProp {
    actions: ModalContainerCallbacks
}

/* Forvent et children element og et objekt kalt actions med callbacks. */
export default function ContainerModal({ children }: ContainerChildrenProp) {
    {/* Dette er den ytre "rammen" for alle modals. */}
    return (
        <>{children}</>
    )
}