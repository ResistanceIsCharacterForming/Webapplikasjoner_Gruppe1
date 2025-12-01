
export interface apiFeature {
    ctx: any,
    resource: string
}

export interface apiResponse<T> {
    data?: T,
    success: boolean
}

