import express, {Request, Response} from 'express';
import {ObjectId}  from "mongodb";
import {connectToMongo} from "../db/server.ts";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const db =  await connectToMongo("employees");
  let collection  = await db.collection("records");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
})

router.get("/:id", async (req:Request, res:Response) => {
  const db = await connectToMongo("employees");
  const collection = await db.collection("records");
  const query = {_id: new ObjectId(req.params.id) };
  const result = await collection.findOne(query);
  result? res.send(result).status(200): res.send("not found").status(404);
});


router.post("/", async (req: Request, res:Response)=>{
  const db = await connectToMongo("employees");
  try{
    const newDoc = {
      name: req.body.name,
      poistion: req.body.position,
      level: req.body.level,
    };
    const collection = await db.collection("records");
    const results = await collection.insertOne(newDoc);
    res.status(204).send(results);
  }
  catch(error){
    console.error(error);
    res.status(500).send("Error adding record");
  }
});


router.patch("/:id", async (req: Request, res:Response) => {
  const db = await connectToMongo("employees");
  try{
    const query = {_id: new ObjectId(req.params.id)};
    const update=  {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
    };
    const collection = await db.collection("records");
    const result = await collection.updateOne(query, update);
    res.status(200).send(result);
  }
  catch (error){
    console.error(error);
    res.status(500).send("could not update!");
  }
})


router.delete("/:id", async (req: Request, res: Response)=> {
  const db = await connectToMongo("employees");
  try{
    const query = {_id: new ObjectId(req.params.id)};
    const collection = await db.collection("records");
    const result = await collection.deleteOne(query);
    res.status(200).send(result);
  }
  catch(error){
    console.error(error);
    res.status(500).send("Employee could not be deleted");
  }
});

export default router;