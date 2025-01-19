import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Contents } from './components/Contents';
import { Registration } from './components/Registration';
import { RegistrationComplete } from './components/RegistrationComplete';
import { Search } from './components/Search';
import { SearchResult } from './components/SearchResult';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main" element={<Main />} />
        <Route path="/contents" element={<Contents />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/result" element={<SearchResult />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/registration/complete" element={<RegistrationComplete />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
