import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', 
  password: '', 
  database: 'pms',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function query(sql: string, values: any[] = []) {
  const [rows] = await pool.execute(sql, values);
  return rows;
}