module.exports = { prepareCRUD };

const { ObjectId } = require('mongodb');

function prepareCRUD(db) {
  const collectionName = 'users';
  const collection = db.collection(collectionName);

  return {
    async createUser(data) {
      const { insertedId } = await collection.insertOne(data);

      return insertedId;
    },

    async readUsers(id = null) {
      if (id) {
        const user = await collection.findOne({ _id: ObjectId(id) });

        return renameId(user);
      }

      const users = await collection.find().toArray();

      users.forEach(renameId);
      
      return users;
    },

    async updateUser(id, data) {
      return collection.updateOne({ _id: ObjectId(id) }, { $set: data });
    },

    async deleteUser(id) {
      return collection.deleteOne({ _id: ObjectId(id) });
    },
  };
}

function renameId(user) {
  user.id = user._id;
  delete user._id;

  return user;
}