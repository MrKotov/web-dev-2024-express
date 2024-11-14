import { Router } from 'express';
import { universities } from './university.route'

const userRouter = Router();

let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', universityId: 1, subjects: ['Maths', 'Physics'] },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', universityId: 2, subjects: ['IT', 'Bio'] },
];

const getUniversityById = (universityId: number) => {
  return universities.find((univ) => univ.id === universityId);
};

userRouter.get('/', (req, res) => {
  const responseUsers = users.map((user) => {
    const university = getUniversityById(user.universityId);
    return {
      ...user,
      university: university ? { id: university.id, name: university.name } : null,
    };
  });
  res.json(responseUsers);
});

userRouter.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  if (user) {
    const university = getUniversityById(user.universityId);
    res.json({
      ...user,
      university: university ? { id: university.id, name: university.name } : null,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

userRouter.post('/', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
    universityId: req.body.universityId, // Expecting universityId in the request body
    subjects: req.body.subjects || [], // New subjects array
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT to update an existing user
userRouter.put('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex] = {
      id: userId,
      name: req.body.name,
      email: req.body.email,
      universityId: req.body.universityId,
      subjects: req.body.subjects || [], // Update subjects array
    };
    res.json(users[userIndex]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// DELETE a user by ID
userRouter.delete('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1);
    res.json(deletedUser[0]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

userRouter.patch('/update-university', (req: any, res: any) => {
  const { userId, universityId } = req.body;

  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const university = getUniversityById(universityId);
  if (!university) {
    return res.status(404).json({ message: 'University not found' });
  }

  user.universityId = universityId;

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    universityId: user.universityId,
  });
});

userRouter.patch('/update-subjects', (req: any, res: any) => {
  const { userId, subjects } = req.body;

  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.subjects = subjects;

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    subjects: user.subjects,
  });
});

export default userRouter;
