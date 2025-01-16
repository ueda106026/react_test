import '../App.css'

export const RegistrationComplete = () => {
    return (
        <div className="registration">
            <h1 className="completeMassage">登録を完了しました。</h1>
            <div className="complete">
                <form action="http://localhost:5173/main">
                    <button type="submit" className='completeButton'>リストに戻る</button>
                </form>
            </div>
        </div>
    )
}
