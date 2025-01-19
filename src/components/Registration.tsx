import { useRef, useState } from 'react';
import '../App.css';

export const Registration = () => {

    const [errorMassage, setErrorMassage] = useState<string>(''); // 状態として定義
    const [errorMassageTitle, setErrorMassageTitle] = useState<string>(''); // 状態として定義
    const [errorMassageContents, setErrorMassageContents] = useState<string>(''); // 状態として定義
    const formRef = useRef<HTMLFormElement | null>(null); // フォーマットのメソッドをフックに定義

    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        setErrorMassage(''); // エラーメッセージを空にする
        setErrorMassageTitle(''); // エラーメッセージを空にする
        setErrorMassageContents(''); // エラーメッセージを空にする

        const titleElement = document.getElementById('title') as HTMLInputElement | null;
        const contentsElement = document.getElementById('contents') as HTMLInputElement | null;
        
        const title: string = titleElement ? titleElement.value : '';
        const contents: string = contentsElement ? contentsElement.value : '';

        if (title === null || title === '' || contents === null || contents === '') {
            event.preventDefault(); // デフォルトのフォーム送信動作を防止
            setErrorMassage('項目を入力してください。');
        } else if (title.length > 30) {
            event.preventDefault(); // デフォルトのフォーム送信動作を防止
            setErrorMassageTitle('タイトルは30文字以内で入力してください。');
        } else if (contents.length > 50) {
            event.preventDefault(); // デフォルトのフォーム送信動作を防止
            setErrorMassageContents('内容は50文字以内で入力してください。');
        } else {
            event.preventDefault(); // デフォルトのフォーム送信動作を防止
            formRef.current!.submit(); // 入力チェックをクリアしたらsubmit
            setErrorMassage(''); // エラーメッセージを空にする
            setErrorMassageTitle(''); // エラーメッセージを空にする
            setErrorMassageContents(''); // エラーメッセージを空にする
        }
    }

    

    return (
        <div className="registration">
            <h1>登録画面</h1>
            <div className="errorMassage">{errorMassage}</div>
            <div className="errorMassage">{errorMassageTitle}</div>
            <div className="errorMassage">{errorMassageContents}</div>
            <form ref={formRef} method="post" action="http://localhost:3000/registration/input">
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
                                <button className="regButton" onClick={handleClick}>登録</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>

    )
}
