import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import UserList from './pages/UserList'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Register from './pages/Register'
import Footer from './components/Footer'
import BookList from './pages/BookList'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className='container mx-auto px-8 py-30'>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/userList' element={<UserList />}></Route>
            <Route path="/books" element={<BookList />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
