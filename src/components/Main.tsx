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
        console.error('Error fetching data:', error);
      });
  }, []);

  // 変更処理
  const handleChange = (id: number, title: string, contents: string): void => {
    // 画面遷移, stateに入力フォームの値を引き渡す
    navigate("/update", {state: {id, title, contents}}); // 検索結果画面へ遷移する
  };
  
  // 削除処理
  const handleDelete = async (id: number, title:string): Promise<void> => {
    if (window.confirm(`タイトル：${title}\nこれを削除してもよろしいでしょうか？`)) {
      // サーバーへリクエスト送信
      try {
        const response = await fetch("http://localhost:3000/delete", {
          method: "DELETE", // HTTPメソッド
          headers: {
            "Content-Type": "application/json", // JSON形式を指定
          },
          body: JSON.stringify({ id }), // JSONに変換して送信
        });
    
        if (!response.ok) {
          throw new Error(`HTTPエラー: ${response.status}`);
        }

        // setDataを更新
        setData((prevData) => prevData.filter((item: any) => item.id !== id));

      } catch (error) {
        console.error("エラー:", error);
      }
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

