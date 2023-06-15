import * as usersDao from "./users-dao.js";

const AuthController = (app) => {
  const register = async (req, res) => {
    const user = await usersDao.findUserByUsername(req.body.username);
    if (user) {
      res.sendStatus(403);
      return;
    }
    const newUser = await usersDao.createUser(req.body);
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };

  const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      const user = await usersDao.findUserByCredentials(username, password);
      if (user) {
        req.session["currentUser"] = user;
        res.json(user);
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(403);
    }
  };

  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(404);
      return;
    }
    res.json(currentUser);
  };
  const logout = async (req, res) => {
    console.log("logging out");
    req.session.destroy();
    res.sendStatus(200);
  };

  const update = (req, res) => {
    console.log(req);
    console.log("updating user");
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(404);
      return;
    }
    // const uid = req.params["uid"];
    // const uid = req.params["_id"];
    const uid = req.params["_id"];

    if (uid !== currentUser._id) {
      res.sendStatus(403);
      return;
    }
    const user = req.body;
    const status = usersDao.updateUser(uid, user);
    res.json(status);
  };

  app.post("/api/users/register", register);
  app.post("/api/users/login", login);
  app.post("/api/users/profile", profile);
  app.post("/api/users/logout", logout);
  app.put("/api/users", update);
  // app.put("/api/users/update/:_id", update);
};
export default AuthController;
