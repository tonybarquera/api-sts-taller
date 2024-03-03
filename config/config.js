const PORT = process.env.PORT || 3000;


const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'root';
const DB_NAME = process.env.DB_NAME || 'railway'; 
const DB_PORT = process.env.DB_PORT || 3306;
const JWT_SECRET = process.env.JWT_SECRET || 'g#uBspyUyFypX334%^56333&6P@Xc8D*ByYc%VzX';

module.exports = {
  PORT,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  JWT_SECRET
}