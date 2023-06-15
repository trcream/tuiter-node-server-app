// import posts from "./tuits.js";
// let tuits = posts;

// Gives us access to all the methods in tuits dao
import * as tuitsDao from "../../tuits/tuits-dao.js";

// const createTuit = (req, res) => {
//   const newTuit = req.body;
//   newTuit._id = new Date().getTime() + "";
//   newTuit.likes = 0;
//   newTuit.liked = false;
//   newTuit.replies = 0;
//   newTuit.retuits = 0;
//   newTuit.username = "Nasa";
//   newTuit.handle = "@nasa";
//   newTuit.time = "2h";
//   newTuit.image = "nasa.png";
//   newTuit.topic = "Space";
//   newTuit.dislikes = 0;
//   tuits.push(newTuit);
//   res.json(newTuit);
// };

const createTuit = async (req, res) => {
  const newTuit = req.body;
  newTuit.likes = 0;
  newTuit.liked = false;
  newTuit.username = "Nasa";
  newTuit.handle = "@nasa";
  newTuit.time = "2h";
  newTuit.image = "nasa.png";
  newTuit.topic = "Space";
  newTuit.dislikes = 0;
  const insertedTuit = await tuitsDao.createTuit(newTuit);
  res.json(insertedTuit);
};

const findTuits = async (req, res) => {
  const tuits = await tuitsDao.findTuits();
  res.json(tuits);
};

// const findTuits = (req, res) => {
//   res.json(tuits);
// };

const updateTuit = async (req, res) => {
  const tuitdIdToUpdate = req.params.tid;
  const updates = req.body;
  const status = await tuitsDao.updateTuit(tuitdIdToUpdate, updates);
  res.json(status);
};

// const updateTuit = (req, res) => {
//   const tuitdId = req.params.tid;
//   const updates = req.body;
//   const tuitIndex = tuits.findIndex((t) => t._id === tuitdId);
//   tuits[tuitIndex] = { ...tuits[tuitIndex], ...updates };
//   res.sendStatus(200);
// };

const deleteTuit = async (req, res) => {
  const tuitdIdToDelete = req.params.tid;
  const status = await tuitsDao.deleteTuit(tuitdIdToDelete);
  res.json(status);
};

// const deleteTuit = (req, res) => {
//   const tuitdIdToDelete = req.params.tid;
//   tuits = tuits.filter((t) => t._id !== tuitdIdToDelete);
//   res.sendStatus(200);
// };

export default (app) => {
  app.post("/api/tuits", createTuit);
  app.get("/api/tuits", findTuits);
  app.put("/api/tuits/:tid", updateTuit);
  app.delete("/api/tuits/:tid", deleteTuit);
};
