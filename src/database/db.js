import pg from "pg";

const {Pool} = pg;
const pool = new Pool({});

export default pool;
// Compare this snippet from server/index.js:
