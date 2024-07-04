try { require('./env.js') } catch {  }

const { PORT, MONGO_USER, MONGO_PWD, MONGO_DB } = process.env;
const { runServer } = require('./restricted/server.js');
const { connectToMongo } = require('./restricted/mong.js');

main();

async function main() {
  const mong = await connectToMongo(MONGO_USER, MONGO_PWD, MONGO_DB);

  runServer(PORT).use(mong);
}
