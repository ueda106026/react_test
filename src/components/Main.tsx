import '../App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const Main = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // サーバーからデータを取得
    axios.get('http://localhost:3000/')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <main>
      <div className="main">
        <h1>コンテンツ</h1>
        <table className="dataBase">
          <thead>
            <tr>
              {/* テーブルの列名を指定 */}
              <th>ID</th>
              <th>タイトル</th>
              <th>内容</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.contents}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}

