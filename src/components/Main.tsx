import '../App.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Main = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // サーバーからデータを取得
    axios.get('http://localhost:3000/')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error); // リクエスト失敗時の処理
      });
  }, []);

  // 変更処理
  const handleChange = (id: number, title: string, contents: string): void => {
    // 検索結果画面へ遷移する, stateに入力フォームの値を引き渡す
    navigate("/update", { state: { id, title, contents } });
  };

  // 削除処理
  const handleDelete = (id: number, title: string): void => {
    const dataToSend = {id, title};
    if (window.confirm(`タイトル：${title}\nこれを削除してもよろしいでしょうか？`)) {
      // サーバーへリクエスト送信
      axios.post('http://localhost:3000/delete', dataToSend)
        .then(response => {
          // console.log('Data created:', response.data); // リクエスト成功時の処理
          setData((prevData) => prevData.filter((item: any) => item.id !== id)); // setDataを更新
        })
        .catch(error => {
          console.error('Error creating data:', error); // リクエスト失敗時の処理
        });
    }
  }

  return (
    <main>
      <div className="main">
        <h1>コンテンツ</h1>
        <table className="dataBase">
          <thead>
            <tr>
              <th>タイトル</th>
              <th>内容</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.contents}</td>
                <td>
                  <button className="changeButton" id="changeButton" onClick={() => handleChange(item.id, item.title, item.contents)}>変更</button>
                  <button className="deleteButton" id="deleteButton" onClick={() => handleDelete(item.id, item.title)}>削除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}

