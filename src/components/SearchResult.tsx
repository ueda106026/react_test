import axios from 'axios';
import '../App.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const SearchResult = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const navigate = useNavigate();

  // stateで引き渡した入力フォームの値をuseLocationで受け取る
  const location = useLocation();
  const { title, contents } = location.state || {};

  // 検索処理実行
  useEffect(() => {
    // クエリパラメータを構築
    const queryParams = new URLSearchParams({ title, contents }).toString();
    // サーバーへリクエスト送信
    axios.get(`http://localhost:3000/search?${queryParams}`)
      .then(response => {
        // console.log(response.data); // リクエスト成功時の処理
        const result = response.data; // 検索結果を取得
        setSearchResults(result); // 検索結果を状態に保存
      })
      .catch(error => {
        console.error('Error fetching data:', error); // リクエスト失敗時の処理
      });
      
  }, []);

    // 変更処理
    const handleChange = (id: number, title: string, contents: string): void => {
      // 検索結果画面へ遷移する, stateに入力フォームの値を引き渡す
      navigate("/update", { state: { id, title, contents } });
    }
  
    // 削除処理
    const handleDelete = (id: number, title: string): void => {
      const dataToSend = {id, title};
      if (window.confirm(`タイトル：${title}\nこれを削除してもよろしいでしょうか？`)) {
        // サーバーへリクエスト送信
        axios.post('http://localhost:3000/delete', dataToSend)
          .then(response => {
            // console.log('Data created:', response.data); // リクエスト成功時の処理
            navigate('/main'); // 一覧画面へ遷移する
          })
          .catch(error => {
            console.error('Error creating data:', error); // リクエスト失敗時の処理
          });
      }
    }

  return (
    <main>
      <div className="main">
        <h1>検索結果</h1>
        {searchResults.length > 0 ? (
          <table className="dataBase">
            <thead>
              <tr>
                <th>タイトル</th>
                <th>内容</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((item: any) => (
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
        ) : (
          <div className="outputMassage">該当するデータがありません。</div>
        )}
      </div>
    </main>
  );
};
