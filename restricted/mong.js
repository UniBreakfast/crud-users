module.exports = { connectToMongo };

const { MongoClient, ServerApiVersion } = require('mongodb');
const { prepareCRUD } = require('./crud.js');

async function connectToMongo(user, pwd, dbName) {
  const uri = `mongodb+srv://${user}:${pwd}@cluster0.x0yir.gcp.mongodb.net/?appName=Cluster0`;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  
  await client.connect();

  const db = client.db(dbName);

  return prepareCRUD(db);
}
