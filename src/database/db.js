import pg from "pg";

const {Pool} = pg;
const pool = new Pool({
  user: "mitaka",
  password: "mitaka",
  host: "192.168.55.5",
  // port: 5434,// dev
  port: 5435,  // prod
  database: "prod_db",
  // database: "dev_db"
});

export default pool;
// Compare this snippet from server/index.js:
