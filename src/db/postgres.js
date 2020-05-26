/**
 * if pg-promise is used
 * ?ssl=true should be added to end of database_url otherwise error occurs.
 * heroku credentials may expire. check if it doesnot work
 */


const {Pool} = require('pg');

const DATABASE_URL = `postgres://labofgazlworvs:1cd93ae40f72ad53f6d909c2244d0f02a2c5276cb37ef9d0b5b83a22deba0b01@ec2-54-75-225-52.eu-west-1.compute.amazonaws.com:5432/d7bek3cbh2uq5d`
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

  async queryParameterized(text, values) {
    try {
      const client = await this.pool.connect();
      try {
        const result = await client.query(text, values);
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
  //
  // async queryTransactions(textArray, valuesArray) {
  //   try {
  //     const client = await this.pool.connect();
  //     try {
  //       await client.query('BEGIN');
  //       for (let i = 0; i < textArray.length; i++) {
  //         await client.query(textArray[i], valuesArray[i]);
  //       }
  //       await client.query('COMMIT');
  //       client.release();
  //       return {
  //         success: true
  //       }
  //
  //     } catch (err) {
  //       await client.query('ROLLBACK')
  //       client.release();
  //       return {
  //         success: false,
  //         errorType: 'query error',
  //         error: err.stack
  //       };
  //     }
  //   } catch (err) {
  //     return {
  //       success: false,
  //       errorType: 'connection error',
  //       error: err.stack
  //     };
  //   }
  // }

  async queryTransactionForRoutes(createNewRoute, createNewRouteValues, shop_ids) {
    try {
      const client = await this.pool.connect();
      try {
        const texts = [];
        const values = [];
        const updateShop = (route_id) => (`UPDATE shop SET route_id = ${route_id} WHERE shop_id = $1`);
        await client.query('BEGIN');
        const res = await client.query(createNewRoute, createNewRouteValues);

        shop_ids.forEach((val) => {
          texts.push(updateShop(res.rows[0].route_id));
          values.push([val]);
        });
        for (let i = 0; i < texts.length; i++) {
          await client.query(texts[i], values[i]);
        }
        await client.query('COMMIT');
        client.release();
        return {
          success: true,
        };

      } catch (err) {
        await client.query('ROLLBACK');
        client.release();
        return {
          success: false,
          errorType: 'query error',
          error: err.stack
        };
      }
    } catch (err) {
      return {
        success: false,
        errorType: 'connection error',
        error: err.stack
      };
    }
  }


  async queryTransactionsInvoice(createNewInvoice, createNewInvoiceValues, products, salesperson_id) {
    try {
      const client = await this.pool.connect();
      try {
        const queryStrings = [];
        const queryValues = [];

        const addInvoiceItems = (invoice_id) => (`INSERT INTO invoice_items (invoice_id,product_id,quantity) VALUES (${invoice_id},$1, $2)`);

        await client.query('BEGIN');
        const res = await client.query(createNewInvoice, createNewInvoiceValues);

        products.forEach((product) => {
          queryStrings.push(addInvoiceItems(res.rows[0].invoice_id));
          queryValues.push([product.product_id, product.quantity]);
        });

        products.forEach((product) => {
          queryStrings.push(`update salesperson_stock set remaining_quantity =remaining_quantity-${product.quantity} where salesperson_id=$1 and stock_received_date =$2 and product_id=$3`);
          queryValues.push([salesperson_id, new Date().toISOString().slice(0, 10), product.product_id]);
        });

        for (let i = 0; i < queryStrings.length; i++) {
          await client.query(queryStrings[i], queryValues[i]);
        }
        await client.query('COMMIT');
        client.release();
        return {
          success: true,
        };

      } catch (err) {
        await client.query('ROLLBACK');
        client.release();
        return {
          success: false,
          errorType: 'query error',
          error: err.stack
        };
      }
    } catch (err) {
      return {
        success: false,
        errorType: 'connection error',
        error: err.stack
      };
    }
  }


  async queryTransaction(query1, value1, query2, value2, query3, value3) {

    try {

      const client = await this.pool.connect();
      try {
        await client.query('BEGIN')
        const res = await client.query(`${query1}`, value1)

        const owner_id = res.rows[0].owner_id;
        //console.log(owner_id);
        value2.splice(-1, 1, owner_id);

        await client.query(`${query2}`, value2)
        await client.query(`${query3}`, value3)
        await client.query('COMMIT')

        return {
          success: true,
        };

      } catch (e) {
        await client.query('ROLLBACK')
        return {
          success: false,
          errorType: 'query error',
          error: e.stack
        };
      } finally {
        client.release()
      }
    } catch (err) {
      return {
        success: false,
        errorType: 'connection error',
        error: err.stack
      };
    }

  }

  async queryTransactionsThree(query1, values1, query2, values2,query3, values3) {

    try {

      const client = await this.pool.connect();
      try {
        await client.query('BEGIN')
        await client.query(`${query1}`, values1)

        await client.query(`${query2}`, values2)
        await client.query(`${query3}`, values3)

        await client.query('COMMIT')

        return {
          success: true
        }
      } catch (e) {
        await client.query('ROLLBACK')

        return {
          success: false,
          errorType: 'query error',
          error: e.stack
        };
      } finally {
        client.release()
      }
    } catch (err) {
      return {
        success: false,
        errorType: 'connection error',
        error: err.stack
      };
    }

  }

  async queryTransactionsTwo(query1, values1, query2, values2) {
    // note: we don't try/catch this because if connecting throws an exception
    // we don't need to dispose of the client (it will be undefined)
    try{
      const client = await pool.connect();
      try {
        await client.query('BEGIN');

        await client.query(query1, values1);
        await client.query(query2, values2);

        await client.query('COMMIT')
        return {
          success: true
        }
      } catch (e) {
        await client.query('ROLLBACK');
        return  {
          success: false,
          errorType: 'query error',
          error: e.stack
        }
      } finally {
        client.release()
      }
    }
    catch (err) {
      return {
        success: false,
        errorType: 'connection error',
        error: err.stack
      };
    }

  }


  async queryTransactionsTwoForiegnKey(query1, values1, query2, values2) {
    try {
      const client = await this.pool.connect();
      await client.query('BEGIN');
      client.query(query1, values1).then((res) => {
        const new_employee_id = res.rows[0].employee_id;
        values2.push(new_employee_id);
        client.query(query2, values2).then(async () => {
          client.query('COMMIT');
        })
      }).catch(async (e) => {
        await client.query('ROLLBACK')
      })
    } catch (e) {
      await client.query('ROLLBACK')
    }

  }

  async queryTransactionAddUser(text1, values1, text2, values2) {
    try {
      const client = await this.pool.connect();
      try {
        //values 1 contains employee_id and user type
        await client.query('BEGIN');
        const res = await client.query(text1, values1);
        const employee_id = res.rows[0].employee_id;
        //values 2 contains supervisor_id
        values2.push(employee_id);
        await client.query(text2, values2);
        await client.query('COMMIT')
        return {
          success: true,
        };
      } catch (err) {
        await client.query('ROLLBACK');
        return {
          success: false,
          errorType: 'query error',
          error: err.stack
        };
      } finally {
        client.release();
      }
    } catch (err) {
      return {
        success: false,
        errorType: 'connection error',
        error: err.stack
      };
    }
  }




}

const database = new Database(pool);
module.exports = database;
