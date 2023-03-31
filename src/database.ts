let userInDb = {
  userId: 0,
  gems: 105,
  lastMined: new Date(),
};

function getUserById(id: number) {
  return userInDb;
}

function updateUserLastMined(id: number, lastMined: Date) {
  userInDb.lastMined = lastMined;
}

export { getUserById, updateUserLastMined };
