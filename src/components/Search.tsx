import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'

export const Search = () => {
    const [errorMassageTitle, setErrorMassageTitle] = useState<string>(''); // 状態として定義
    const [errorMassageContents, setErrorMassageContents] = useState<string>(''); // 状態として定義
    const navigate = useNavigate();

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.preventDefault(); // デフォルトのフォーム送信動作を防止
        setErrorMassageTitle(''); // エラーメッセージを空にする
        setErrorMassageContents(''); // エラーメッセージを空にする

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
        // 画面遷移, stateに入力フォームの値を引き渡す
        navigate("/search/result", {state: {title, contents}}); // 検索結果画面へ遷移する
    }

    return (
        <div className="registration">
            <h1>検索画面</h1>
            <div className="errorMassage">{errorMassageTitle}</div>
            <div className="errorMassage">{errorMassageContents}</div>
            {/*<form ref={formRef} method="get" action="http://localhost:3000/search"> */}
            <form>
                <table className="searchTable">
                    <tbody>
                        <tr>
                            <td>タイトル：</td>
                            <td><input type="text" name="title" id="title" /></td>
                        </tr>
                        <tr>
                            <td className="contentsRecord">内容：</td>
                            <td><input type="text" name="contents" id="contents" /></td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="searchButtonRecord">
                                <button className="searchButton" onClick={handleClick}>検索実行</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>

    )
}
