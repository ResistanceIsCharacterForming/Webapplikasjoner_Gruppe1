import * as z from "zod"

export const validateId = z.uuid()
    .refine(value => value !== null, { error: "Cannot be null.", abort: true })
    .refine(value => value.length > 0 && value.trim().length > 0, { error: "Cannot be empty.", abort: true })

export const validateName = z.string()
    .refine(value => value !== null, { error: "Cannot be null.", abort: true })
    .refine(value => value.length > 0 && value.trim().length > 0, { error: "Cannot be empty.", abort: true })
    .refine(value => value.trim().length <= 150, { error: "Cannot contain more than 150 characters.", abort: true })

export const validateLongitude = z.number()
    .refine(value => value !== null, { error: "Cannot be null.", abort: true })
    .refine(value => value >= -180, { error: "Cannot be lower than -180.", abort: true })
    .refine(value => value <= 180, { error: "Cannot be higher than 180.", abort: true })

export const validateLatitude = z.number()
    .refine(value => value !== null, { error: "Cannot be null.", abort: true })
    .refine(value => value >= -90, { error: "Cannot be lower than -90.", abort: true })
    .refine(value => value <= 90, { error: "Cannot be higher than 90.", abort: true })

export const validatePhotos = z.string()
    .refine(value => value !== null, { error: "Cannot be null.", abort: true })
    .refine(value => value.startsWith("{"), { error: "Has to start array with '{'.", abort: true })
    .refine(value => value.endsWith("}"), { error: "Has to end array with '}'.", abort: true })

export const validateReportType = z.string()
    .refine(value => value !== null, { error: "Cannot be null.", abort: true })
    .refine(value => value.length > 0 && value.trim().length > 0, { error: "Cannot be empty.", abort: true })
    .refine(value => ["user", "library", "review"].includes(value.toLowerCase()), { error: "Must be either 'user', 'library' or 'review'.", abort: true })

export const validateReportLevel = z.number()
    .refine(value => value !== null, { error: "Cannot be null.", abort: true })
    .refine(value => value >= 0, { error: "Cannot be negative.", abort: true })
    .refine(value => value > 3, { error: "Cannot be a higher level than 3.", abort: true })



// export interface postLibraryData {
//   userId: string,
//   name: string,
//   text: string,
//   cordlon: number,
//   cordlat: number,
//   books: string
//   photos: string 
// }

export const validatePostLibrary = function(formdata: any) {
    if (!(formdata instanceof FormData)) return false

    const validations = [
        validateId.safeParse(formdata.get("userId")),
        validateName.safeParse(formdata.get("name")),
        z.string().safeParse(formdata.get("text")),
        validateLongitude.safeParse(formdata.get("cordlon")),
        validateLatitude.safeParse(formdata.get("cordlat")),
        z.string().safeParse(formdata.get("books")),
        validatePhotos.safeParse(formdata.get("photos"))
    ]

    for (const validation of validations) {
        if (!validation.success) console.error("Library validation error issues:", validation.error.issues)
    }

    return true
}

// export type uploadreport ={
//     submitterUserId: string;
//     text: string | null;
//     userId: string | null;
//     createdAt: string | null;
//     libraryId: number | null;
//     reviewId: string | null;
//     reportType: string;
//     reportLevel: number;
// }

export const validatePostReport = function(formdata: any) {
    if (!(formdata instanceof FormData)) return false

    const validations = [
        validateId.safeParse(formdata.get("submitterUserId")),
        validateReportType.safeParse(formdata.get("reportType")),
        validateReportLevel.safeParse(formdata.get("reportLevel")),
    ]

    for (const validation of validations) {
        if (!validation.success) console.error("Report validation error issues:", validation.error.issues)
    }

    return true
}