import {useNavigate} from "react-router-dom";
import '../App.css';
import './Header.css';

export const Header = () => {
    const navigate = useNavigate();
  return (
    <header>
        <h1>Header</h1>
        <div className="headerLink">
            <button className="mainButton" onClick={() => {navigate("/main")}}>リストを表示する</button>
            <button className="contentsButton" onClick={() => {navigate("/registration")}}>登録画面へ</button>
        </div>
    </header>
  )
}
