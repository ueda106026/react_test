import { useState } from 'react';
import '../App.css';

export const Registration = () => {

    const [errorMassage, setErrorMassage] = useState<string>(''); // 状態として定義

    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        const titleElement = document.getElementById('title') as HTMLInputElement | null;
        const contentsElement = document.getElementById('contents') as HTMLInputElement | null;
        
        const title: string = titleElement ? titleElement.value : '';
        const contents: string = contentsElement ? contentsElement.value : '';

        if (title === null || title === "" || contents === null || contents === "") {
            event.preventDefault(); // デフォルトのフォーム送信動作を防止
            setErrorMassage('項目を入力してください。');
        } else {
            // event.preventDefault(); // これは後で消して
            
            // ここにsubmitの処理を書く

            setErrorMassage('');
        }
    }

    

    return (
        <div className="registration">
            <h1>登録画面</h1>
            {/* <form method="post" action="http://localhost:3000/registration/input"> */}
            <div className="errorMassage">{errorMassage}</div>
            <form>
                <table className="regTable">
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
                            <td colSpan={2} className="regButtonRecord">
                                <button className="regButton" onClick={handleClick}>検索実行</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>

    )
}
