import express from 'express' // 添加 express 模組的匯入
import mysql from 'mysql2/promise.js'
import 'dotenv/config.js'

// 資料庫連結資訊
const db = mysql.createPool({
  host: 'localhost',
  user: 'Eleganza',
  port: 3306,
  password: '12345',
  database: 'db_violin',
  // dateStrings: true,
})

//fileds是查詢欄位

// 檢查資料庫連接是否成功
// db.getConnection((err, connection) => {
//     if (err) {
//         console.error('Error connecting to database:', err);
//         return;
//     }
//     console.log('Connected to database!');
//     connection.release();
// });

// const app = express();

// // 啟動Express伺服器
// const port = process.env.PORT || 3005;
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

// 輸出模組
export default db
