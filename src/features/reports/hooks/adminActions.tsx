

export async function deleteReport (id:number) {
     const result = await fetch("http://localhost:5173/api/v1/reports/"+id.toString(), {
        method: "delete",
        })
    return result.status
}

export async function deleteUserFromReport (id:string) {
    const result = await fetch("http://localhost:5173/api/v1/users/"+id, {
        method: "delete",
        })
    return result.status
}

export async function deleteReviewFromReport (id:number) {
  const result = await fetch("http://localhost:5173/api/v1/reviews/"+id.toString(), {
        method: "delete",
        })
    return result.status
    
}

export async function deleteLibaryFromReport (id:string) {
      const result = await fetch("http://localhost:5173/api/v1/libraries/"+id, {
        method: "delete",
        })
    return result.status

}