import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Layout from "./Layout.jsx";
import {Home, About, Contact, User, Github, ErrorPage} from './Components/index.jsx'
import { githubInfoLoader } from './Components/GitHub/Github.jsx';


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children:[
//       {
//         path: "",
//         element: <Home />
//       },
//       {
//         path: "about",
//         element: <About />
//       },
//       {
//         path: "contact",
//         element: <Contact />
//       }
//     ]
//   }
// ])

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />} >
      <Route path='' element={<Home />} errorElement={<ErrorPage />} />
      <Route path='about' element={<About />} errorElement={<ErrorPage />} />
      <Route path='contact' element={<Contact />} errorElement={<ErrorPage />} />
      <Route path='user/:userId' element={<User />} errorElement={<ErrorPage />} />
      <Route 
        path='github' 
        element={<Github />} 
        loader={githubInfoLoader}
        errorElement={<ErrorPage />}
      />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
