import { prefix, route } from "rwsdk/router"

import { libraryApi } from "@/features/library/api"
import { userApi } from "@/features/user/api"
import { reportApi } from "@/features/report/api"
import { reviewApi } from "@/features/review/api"
import { setParams } from "@/utils/params"

import { singletonMaster } from "@/utils/singletonBuilder"

/*
const features = {
    libraries  : (ctx: any) => {return libraryApi(ctx)},
    users : (ctx: any) => {return userApi(ctx)},
    reports : (ctx: any) => {return reportApi(ctx)},
    reviews : (ctx: any) => {return reviewApi(ctx)}
}
*/



export const apiHandler = (ctx: any) => {

    const [ resource, id, type ] = setParams(ctx)

    console.log("api " + ctx.params.resource)

    const features = {
        get: {
            libraries: () => {
                if (id !== "") {
                    return singletonMaster.libraryController.getLibraryById(id)
                }
                return singletonMaster.libraryController.listLibraries()
                
            },
            users: () => {
                if (id !== "") {
                    return singletonMaster.userController.getUserById(id)
                }
                return singletonMaster.userController.listUsers()
            }
        }
    }

    const method = (ctx.request.method.toLowerCase()) as keyof typeof features
    const feature = resource as keyof typeof features[typeof method]

    return features[method][feature]()
}