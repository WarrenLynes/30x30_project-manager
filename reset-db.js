const MongoClient = require('mongodb').MongoClient;
const PromptList = require('prompt-list');

async function dropDataBase() {
  try {
    const connection = new MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true } );
    const client = await connection.connect({ useUnifiedTopology: true });
    const db = client.db('thirty-for-thirty-progress-tracker');
    return await db.dropDatabase();
  } catch (e) {
    console.error('ERROR >>> ', e);
  }
}

const list = new PromptList({
  name: 'confirm-delete-db',
  message: 'DELETE DB?',
  choices: ['YES', 'NO']
});

list.ask(async (answer) => {
  if (answer === 'YES') {
    await dropDataBase();
    return process.exit();
  }

  return 1;
});
