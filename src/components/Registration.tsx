import { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Registration = () => {

    const [errorMassage, setErrorMassage] = useState<string>('');
    const [errorMassageTitle, setErrorMassageTitle] = useState<string>('');
    const [errorMassageContents, setErrorMassageContents] = useState<string>('');
    const navigate = useNavigate();


    const handleClick = (): void => {
        errorMassageReset(); // エラーメッセージをリセットする

        // 入力フォームの値を取得
        const titleElement = document.getElementById('title') as HTMLInputElement | null;
        const contentsElement = document.getElementById('contents') as HTMLInputElement | null;
        const title: string = titleElement ? titleElement.value : '';
        const contents: string = contentsElement ? contentsElement.value : '';
        const dataToSend = {title, contents};

        // バリデーション
        if (title === null || title === '' || contents === null || contents === '') {
            setErrorMassage('項目を入力してください。');
            return;
        }
        if (title.length > 30) {
            setErrorMassageTitle('タイトルは30文字以内で入力してください。');
            return;
        }
        if (contents.length > 50) {
            setErrorMassageContents('内容は50文字以内で入力してください。');
            return;
        }
        // 登録実行
        axios.post('http://localhost:3000/registration/input', dataToSend)
            .then(response => {
                // console.log('Data created:', response.data); // リクエスト成功時の処理
                navigate('/registration/complete'); // 登録完了画面へ遷移する
            })
            .catch(error => {
                console.error('Error creating data:', error); // リクエスト失敗時の処理
            });
    }

    // エラーメッセージをリセットする
    const errorMassageReset = (): void => {
        setErrorMassage('');
        setErrorMassageTitle('');
        setErrorMassageContents('');
    }

    return (
        <div className="registration">
            <h1>登録画面</h1>
            <div className="errorMassage">{errorMassage}</div>
            <div className="errorMassage">{errorMassageTitle}</div>
            <div className="errorMassage">{errorMassageContents}</div>
            <table className="regTable">
                <tbody>
                    <tr>
                        <td>タイトル：</td>
                        <td><input type="text" id="title" /></td>
                    </tr>
                    <tr>
                        <td className="contentsRecord">内容：</td>
                        <td><input type="text" id="contents" /></td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="regButtonRecord">
                            <button className="regButton" onClick={handleClick}>登録</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}
