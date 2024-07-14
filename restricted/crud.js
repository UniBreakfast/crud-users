module.exports = { prepareCRUD };

const { ObjectId } = require('mongodb');

function prepareCRUD(db) {
  const usersCollection = db.collection('users');
  const sessionsCollection = db.collection('sessions');

  return {
    async createUser(data) {
      const { insertedId } = await usersCollection.insertOne(data);

      return insertedId;
    },

    async readUsers() {
      const users = await usersCollection.find().toArray();

      users.map(renameId).map(removeHash);

      return users;
    },

    async readUser({ id = '', ...data }, leaveHash = false) {
      if (id) {
        const user = await usersCollection.findOne({ _id: new ObjectId(id) });

        if (!user) return null;

        return renameId(leaveHash ? user : removeHash(user));

      } else {
        const user = await usersCollection.findOne(data);

        if (!user) return null;

        return renameId(leaveHash ? user : removeHash(user));
      }
    },

    async updateUser(id = '', data) {
      return usersCollection.updateOne({ _id: new ObjectId(id) }, { $set: data });
    },

    async deleteUser(id = '') {
      return usersCollection.deleteOne({ _id: new ObjectId(id) });
    },

    async createSession(data) {
      return sessionsCollection.insertOne(data);
    },

    async readSession(data) {
      return sessionsCollection.findOne(data);
    },

    async deleteSessions(userId = '') {
      return sessionsCollection.deleteMany({ userId: new ObjectId(userId) });
    },

    async deleteSession({ token }) {
      return sessionsCollection.deleteOne({ token });
    },
  };
}

function renameId(user) {
  user.id = user._id;
  delete user._id;

  return user;
}

function removeHash(obj) {
  delete obj.hash;

  return obj;
}
