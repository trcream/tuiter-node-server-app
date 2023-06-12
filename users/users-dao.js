let users = [];

export const findAllUsers = () => users;

export const findUserById = (uid) => {
  const index = users.findIndex((u) => u._id === uid);
  if (index !== -1) return users[index];
  return null;
};

export const findUserByUsername = (username) => {
  const index = users.findIndex((u) => u.username === username);
  if (index !== -1) return users[index];
  return null;
};

// export const findUserByCredentials = (username, password) => {
//   const index = users.findIndex.find(
//     (u) => u.username === username && u.password === password
//   );
//   if (index !== -1) return users[index];
//   return null;
// };

export const findUserByCredentials = (username, password) => {
  const index = users.findIndex(
    (u) => u.username === username && u.password === password
  );
  if (index !== -1) return users[index];
  return null;
};

export const createUser = (user) => {
  console.log("user created");
  const timestamp = Date.now();
  users.push({ ...user, _id: timestamp.toString() });

  //   users.push(usr);
  console.log(users);
};

export const updateUser = (uid, user) => {
  console.log("updating user");
  console.log(uid, user);
  const index = users.findIndex((u) => u._id === uid);
  users[index] = { ...users[index], ...user };
  return { status: "ok" };
};

export const deleteUser = (uid) => {
  const index = users.findIndex((u) => u._id === uid);
  users.splice(index, 1);
  return { status: "ok" };
};