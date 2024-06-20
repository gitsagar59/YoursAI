import { createContext, useEffect, useRef, useState } from "react";
import run from "../config/gemini";
import { authService } from "../appwrite/appwrite";
import { ID } from "appwrite";

export const Context = createContext();

const ContextProvider = (props) => {
    const containerRef = useRef(null);          //it used to access the DOM element so we can scroll of prompt result
    const flagRef = useRef(false);              
    const [input, setInput] = useState("")
    const [recentprompt, setRecentPrompt] = useState("")
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("")
    const [executable, setExecutable] = useState(false);
    const [responsesCache, setResponsesCache] = useState({});
    const [userDetails, setUserDetails] = useState('')
    const [error, setError] = useState(); 
    const [name, setName] = useState('');
    const [post, setPosts] = useState('');
  
    useEffect(() => {
        if(containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [resultData])

    const delayPara = (index, nextWord) => {
      setTimeout(function() {  
            if(flagRef.current) return;
            setResultData(prev => prev + nextWord)
            setExecutable(true)
        }, 75*index)
    }

    const stopExecute = () => {
        flagRef.current = true; 
    }

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async(prompt) => {   
        const currentPrompt = prompt !== undefined ? prompt : input;
        // if(responsesCache[currentPrompt]) {
        //     setResultData(responsesCache[currentPrompt]);
        //     setShowResult(true);
        //     setLoading(false);
        //     setInput("");
        //     return;
        // }

        setResultData("")
        setLoading(true)
        setShowResult(true)
        flagRef.current = false

       if(input && userDetails) {
        try {
            // const userData = authService.getCurrentUser()
            //    if(userData) { 
            //      setUserDetails(userData)
            //    }
            //    console.log(userDetails.$id)
             const promise = await authService.createPost({ prompts: input, userId: userDetails.$id})
             if(promise) {
                 console.log(promise)
             } 
         } catch(error) {
             console.log(error.message)
         }
       }

        try {
            if(userDetails && userDetails.$id) {
                // const userData = authService.getCurrentUser()
                // if(userData) { 
                //   setUserDetails(userData)
                // }
                const response = await authService.getPosts(userDetails.$id)
                console.log(response.documents)
                if(response.documents) {
                    setPrevPrompts(response.documents);
                }
            }  
         } catch(error) {
            setError(error.message)
        }
        setRecentPrompt(currentPrompt)
        let response = await run(currentPrompt)
        let responseArray = response.split("**");
        let newResponse="";
        for(let i=0; i < responseArray.length; i++) 
            {
                if(i === 0 || i%2 !== 1) {
                    newResponse += responseArray[i]
                } 
                else {  
                    newResponse += "<b>"+responseArray[i]+"</b>"
                }
            }
        let newResponse2 = newResponse.split('*').join("</br>")
        let newResponseArray = newResponse2.split(" ");
        for(let i = 0; i< newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord+" ")
        }
        // setResponsesCache(prevCache => ({ ...prevCache, [currentPrompt]: newResponse2 }));
        setLoading(false)
        setInput("")
    }
    const contextValue = {
        onSent, newChat,containerRef, executable, stopExecute,
        input, setInput,
        recentprompt, setRecentPrompt,
        prevPrompts, setPrevPrompts,
        showResult, setShowResult,
        loading, setLoading,
        resultData, setResultData, error, setError, userDetails, setUserDetails, name, setName
    }

    return (
        <Context.Provider value = {contextValue}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider
