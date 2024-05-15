import express, { Router, Request, Response} from "express";
const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) =>{
  console.log("Backend route works!");
  res.status(200).json({message: "backendRoute works!"});
});
export default router;