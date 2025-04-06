import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

//Create database connection
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}).promise();

export async function getEstimates() {
    const [rows] = await pool.query("SELECT * FROM estimates")
    return rows
}

export async function getEstimate(id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM estimates
    WHERE id = ?
    `, [id])
    return rows[0]
}  

export async function createEstimate(brand, category, original_price, estimated_price) {
    const [result] = await pool.query(`
        INSERT INTO estimates (brand, category, original_price, estimated_price)
        VALUES (?, ?, ?, ?)
    `, [brand, category, original_price, estimated_price])
    const id = result.insertId
    return getEstimate(id)
}