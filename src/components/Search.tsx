import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export const Search = () => {
    const [errorMassageTitle, setErrorMassageTitle] = useState<string>('');
    const [errorMassageContents, setErrorMassageContents] = useState<string>('');
    const navigate = useNavigate();

    const handleClick = (): void => {
        errorMassageReset(); // エラーメッセージをリセットする

        // 入力フォームの値を取得する
        const titleElement = document.getElementById('title') as HTMLInputElement | null;
        const contentsElement = document.getElementById('contents') as HTMLInputElement | null;
        const title: string = titleElement ? titleElement.value : '';
        const contents: string = contentsElement ? contentsElement.value : '';

        // バリデーション
        if (title.length > 30) {
            setErrorMassageTitle('タイトルは30文字以内で入力してください。');
            return;
        }
        if (contents.length > 50) {
            setErrorMassageContents('内容は50文字以内で入力してください。');
            return;
        }
        // 検索結果画面へ遷移する, stateに入力フォームの値を引き渡す
        navigate("/search/result", { state: { title, contents } });
    }

    // エラーメッセージをリセットする
    const errorMassageReset = (): void => {
        setErrorMassageTitle('');
        setErrorMassageContents('');
    }

    return (
        <div className="registration">
            <h1>検索画面</h1>
            <div className="errorMassage">{errorMassageTitle}</div>
            <div className="errorMassage">{errorMassageContents}</div>
            <table className="searchTable">
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
                        <td colSpan={2} className="searchButtonRecord">
                            <button className="searchButton" onClick={handleClick}>検索実行</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
