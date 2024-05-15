import {MongoClient, ServerApiVersion} from "mongodb";

export async function connectToMongo( whichCollection:string){
  const uri = process.env.MONGODB_URI || "";
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  try{
    await client.connect();
    await client.db("admin").command({ping: 1});
    console.log("Deployment pinged");
  }
  catch (error){
    console.error(error);
  }
  let db = client.db(whichCollection);
  return db;
}
