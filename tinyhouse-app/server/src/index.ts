//helps us avoid any eslint warnings of running code before imported files
//by doing so early as possible helps prevent compilation issues
require("dotenv").config()

import express, { Application} from "express"
import { connectDatabase } from "./database"
import bodyParser from "body-parser"
import { ApolloServer } from "apollo-server-express"
import { typeDefs, resolvers } from "./graphql"
import { listings } from "./listings"

const app = express()
const port = process.env.PORT

//apollo server constructor can take in a series of options needed to instanciate an apollo server instance
// const server = new ApolloServer({ typeDefs, resolvers  })
// const server = new ApolloServer({ schema })

//apollo server express library allows us to specify middleware that work alongside the existing server middleware
//pass in the express app instance, aswell as the endpoint for where the graphql endpoint should live

//express exectes db connection when app is intanciated
const mount = async (app: Application) => {
    const db = await connectDatabase()
    const server = new ApolloServer({ typeDefs, resolvers, context: () => ({ db})  })
    server.applyMiddleware({app, path: "/api"})

    app.listen(port)

    console.log(`[app]: http://localhost:${port}`)

    const listings = await db.listings.find({}).toArray()
    // console.log(listings)
}

//parent function which runs server
mount(express())
//in order for server to access data in post request we use body parser to parse the request body
//parse incoming requests as json and expose the resulting object of req.body
// app.use(bodyParser.json())

// listings
// app.get("/listings", (_req, res) => {
//     return res.send(listings)
// })

// //delete listing 
// app.post("/delete-listing", (req, res) => {
//     const id: string = req.body.id

//     for (let i = 0; i < listings.length; i++) {
//         if(listings[i].id === id) {
//             return res.send(listings.splice(i, 1));
//         }
//     }

//     return res.send("failed to delete listing")
// })

