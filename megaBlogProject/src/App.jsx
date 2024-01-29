import React,{ useState, useEffect } from 'react'
import {useDispatch} from "react-redux";
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import {Header, Footer} from "./components/index"
import "./App.css"
import { Outlet } from 'react-router-dom';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        // if userData exists, then store it in redux state
        dispatch(login({userData}));
      }
      else{
        console.log("user data not found")
        dispatch(logout());
      }
    })
    .catch((error) => console.log(error))
    .finally(() => setIsLoading(false));
  }, []);
  

  return !isLoading ? 
      <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
        <div className="w-full block">
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
        <h1>A react app with Appwrite</h1>
      </div>
  :
    (<div>Loading....</div>)

}

export default App
