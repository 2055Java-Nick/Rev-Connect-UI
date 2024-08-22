import './App.css'
import Post from './components/BusinessPosts/PostPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreatePost from './components/BusinessPosts/CreatePost';


function App() {
  

  return (
    <Router>
      <Routes>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/posts" element={<Post />} />
      </Routes>
    </Router>
  )
}

export default App
