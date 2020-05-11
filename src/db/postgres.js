/**
 * if pg-promise is used
 * ?ssl=true should be added to end of database_url otherwise error occurs.
 * heroku credentials may expire. check if it doesnot work
 */


const {Pool} = require('pg');

const DATABASE_URL = `postgres://ikskhujcyrzjtq:49d69e32604b80afd0cf428570eb693797f4aec94918797116798e27dbbdb872@ec2-54-217-204-34.eu-west-1.compute.amazonaws.com:5432/d86cgt146guri2`;

const config = {
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(config);

class Database {
  constructor(pool) {
    this.pool = pool;
  }

  async query(queryString) {
    try {
      const client = await this.pool.connect();
      try {
        const result = await client.query(queryString);
        client.release();
        return {
          success: true,
          data: result.rows
        };
      } catch (err) {
        return {
          success: false,
          errorType: 'query error',
          error: err.stack
        }
      }
    } catch (err) {
      return {
        success: false,
        errorType: 'connection error',
        error: err.stack
      };
    }
  }
  async queryParameterized(text,values) {
    try {
      const client = await this.pool.connect();
      try {
        const result = await client.query(text,values);
        client.release();
        return {
          success: true,
          data: result.rows
        };
      } catch (err) {
        return {
          success: false,
          errorType: 'query error',
          error: err.stack
        }
      }
    } catch (err) {
      return {
        success: false,
        errorType: 'connection error',
        error: err.stack
      };
    }
  }


async queryTransaction(query1,value1,query2,value2,query3,value3){

  (async () => {

    const client = await this.pool.connect();
    try {
      await client.query('BEGIN')
      const res = await client.query(`${query1}` ,value1)

      const owner_id=res.rows[0].owner_id;
      //console.log(owner_id);
      value2.splice(-1, 1,owner_id);

      await client.query(`${query2}`,value2)
      await client.query(`${query3}`,value3)
      await client.query('COMMIT')
    } catch (e) {
      await client.query('ROLLBACK')
      throw e
    } finally {
      client.release()
    }
  })().catch(e => console.error(e.stack))

}

async queryTransactionsTwo(query1,values,query2,value){

  (async () => {

    const client = await this.pool.connect();
    try {
      await client.query('BEGIN')
      const res = await client.query(`${query1}` ,values)

      await client.query(`${query2}`,value)

      await client.query('COMMIT')
    } catch (e) {
      await client.query('ROLLBACK')
      throw e
    } finally {
      client.release()
    }
  })().catch(e => console.error(e.stack))

}


}

const database = new Database(pool);
module.exports=database;
