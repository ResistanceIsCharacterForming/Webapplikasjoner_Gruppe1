import { user } from "@/types/user"
import { JSX, useEffect, useState } from "react"
import { useListUser } from "../hooks/universal/useListUser"
import { Users } from "./users"
import { inputFields, selectOption } from "@/styles/tailwind"

const sortOptions: selectOption[] = [
    { type: "nyeste", value: "newest" },
    { type: "eldste", value: "oldest" },
]
const searchOptions: selectOption[] = [
    { type: "name", value: "name" },
    { type: "id", value: "id" },
    { type: "email", value: "email" },
]
const field: inputFields = { label: "search", name: "search", type: "search" }


export const UserContainer = () => {
    const [users, setusers] = useState<user[]>()
    const [showcase, setShowcase] = useState<JSX.Element[]>()
    const [sort, setSorting] = useState(sortOptions[0].value)
    const [searchSetting, setSearchSetting] = useState(searchOptions[0].value)
    // used to sett data if no data is there but if date exiest it will just change showcase
    useEffect(() => {
        if (users) {
            settSorting(sort)
            showusers()
        }
        else listusers()

    }, [users])

    //update the page so it relfects the sortting
    useEffect(() => {
        settSorting(sort)
    }, [sort])

    // gets a list of users, and sett it in state to be acced later
    async function listusers() {
        const users = await useListUser()
        setusers(users.data)
    }

    // makes a list of user componets and setts it to showcase
    async function showusers(userslist?: user[]) {
        if (userslist) {
            const listusers = userslist.map(user =>
                <Users key={user.id}{...user} />
            )
            setShowcase(listusers)
        }
        else if (users) {
            const listusers = users.map(user =>
                <Users key={user.id}{...user} />
            )
            setShowcase(listusers)
        }
    }
    // search that will only show the serach and match the serchsetting thats selected
    function search(search: string) {
        if (search == "") showusers()
        else if (users !== undefined) {
            if (searchSetting == "name") {
                const searchItems = users.filter(user =>
                    user.name?.toLowerCase().includes(search.toLowerCase())
                )
                showusers(searchItems)
            }
            else if (searchSetting == "id") {
                const searchItems = users.filter(user =>
                    user.id.toLowerCase().includes(search.toLowerCase())
                )
                showusers(searchItems)

            }
            else if (searchSetting == "email") {
                const searchItems = users.filter(user =>
                    user.email?.toLowerCase().includes(search.toLowerCase())
                )
                showusers(searchItems)
            }
        }
    }
    // setts the sorting and gives it to showcase
    async function settSorting(sorting: string) {
        if (users !== undefined) {
            if (sorting === "newest") {
                // a bit more testing in this sort as created at can be null
                const sortedItems = users.sort((a, b) => {
                    if (a.createdAt === null && b.createdAt === null) {
                        return 0
                    }
                    if (a.createdAt === null) {
                        return 1
                    }
                    if (b.createdAt === null) {
                        return -1
                    }
                    return b.createdAt.localeCompare(a.createdAt)
                })


                showusers(sortedItems)
            }
            else if (sorting === "oldest") {
                // a bit more testing in this sort as created at can be null
                const sortedItems = users.sort((a, b) => {
                    if (a.createdAt === null && b.createdAt === null) {
                        return 0
                    }
                    if (a.createdAt === null) {
                        return 1
                    }
                    if (b.createdAt === null) {
                        return -1
                    }
                    return a.createdAt.localeCompare(b.createdAt)
                })
                showusers(sortedItems)
            }
        }
    }
    return (
        <>
            <article className="bg-oldRose grid grid-cols-10  row-start-3 row-span-1 col-span-5 border-blackChocolate border-1">
                <article className="w-full bg-lotion border-blackChocolate border-1 p-1 focus:outline-none focus:shadow focus:border-darkVanilla rounded-md col-span-4 ml-2 grid 10">
                    <input
                        className="w-full col-span-8"
                        placeholder="søk her"
                        type={field.type}
                        id={field.type}
                        name={field.type}
                        onChange={(e) => search(e.target.value)}

                    />
                    <select name="search_options" value={searchSetting} onChange={e => setSearchSetting(e.target.value)} className="w-full col-start-9 col-span-1">
                        {searchOptions.map((option) => (
                            <option key={option.type} value={option.value}>{option.type}</option>
                        ))}
                    </select>
                </article>
                <article className="col-span-2 col-start-6 flex gap-5 justify-center place-items-center">
                    <label className="">Sortering:</label>
                    <select name="sort_options" value={sort} onChange={e => setSorting(e.target.value)} className="bg-lotion border-blackChocolate border-1 p-1 rounded">
                        {sortOptions.map((option) => (
                            <option key={option.type} value={option.value}>{option.type}</option>
                        ))}
                    </select>
                </article>

            </article>
            <article className="col-span-5 row-span-14 col-start-1 row-start-4  overflow-hidden overflow-y-auto  h-full w-full bg-lotion">
                <div className="h-2em w-full grid grid-cols-18  border-blackChocolate border-1 p-1">
                    <p className="col-span-4 col-start-2">id</p>
                    <p className="col-span-3">name</p>
                    <p className="col-span-3">email</p>
                    <p className="col-span-4">createdAt</p>
                </div>
                {showcase}

            </article>
        </>
    )
}