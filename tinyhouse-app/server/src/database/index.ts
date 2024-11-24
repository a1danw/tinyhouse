import { MongoClient } from "mongodb"
import { Database } from "../lib/types"

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.k27r2.mongodb.net/<dbname>?retryWrites=true&w=majority`

//connect database functon returns a promise, which when resolved will be an object of type database
export const connectDatabase = async (): Promise<Database> => {
   const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

   const db = client.db("main")

   return {
       listings: db.collection("listings")
   }
}

