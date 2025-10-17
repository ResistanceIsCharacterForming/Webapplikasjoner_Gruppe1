import { prefix, route } from "rwsdk/router"
import { bookshelvesController } from "./controller"

export const bookshelvesApi = async ({ctx, resource}) => {

console.log(resource)

    switch(resource) {

        case "test":
            return bookshelvesController.listBookshelves()
        
    }

}