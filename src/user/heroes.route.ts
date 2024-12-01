import express ,{ Request, Response } from "express";
import { db } from '../database';
 
const router = express.Router();
 
router.post("/", async (req: Request, res: Response) => {
 try{
  const { name, email, universityId} = req.body;
  const university = await db.models.University;

  if(!university){
    res.status(404).json({error: 'University not found'});
    return;
  }

  if(await db.models.User.findOne({where: {email}})){
    throw new Error("User already exists.");
  }

  const user = await db.models.User.create({name, email, universityId});
  res.status(201).json(user);
 }catch (error: any){
  res.status(400).json({error:error.message});
 }
});

router.get("/", async (req: Request, res: Response) => {
  try{
    const users = await db.models.User.findAll({
      include: {
        model: db.models.University,
        as: 'university'
      },
    });
    res.status(200).json(users);
  }catch(error: any){
    res.status(500).json({error: error.message});
  }
});
export default router;
// interface User {
//   id: number;
//   name: string;
//   email: string;
//   universityId: number | null;
//   subjects: string[] | null;
// }
 
// let users: User[] = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "john@example.com",
//     universityId: 1,
//     subjects: ["maths"],
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     email: "jane@example.com",
//     universityId: 2,
//     subjects: ["IT"],
//   },
// ];
 
// let universities = [
//   { id: 1, name: "TU Sofia" },
//   { id: 2, name: "UNWE" },
// ];
 
// userRouter.get("/", (req, res) => {
//   res.json(users);
// });
 
// userRouter.get("/:id", (req, res) => {
//   const userId = parseInt(req.params.id);
//   const user = users.find((u) => u.id === userId);
//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404).json({ message: "User not found" });
//   }
// });
 
// userRouter.post("/", (req, res) => {
//   const newUser = {
//     id: users.length + 1,
//     name: req.body.name,
//     email: req.body.email,
//     universityId: null,
//     subjects: [],
//   };
//   users.push(newUser);
//   res.status(201).json(newUser);
// });
 
// userRouter.patch("/:i d/university/:universityId", (req, res) => {
//   const userId = parseInt(req.params.id);
//   const universityId = parseInt(req.params.universityId);
 
//   const user = users.find((u) => u.id === userId);
//   const university = universities.find((u) => u.id === universityId);
 
//   if (user && university) {
//     user.universityId = universityId;
//     res.json({ message: "University assigned to user", user });
//   } else if (!user) {
//     res.status(404).json({ message: "User not found" });
//   } else {
//     res.status(404).json({ message: "University not found" });
//   }
// });
 
// userRouter.patch("/:id/subjects", (req, res) => {
//   const userId = parseInt(req.params.id);
//   const subjects = req.body;
 
//   const user = users.find((u) => u.id === userId);
 
//   if (user) {
//     user.subjects = subjects;
//     res.json({ message: "User subjects updated successfully", user });
//   } else {
//     res.status(404).json({ message: "User not found" });
//   }
// });
 
// userRouter.get("/:id/university", (req, res) => {
//   const userId = parseInt(req.params.id);
//   const user = users.find((u) => u.id === userId);
 
//   if (user) {
//     const university = universities.find((u) => u.id === user.universityId);
//     res.json({ user, university });
//   } else {
//     res.status(404).json({ message: "User not found" });
//   }
// });
 
