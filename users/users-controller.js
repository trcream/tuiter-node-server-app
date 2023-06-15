import * as usersDao from "./users-dao.js";
// import people from "./users.js";
// let users = people;

const UserController = (app) => {
  // app.get("/api/users", findUsers);
  app.get("/api/users", findAllUsers);

  app.get("/api/users/:uid", findUserById);
  app.post("/api/users", createUser);
  app.delete("/api/users/:uid", deleteUser);
  // app.put("/api/users/:uid", updateUser);
  app.put("/api/users/update/:uid", updateUser);
};

// const findUsers = (req, res) => {
//   const type = req.query.type;
//   if (type) {
//     const usersOfType = users.filter((u) => u.type === type);
//     res.json(usersOfType);
//     return;
//   }
//   const users = usersDao.findAllUsers();
//   res.json(users);
// };

const findAllUsers = async (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  if (username && password) {
    const user = await usersDao.findUserByCredentials(username, password);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } else if (username) {
    const user = await usersDao.findUserByUsername(username);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } else {
    const users = await usersDao.findAllUsers();
    res.json(users);
  }
};

// const findUserById = (req, res) => {
//   const userId = req.params.uid;
//   const user = users.find((u) => u._id === userId);
//   res.json(user);
// };

const findUserById = async (req, res) => {
  const id = req.params.id;
  // Using the DAO which is connected to mongoose db insted of the array
  const user = await usersDao.findUserById(id);
  res.json(user);
};

// const createUser = (req, res) => {
//   console.log("Creating user");
//   console.log(req.body);
//   const newUser = req.body;
//   newUser._id = new Date().getTime() + "";
//   users.push(newUser);
//   res.json(newUser);
// };

const createUser = async (req, res) => {
  console.log("Users-controller: Creating user");
  const newUser = await usersDao.createUser(req.body);
  res.json(newUser);
};

// const deleteUser = (req, res) => {
//   const userId = req.params["uid"];
//   users = users.filter((usr) => usr._id !== userId);
//   res.sendStatus(200);
// };

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const status = await usersDao.deleteUser(id);
  res.json(status);
};

// const updateUser = (req, res) => {
//   const userId = req.params["uid"];
//   const updates = req.body;
//   users = users.map((usr) =>
//     usr._id === userId ? { ...usr, ...updates } : usr
//   );
//   res.sendStatus(200);
// };

const updateUser = async (req, res) => {
  console.log("Update user from users-controller.js ");
  const id = req.params.uid;
  console.log("XXXXXX id: " + id);
  const status = await usersDao.updateUser(id, req.body);
  const user = await usersDao.findUserById(id);
  req.session["currentUser"] = user;
  res.json(status);
};

export default UserController;
