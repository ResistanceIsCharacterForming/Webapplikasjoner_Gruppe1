"use client"

import { useNavigate } from "react-router"

export const manipulateUrl = (goto: string) => {
    console.log(goto)
    const navigate = useNavigate();
    navigate(goto)
}