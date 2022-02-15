import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import About from './components/About/About';
import BookDetail from './components/BookDetail/BookDetail';
import Booklist from './components/Booklist/Booklist';
import Login from './components/Login/Login';
import NewBook from './components/NewBook/NewBook';

function App() {
  return (
    <div className='App'>
      <Navigation />
      <Routes>
        <Route path='/about' element={<About />} />
        <Route path='/book/:id' element={<BookDetail />} />
        <Route path='/' element={<Booklist />} />
        <Route path='/login' element={<Login />} />
        <Route path='/new-book' element={<NewBook />} />
      </Routes>
    </div>
  )
}

export default App;
