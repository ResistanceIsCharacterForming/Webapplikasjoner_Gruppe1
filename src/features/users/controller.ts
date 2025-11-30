import { postUserData } from "@/types/user"

export function createUserController(userService: any) {
    return {
        async listUsers() {
            const result = await userService.listUsers()
            if (result.success === true) {
                return new Response(
                    JSON.stringify({
                        data: result.data,
                        success: true,
                    }),
                    {
                        status: 201,
                        headers: { "Content-Type": "application/json" },
                    }
                )

            } else {

                return new Response(null, { status: 300 })

            }
        },
        async getUserById(id: string) {
            const result = await userService.getUserById(id)
            if (result.success === true) {
                return new Response(
                    JSON.stringify({
                        data: result.data,
                        success: true,
                    }),
                    {
                        status: 201,
                        headers: { "Content-Type": "application/json" },
                    }
                )

            } else {

                return new Response(null, { status: 300 })

            }
        },
        async createUser(data: any) {
            const result = await userService.createUser(data)
            if (result.success === true) {
                return new Response(
                    JSON.stringify({
                        data: result.data,
                        success: true,
                    }),
                    {
                        status: 201,
                        headers: { "Content-Type": "application/json" },
                    }
                )

            } else {

                return new Response(null, { status: 300 })

            }
        },
        async editUser(id: string, data: any) {
            const result = await userService.editUserById(id, data)
            if (result.success === true) {
                return new Response(
                    JSON.stringify({
                        data: result.data,
                        success: true,
                    }),
                    {
                        status: 201,
                        headers: { "Content-Type": "application/json" },
                    }
                )

            } else {

                return new Response(null, { status: 300 })

            }
        },
        async deleteUser(id: string) {
            const result = await userService.deleteUserByid(id)
            if (result.success === true) {
                return new Response(
                    JSON.stringify({
                        data: result.data,
                        success: true,
                    }),
                    {
                        status: 201,
                        headers: { "Content-Type": "application/json" },
                    }
                )

            } else {

                return new Response(null, { status: 300 })

            }
        },
        async getFavoriteLibrariesFromUser(id: string) {
            const result = await userService.getfavoriteLibrariesByUserId(id)
            if (result.success === true) {
                return new Response(
                    JSON.stringify({
                        data: result.data,
                        success: true,
                    }),
                    {
                        status: 201,
                        headers: { "Content-Type": "application/json" },
                    }
                )

            } else {

                return new Response(null, { status: 300 })

            }
        },
        async deleteFavoriteLibrariesByUser(id: string) {
            const result = await userService.deletefavoriteLibrariesByUser(id)
            if (result.success === true) {
                return new Response(
                    JSON.stringify({
                        data: result.data,
                        success: true,
                    }),
                    {
                        status: 201,
                        headers: { "Content-Type": "application/json" },
                    }
                )

            } else {

                return new Response(null, { status: 300 })

            }
        },
        async createFavoriteLibrary(userid: string, libraryid: string) {
            const result = await userService.createfavoriteLibrary(userid, libraryid)
            if (result.success === true) {
                return new Response(
                    JSON.stringify({
                        data: result.data,
                        success: true,
                    }),
                    {
                        status: 201,
                        headers: { "Content-Type": "application/json" },
                    }
                )

            } else {

                return new Response(null, { status: 300 })

            }
        },
        async editFavoriteLibrary(id: string, data: any) {
            const result = await userService.editFavoriteLibrary(id, data)
            if (result.success === true) {
                return new Response(
                    JSON.stringify({
                        data: result.data,
                        success: true,
                    }),
                    {
                        status: 201,
                        headers: { "Content-Type": "application/json" },
                    }
                )

            } else {

                return new Response(null, { status: 300 })

            }
        },
        async getFavoriteLibraries() {
            const result = await userService.getFavoriteLibraries()
            if (result.success === true) {
                return new Response(
                    JSON.stringify({
                        data: result.data,
                        success: true,
                    }),
                    {
                        status: 201,
                        headers: { "Content-Type": "application/json" },
                    }
                )

            } else {

                return new Response(null, { status: 300 })

            }
        },
        async deleteFavoriteLibrary(id: string) {
            const result = await userService.deleteFavoriteLibraryById(id)
            if (result.success === true) {
                return new Response(
                    JSON.stringify({
                        data: result.data,
                        success: true,
                    }),
                    {
                        status: 201,
                        headers: { "Content-Type": "application/json" },
                    }
                )

            } else {

                return new Response(null, { status: 300 })

            }
        },
        async getFavoriteLibrary(id: string) {
            const result = await userService.getFavoriteLibraryById(id)
            if (result.success === true) {
                return new Response(
                    JSON.stringify({
                        data: result.data,
                        success: true,
                    }),
                    {
                        status: 201,
                        headers: { "Content-Type": "application/json" },
                    }
                )

            } else {

                return new Response(null, { status: 300 })

            }
        },
        async getAdminById(id: string) {
            const result = await userService.getAdminById(id)
            if (result.success === true) {
                return new Response(
                    JSON.stringify({
                        data: result.data,
                        success: true,
                    }),
                    {
                        status: 201,
                        headers: { "Content-Type": "application/json" },
                    }
                )

            } else {

                return new Response(null, { status: 300 })

            }
        },
        async createAdmin(id: string, adminLevel: number) {
            const result = await userService.createAdmin(id, adminLevel)
            if (result.success === true) {
                return new Response(
                    JSON.stringify({
                        data: result.data,
                        success: true,
                    }),
                    {
                        status: 201,
                        headers: { "Content-Type": "application/json" },
                    }
                )

            } else {

                return new Response(null, { status: 300 })

            }
        },
        async editAdmin(id: string, adminLevel: number) {
            const result = await userService.editAdmin(id, adminLevel)
            if (result.success === true) {
                return new Response(
                    JSON.stringify({
                        data: result.data,
                        success: true,
                    }),
                    {
                        status: 201,
                        headers: { "Content-Type": "application/json" },
                    }
                )

            } else {

                return new Response(null, { status: 300 })

            }
        },
        async deleteAdmin(id: string) {
            const result = await userService.deleteAdmin(id)
            if (result.success === true) {
                return new Response(
                    JSON.stringify({
                        data: result.data,
                        success: true,
                    }),
                    {
                        status: 201,
                        headers: { "Content-Type": "application/json" },
                    }
                )

            } else {

                return new Response(null, { status: 300 })

            }
        },
    }
}

export const userController = createUserController()