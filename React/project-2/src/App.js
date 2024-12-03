import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';

import Navbar from './component/Navbar'
import Create from './pages/Create/Create'
import Home from './pages/Home/Home'
import Recipe from './pages/Recipe/Recipe'
import Search from './pages/Search/Search'

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<Create />} />
          <Route path='/search' element={<Search />} />
          <Route path='/recipes/:id' element={<Recipe />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
