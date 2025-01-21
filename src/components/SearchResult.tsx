import '../App.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const SearchResult = () => {
  // stateで引き渡した入力フォームの値をuseLocationで受け取る
  const location = useLocation();
  const { title, contents } = location.state || {};

  const [errorMassage, setErrorMassage] = useState<string>(''); // 状態として定義
  const [searchResults, setSearchResults] = useState<any[]>([]); // 検索結果を保存する状態

  useEffect(() => {
    setErrorMassage(''); //エラーメッセージのリセット

    const fetchSearchResults = async () => {
      try {
        // クエリパラメータを構築
        const queryParams = new URLSearchParams({ title, contents }).toString();
        // サーバーへリクエスト送信
        const response = await fetch(`http://localhost:3000/search?${queryParams}`, {
          method: 'GET',
        });

        if (!response.ok) {
          setErrorMassage('検索リクエストに失敗しました。');
          throw new Error('検索リクエストに失敗しました。');
        }

        const result = await response.json(); // 検索結果を取得
        // console.log('検索結果:', result);
        setSearchResults(result); // 検索結果を状態に保存

      } catch (err) {
        console.error('エラー:', err);
        setErrorMassage('サーバーとの通信に失敗しました。');
      }
    }

    // 定義した非同期関数を呼び出す
    fetchSearchResults();
  }, [title, contents]);

  return (
    <main>
      <div className="main">
        <h1>検索結果</h1>
        <div className="errorMassage">{errorMassage}</div>
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
