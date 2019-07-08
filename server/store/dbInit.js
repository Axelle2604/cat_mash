const { Pool } = require('pg');
const { getCatsFromJSON } = require('./index');

const connectionString = process.env.CONNECTION_STRING;

const pool = new Pool({
  connectionString: connectionString + '?ssl=true',
});

const table = {
  name: 'scores',
  values: [
    { name: 'id', type: 'BIGSERIAL' },
    { name: 'cat_id', type: 'TEXT' },
    { name: 'nb_matchs', type: 'INT' },
    { name: 'points', type: 'INT' },
  ],
};

const dropTable = async () => {
  try {
    await pool.query(`DROP TABLE ${table.name}`);
  } catch (e) {
    console.error(e);
  }
};

const createTable = async () => {
  try {
    await pool.query(
      `CREATE TABLE ${table.name} (${await Promise.all(
        table.values.map(({ name, type }) => `${name} ${type}`)
      )})`
    );
  } catch (e) {
    console.error(e);
  }
};

const fillTable = async () => {
  try {
    const cats = await getCatsFromJSON();
    await Promise.all(
      cats.map(({ id }) =>
        pool.query(
          `INSERT INTO ${
            table.name
          } (cat_id, nb_matchs, points) VALUES ('${id}', 0, 0)`
        )
      )
    );
  } catch (e) {
    console.error(e);
  }
};

const dbInit = async () => {
  await dropTable();
  await createTable();
  await fillTable();
};

dbInit();
