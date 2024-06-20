import React, { useEffect, useContext } from 'react'
import Sidebar from './components/sidebar/Sidebar'
import Main from './components/main/Main'
import { useNavigate } from 'react-router-dom'
import { Context } from './context/Context'
import { authService } from './appwrite/appwrite'

function App() {
  const navigate = useNavigate()
  const {userDetails, setUserDetails, setShowResult, setPrevPrompts} = useContext(Context)

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if(userData) {
          setShowResult(false);
          setUserDetails(userData);
          if (userData && userData.$id) {
            const response = await authService.getPosts(userData.$id, userData.$createdAt);
            console.log(response)
            if (response.documents) {
              console.log(response.documents)
              setPrevPrompts(response.documents); 
            }
          }
        } else {
          navigate('/login');
        }
      } catch(error) {
        console.log(error.message);
        navigate('/login');
      }
    }
    fetchUserAndPosts();
  }, [navigate, setShowResult, setUserDetails, setPrevPrompts]);

  return (
    <>
       { userDetails ? 
        <div className='flex flex-row'>
          <Sidebar />
          <Main />
        </div>
      : null }
    </>
  )
}

export default App
