import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {Protectedlayout } from './components'
import Home from './pages/Home.jsx'
import AllPosts from "./pages/AllPosts.jsx"
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import AddPost from "./pages/AddPost.jsx"
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from "./pages/SignupPage.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: (
          <Protectedlayout authentication={false}>
            <LoginPage />
          </Protectedlayout>
        )
      },
      {
        path: "/signup",
        element: (
          <Protectedlayout authentication={false}>
            <SignupPage />
          </Protectedlayout>
        )
      },
      {
        path: "/all-posts",
        element: (
          <Protectedlayout authentication>
            {" "}
            <AllPosts />
          </Protectedlayout>
        )
      },
      {
        path: "/add-post",
        element: (
          <Protectedlayout authentication>
            {" "}
            <AddPost />
          </Protectedlayout>
        )
      },
      {
        path: "/edit-post/:slug",
        element: (
          <Protectedlayout authentication>
            {" "}
            <EditPost />
          </Protectedlayout>
        )
      },
      {
        path: "/post/:slug",
        element: <Post/>
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
)
