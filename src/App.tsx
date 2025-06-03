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
import SuggestionForm from './pages/SuggestionForm'
import SuggestionList from './pages/SuggestionList'
import BookExplorer from './pages/BookExplorer'
import AddReview from './pages/AddReview'
import ClubDetail from './pages/ClubDetail'
import ClubList from './pages/CLubList'
import CreateClub from './pages/CreateClub'
import ClubChatPage from './pages/ClubChatPage'
import MyClubs from './pages/MyClubs'
import MyReadingLists from './pages/MyReadingLists'


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
              <Route path="/books/explorer" element={<BookExplorer />} />
              <Route path="/categories" element={<CategoryManager />} />
              <Route path="/categories/:id" element={<CategoryDetail />} />
              <Route path="/suggestions" element={<SuggestionList />} />
              <Route path="/suggestions/new" element={<SuggestionForm />} />
              <Route path="/suggestions/edit/:id" element={<SuggestionForm />} />
              <Route path="/books/:id/review" element={<AddReview />} />
              <Route path="/clubs" element={<ClubList />} />
              <Route path="/clubs/create" element={<CreateClub />} />
              <Route path="/clubs/:id" element={<ClubDetail />} />
              <Route path="/clubs/:id/chat" element={<ClubChatPage />} />
              <Route path="/my-clubs" element={<MyClubs />} />
              <Route path="/my-reading-lists" element={<MyReadingLists />} />

            </Routes>
          </div>
          <Footer />
        </div>

      </BrowserRouter>
    </>
  )
}

export default App
