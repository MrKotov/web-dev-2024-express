import { Router } from "express";
 
const universityRouter = Router();
 
let universities = [
  { id: 1, name: "TU Sofia" },
  { id: 2, name: "UNWE" },
];
 
universityRouter.get("/", (req, res) => {
  res.json(universities);
});
 
universityRouter.get("/:id", (req, res) => {
  const universityId = parseInt(req.params.id);
  const university = universities.find((u) => u.id === universityId);
  if (university) {
    res.json(university);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});
 
universityRouter.post("/", (req, res) => {
  const newUniversity = {
    id: universities.length + 1,
    name: req.body.name,
    email: req.body.email,
  };
  universities.push(newUniversity);
  res.status(201).json(newUniversity);
});
 
universityRouter.put("/:id", (req, res) => {
  const universityId = parseInt(req.params.id);
  const universityIndex = universities.findIndex((u) => u.id === universityId);
  if (universityIndex !== -1) {
    universities[universityIndex] = {
      id: universityId,
      name: req.body.name,
    };
    res.json(universities[universityIndex]);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});
 
universityRouter.delete("/:id", (req, res) => {
  const universityId = parseInt(req.params.id);
  const userIndex = universities.findIndex((u) => u.id === universityId);
  if (userIndex !== -1) {
    const deletedUser = universities.splice(userIndex, 1);
    res.json(deletedUser[0]);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});
 
export default universityRouter;