import React, { useContext, useEffect, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../appwrite/appwrite';

const Sidebar = () => {

    const [extended, setExtended] =  useState(false);
    const {prevPrompts, setRecentPrompt, onSent, newChat, setPrevPrompts} = useContext(Context)
    const [reversedPrompts, setReversedPrompts] = useState([]);
    const navigate = useNavigate()

    const loadPrompt = async (prompt) => {
      setRecentPrompt(prompt)
      await onSent(prompt)
    }

    const getPromptsReverse = (items) => {
      return items.slice().reverse();
    }
  
    useEffect(() => {
      if(prevPrompts) {
        const prompting = getPromptsReverse(prevPrompts)
        setReversedPrompts(prompting)
      }
    }, [prevPrompts])

    const handleLogout = async() => {
      try {
        await authService.logout()
        navigate("/login")
      } catch(error) {
        console.log(error);
      }
    }

    const deletePrompt = async(Id) => {
      try {
        await authService.deletePost(Id)
        const updatedPrompts = prevPrompts.filter(prompt => prompt.$id !== Id)
        setPrevPrompts(updatedPrompts)
      }catch(error) {
        console.log(error.message)
      }
    }

  return (
    <div className='sidebar'>
      <div className="top">
            <img 
            onClick={() => setExtended(prev => !prev)} 
            className='menu' 
            src={assets.menu_icon}
            />
            <div onClick={()=>newChat()} className='new-chat'>
                <img src={assets.plus_icon} alt="" />
                {extended ? <p>New Chat</p> : null}
            </div>
            {extended ? 
                    <div className="recent">
                        <p className="recent-title">Recent</p>                          
                          {reversedPrompts && reversedPrompts.map(item => {
                            return(
                              <div className='flex flex-row justify-items-start items-center' key={item.$id}>
                                <div>
                                  <img 
                                    src={assets.message_icon} 
                                    onClick={() => {deletePrompt(item.$id)}} 
                                    className='object-contain cursor-pointer
                                  '/>
                                </div>
                                <div
                                onClick={() => loadPrompt(item.prompts, item.$id)} 
                                className='recent-entry'
                                > 
                                  {item.prompts && (<p title={item.prompts}>{Array.prototype.slice.call(item.prompts, 0, 15)}...</p>)}
                                </div>
                              </div>
                            )
                          })}
                    </div>
            : null}        
      </div>
      <div className='inline-block bottom-item recent-entry'>
            <img src={assets.history_icon} alt="" />
            <button type='button' onClick={handleLogout}>{extended ? <p>LOGOUT</p> : null}</button>
      </div>
    </div>
  )
}

export default Sidebar
