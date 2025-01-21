import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

export const Update = () => {
    const [errorMassage, setErrorMassage] = useState<string>(''); // 状態として定義
    const [errorMassageTitle, setErrorMassageTitle] = useState<string>(''); // 状態として定義
    const [errorMassageContents, setErrorMassageContents] = useState<string>(''); // 状態として定義
    const formRef = useRef<HTMLFormElement | null>(null); // フォーマットのメソッドをフックに定義
    const navigate = useNavigate();

    // stateで引き渡した入力フォームの値をuseLocationで受け取る
    const location = useLocation();
    const { id, title, contents } = location.state || {};

    const inputId: number = id;
    const inputTitle: string = title;
    const inputContents: string = contents;


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

        // 更新処理実行
        try {
            const response = await fetch("http://localhost:3000/update", {
                method: "POST", // HTTPメソッド
                headers: {
                    "Content-Type": "application/json", // JSON形式を指定
                },
                body: JSON.stringify({ inputId, title, contents }), // JSONに変換して送信
            });

            if (!response.ok) {
                throw new Error(`HTTPエラー: ${response.status}`);
            }

            // 画面遷移, stateに入力フォームの値を引き渡す
            navigate("/main"); // 検索結果画面へ遷移する
            alert("登録内容を変更しました。");

        } catch (error) {
            console.error("エラー:", error);
        }

    }

    return (
        <div className="registration">
            <h1>登録内容変更画面</h1>
            <div className="errorMassage">{errorMassage}</div>
            <div className="errorMassage">{errorMassageTitle}</div>
            <div className="errorMassage">{errorMassageContents}</div>
                <table className="regTable">
                    <tbody>
                        <tr>
                            <td>タイトル：</td>
                            <td><input type="text" name="title" id="title" defaultValue={inputTitle} /></td>
                        </tr>
                        <tr>
                            <td className="contentsRecord">内容：</td>
                            <td><input type="text" name="contents" id="contents" defaultValue={inputContents} /></td>
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
