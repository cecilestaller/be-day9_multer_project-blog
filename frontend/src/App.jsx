import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import BlogDetail from './pages/BlogDetail'
import Admin from './pages/Admin'
import { useEffect, useState } from 'react'

function App() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3008/api/blogs")
      .then((res) => res.json())
      .then(({ success, result, error }) => {
        if(!success) throw error;
        setBlogs(result);
      })
      .catch((error) => console.log(error))
  }, [])

  // console.log(blogs);

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Home blogs={blogs} setBlogs={setBlogs}/>} />
          <Route path='/blogs/:blogId' element={<BlogDetail blogs={blogs} setBlogs={setBlogs}/>}/>
          <Route path='/admin' element={<Admin blogs={blogs} setBlogs={setBlogs}/>}/>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
