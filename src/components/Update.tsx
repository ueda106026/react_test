import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

export const Update = () => {
    const [errorMassageTitle, setErrorMassageTitle] = useState<string>('');
    const [errorMassageContents, setErrorMassageContents] = useState<string>('');
    const navigate = useNavigate();

    // stateで引き渡した入力フォームの値をuseLocationで受け取る
    const location = useLocation();
    const { id, title, contents } = location.state || {};
    const locationId: number = id;
    const locationTitle: string = title;
    const locationContents: string = contents;

    // 変更処理実行
    const handleClick = (): void => {
        setErrorMassageTitle(''); // エラーメッセージを空にする
        setErrorMassageContents(''); // エラーメッセージを空にする

        // 入力フォームの値を取得
        const titleElement = document.getElementById('title') as HTMLInputElement | null;
        const contentsElement = document.getElementById('contents') as HTMLInputElement | null;
        const title: string = titleElement ? titleElement.value : '';
        const contents: string = contentsElement ? contentsElement.value : '';
        const dataToSend = {locationId, title, contents};

        // バリデーション
        if (title.length > 30) {
            setErrorMassageTitle('タイトルは30文字以内で入力してください。');
            return;
        }
        if (contents.length > 50) {
            setErrorMassageContents('内容は50文字以内で入力してください。');
            return;
        }

        // 更新処理実行
        axios.post('http://localhost:3000/update', dataToSend)
            .then(response => {
                // console.log('Data created:', response.data);　// リクエスト成功時の処理
                navigate("/main"); // 検索結果画面へ遷移する
                alert("登録内容を変更しました。");
            })
            .catch(error => {
                // リクエスト失敗時の処理
                console.error('Error creating data:', error);
            });
    }

    return (
        <div className="registration">
            <h1>登録内容変更画面</h1>
            <div className="errorMassage">{errorMassageTitle}</div>
            <div className="errorMassage">{errorMassageContents}</div>
            <table className="regTable">
                <tbody>
                    <tr>
                        <td>タイトル：</td>
                        <td><input type="text" id="title" defaultValue={locationTitle} /></td>
                    </tr>
                    <tr>
                        <td className="contentsRecord">内容：</td>
                        <td><input type="text" id="contents" defaultValue={locationContents} /></td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="regButtonRecord">
                            <button className="regButton" onClick={handleClick}>登録内容変更</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
