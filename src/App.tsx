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
import BookForm from './pages/BookForm'
import CategoryManager from './pages/CategoryManager'
import BookDetail from './pages/BookDetail'
import { Toaster } from 'react-hot-toast'
import CategoryDetail from './pages/CategoryDetail'

function App() {

  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col  h-screen ">
          <Navbar />
          <Toaster position="top-center" reverseOrder={false} />
          <div className="flex grow justify-center items-center">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/userList" element={<UserList />} />
              <Route path="/books" element={<BookList />} />
              <Route path="/books/:id" element={<BookDetail />} />
              <Route path="/books/new" element={<BookForm />} />
              <Route path="/books/edit/:id" element={<BookForm />} />
              <Route path="/categories" element={<CategoryManager />} />
              <Route path="/categories/:id" element={<CategoryDetail />} />
            </Routes>
          </div>
          <Footer />
        </div>

      </BrowserRouter>
    </>
  )
}

export default App
