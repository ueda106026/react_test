import express from 'express';
import cors from 'cors';
import pkg from 'pg';

const { Pool } = pkg;

const app = express();
const port = 3000;

// PostgreSQLの設定
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test_data',
  password: 'password',
  port: 5432, // Default PostgreSQL port
});

// CORS設定
app.use(cors());

// サーバーの起動
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// リクエストボディの解析用ミドルウェア
app.use(express.json()); // JSONデータを解析
app.use(express.urlencoded({ extended: true })); // URLエンコードされたデータを解析

// 全件検索を行ってリストを表示
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM test_data ORDER BY id DESC;');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// 新規登録
app.post('/registration/input', async (req, res) => {
  const {title, contents} = req.body;

  await pool.query('INSERT INTO test_data(title, contents) VALUES($1, $2)',
    [title, contents],
    (error, results) => {
      if (error) throw error;
    }
  );
  res.redirect('http://localhost:5173/registration/complete');
});

// 検索
app.get('/search', async (req, res) => {
  try {
    const {title, contents} = req.query;

    const titleSearch = `%${title}%`;
    const contentsSearch = `%${contents}%`;

    const result = await pool.query('SELECT * FROM test_data WHERE title LIKE $1 AND contents LIKE $2 ORDER BY id DESC',
      [titleSearch, contentsSearch]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// 変更
app.post('/update', async (req, res) => {
  try {
    const {inputId, title, contents} = req.body;

    const result = await pool.query('UPDATE test_data SET title = $2, contents = $3 WHERE id = $1',
      [inputId, title, contents]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// 削除
app.delete('/delete', async (req, res) => {
  try {
    const {id} = req.body;

    const result = await pool.query('DELETE FROM test_data WHERE id = $1;',
      [id]
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});