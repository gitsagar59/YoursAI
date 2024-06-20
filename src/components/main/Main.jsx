import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {

  const {onSent, recentprompt, showResult, loading, resultData, setInput, input, containerRef, executable, stopExecute, userDetails} = useContext(Context)

  return (
    <div className='main'>
      <div className='nav'>
        <p>YourAI</p>
        <img src={assets.user_icon} alt="" />
      </div>

      <div className="main-container">

      {!showResult ? 
      <>
        <div className="greet">
          <p><span>Hello, {userDetails.name}</span></p>
          <p>How can i help you today?</p>
        </div>
        <div className='cards'>
          <div className='card'>
            <p>Suggest beautiful places to visit on an upcoming roadd trip</p>
            <img src={assets.compass_icon} alt="" />
          </div>
          <div className='card'>
            <p>Briefly summarize this concept: urban planning</p>
            <img src={assets.compass_icon} alt="" />
          </div>
          <div className='card'>
            <p>brainstrom team bonding activities for our work retreat</p>
            <img src={assets.compass_icon} alt="" />
          </div>
          <div className='card'>
            <p>Improve the readability of the following code</p>
            <img src={assets.compass_icon} alt="" />
          </div>
        </div>
      </> 
      : <div className='result' ref={containerRef}>
          <div className='result-title'>
            <img src={assets.user_icon} alt="" />
            <p>{recentprompt}</p>
          </div>
          <div className="result-data">
            <img src={assets.gemini_icon} alt="" />
            {loading  
            ? <div className='loader'>
              <hr />
              <hr />
              <hr />          
              </div> : <p dangerouslySetInnerHTML={{__html: resultData}}></p>}
          </div>
        </div>}

        <div className='main-bottom'>
          <div className="search-box">
            <input 
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={(e) => {if(e.key === 'Enter') onSent()}} 
            value={input} 
            type="text" 
            placeholder='enter a prompt here'
            /> 
            <div>
              { input ? ( <img onClick={() => onSent()} src={assets.send_icon} alt="" /> ) : executable ? (<img onClick={() => stopExecute()} src={assets.send_icon} />) : (<img src={assets.send_icon} aria-disabled style={{cursor : 'not-allowed'}} />) }
            </div>
          </div>
          <p className='botton-info'>
            Gemini may display inaccurate info including about people, so double check its responses.Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main
