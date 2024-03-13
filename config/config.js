const PORT = process.env.PORT || 3000;

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'root';
const DB_NAME = process.env.DB_NAME || 'railway'; 
const DB_PORT = process.env.DB_PORT || 3306;
const JWT_SECRET = process.env.JWT_SECRET || 'g#uBspyUyFypX334%^56333&6P@Xc8D*ByYc%VzX';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "1028399955960-eqi5q8gs0ap8uhj69rh65p7o3n2i1m34.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "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";

module.exports = {
  PORT,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  JWT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET
}