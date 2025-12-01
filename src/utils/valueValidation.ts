import * as z from "zod"

export const validateId = z.uuid()
    .refine(value => value !== null, { error: "Cannot be null.", abort: true })
    .refine(value => value.length > 0 && value.trim().length > 0, { error: "Cannot be empty.", abort: true })

export const validateNumberId = z.number()
    .refine(value => value !== null, { error: "Cannot be null.", abort: true })
    .refine(value => value >= 0, { error: "Cannot be negative.", abort: true })

export const validateEmail = z.email()
    .refine(value => value !== null, { error: "Cannot be null.", abort: true })

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

export const validateStringArray = z.string()
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
    .refine(value => value <= 3, { error: "Cannot be a higher level than 3.", abort: true })

export const validateAdminLevel = z.number()
    .refine(value => value !== null, { error: "Cannot be null.", abort: true })
    .refine(value => value >= 0, { error: "Cannot be negative.", abort: true })
    .refine(value => value <= 3, { error: "Cannot be a higher level than 3.", abort: true })

export const validateReviewPoints = z.number()
    .refine(value => value !== null, { error: "Cannot be null.", abort: true })
    .refine(value => value >= 0, { error: "Cannot be negative.", abort: true })
   


const parseNumberInt = function(numData: FormDataEntryValue | null) {
    if (numData === null) return null
    const num = parseInt(numData.toString())
    
    if (!isNaN(num)) return num
    return null
}

const parseNumberFloat = function(numData: FormDataEntryValue | null) {
    if (numData === null) return null
    const num = parseFloat(numData.toString())

    if (!isNaN(num)) return num
    return null
}

const parseBoolean = function(boolString: FormDataEntryValue | null) {
    if (boolString === null) return null
    const isChecked = (boolString === "true") ? true : false
    return isChecked
}

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
        validateLongitude.safeParse(parseNumberFloat(formdata.get("cordlon"))),
        validateLatitude.safeParse(parseNumberFloat(formdata.get("cordlat"))),
        z.string().safeParse(formdata.get("books")),
        validateStringArray.safeParse(formdata.get("photos"))
    ]

    for (const validation of validations) {
        if (!validation.success) {
            console.error("Library validation error issues:", validation.error.issues)
            return false
        }
    }

    return true
}

export const validateEditLibrary = function(id: string, formdata: any) {
    if (!validateId.safeParse(id) || !(formdata instanceof FormData)) return false

    if (formdata.get("id") === null || formdata.get("id") !== id) return false

    return validatePostLibrary(formdata)
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
        validateReportLevel.safeParse(parseNumberInt(formdata.get("reportLevel"))),
    ]

    for (const validation of validations) {
        if (!validation.success) {
            console.error("Report validation error issues:", validation.error.issues)
            return false
        } 
    }

    return true
}

export const validateEditReport = function(id: number, formdata: any) {
    if (!validateNumberId.safeParse(id) || !(formdata instanceof FormData)) return false

    if (formdata.get("id") === null || formdata.get("id") !== id.toString()) return false

    return validatePostReport(formdata)
}


// export interface UserData {
//   name: string,
//   email: string,
//   password: string,
// }

export const validateUserData = function(formdata: any) {
    if (!(formdata instanceof FormData)) return false

    const validations = [
        validateName.safeParse(formdata.get("name")),
        validateEmail.safeParse(formdata.get("email")),
        z.string().safeParse(formdata.get("password"))
    ]

    for (const validation of validations) {
        if (!validation.success) {
            console.error("User data validation error issues:", validation.error.issues)
            return false
        }
    }

    return true
}

// export type databaseUserData = UserData & {
//   settings: string,
//   createdAt: string,
//   lastLoginAt: string
//   profileImage: string
//   isVisible: boolean
// }

export const validateEditUserData = function(id: string, formdata: any) {
    if (!validateId.safeParse(id) || !(formdata instanceof FormData)) return false

    if (formdata.get("id") === null || formdata.get("id") !== id) return false

    const validations = [
        validateName.safeParse(formdata.get("name")),
        validateEmail.safeParse(formdata.get("email")),
        z.string().safeParse(formdata.get("password")),
        z.boolean().safeParse(parseBoolean(formdata.get("isVisible")))
    ]

    for (const validation of validations) {
        if (!validation.success) {
            console.error("Edit user data validation error issues:", validation.error.issues)
            return false
        } 
    }

    return true
}

// export interface postReviewData  {
//     text: string | null;
//     userId: string;
//     libraryId: string;
//     reviewsPoints: number;
//     createdAt:string|null
//     file:File|null;
//     photo:string|null
// }

export const validatePostReview = function(formdata: any) {
    if (!(formdata instanceof FormData)) return false

    const validations = [
        validateId.safeParse(formdata.get("userId")),
        validateId.safeParse(formdata.get("libraryId")),
        validateReviewPoints.safeParse(parseNumberInt(formdata.get("reviewsPoints"))),
    ]

    for (const validation of validations) {
        if (!validation.success) {
            console.error("Review data validation error issues:", validation.error.issues)
            return false
        } 
    }

    return true
}

export const validateEditReview = function(id: number, formdata: any) {
    if (!validateNumberId.safeParse(id) || !(formdata instanceof FormData)) return false

    if (formdata.get("id") === null || formdata.get("id") !== id.toString()) return false

    return validatePostReview(formdata)
}

// export interface postEndorsementData  {
//     userId: string;
//     reviewId: number;
// }

export const validatePostEndorsement = function(formdata: any) {
    if (!(formdata instanceof FormData)) return false

    const validations = [
        validateId.safeParse(formdata.get("userId")),
        validateNumberId.safeParse(parseNumberInt(formdata.get("reviewId")))
    ]

    for (const validation of validations) {
        if (!validation.success) {
            console.error("Endorsement data validation error issues:", validation.error.issues)
            return false
        } 
    }

    return true
}

export const validateEditEndorsement = function(id: number, formdata: any) {
    if (!validateNumberId.safeParse(id) || !(formdata instanceof FormData)) return false

    if (formdata.get("id") === null || formdata.get("id") !== id.toString()) return false

    return validatePostEndorsement(formdata)
}