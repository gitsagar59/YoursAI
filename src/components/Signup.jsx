import React, { useContext, useState } from 'react';
import { authService } from '../appwrite/appwrite';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/Context';

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const[user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })
    
    const { setUserDetails } = useContext(Context)
    const signupUser = async (e) => {
        e.preventDefault()
        setError("")

        if(!/^[A-Za-z]*$/.test(user.name)) {
            setError("Please enter a valid name using alphabetic characters only");
            return;
        }

        try {
            const response = await authService.createAccount(user)
            if(response) {
                const userData = await authService.getCurrentUser()
                if(userData) {
                    console.log("Signup successful:", response)
                    setUserDetails(userData);
                    navigate("/");
                }
            }
        } catch(error) {
            setError(error.message)
        }
    }

    return ( 
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="text-center font-bold text-2xl">Sign up</div>
        <div className='text-center mt-5  text-red-600'>{error ? <p>{error}</p> : null}</div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <form className="space-y-6" action="#" method="POST">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <div className="mt-1">
                        <input type="text" id="name" name="name" pattern="[A-Za-z]*" title="Please enter a valid name using alphabetic characters only" autoComplete='name' required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={(e) => {
                            setUser({
                                ...user, name: e.target.value
                            })
                        }}
                        />
                    </div>
                </div>
                <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email :</label>
                        <div className="mt-1">
                            <input id="email" name="email" type="email" autoComplete="email" required 
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={(e) => {
                                setUser({
                                    ...user,
                                    email: e.target.value
                                })
                            }}
                            />
                        </div>
                </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password :</label>
                        <div className="mt-1">
                            <input id="password" name="password" type="password" autoComplete="current-password" required 
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={(e) => {
                                setUser({
                                    ...user,
                                    password: e.target.value
                                })
                            }}
                            />
                        </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                            <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Already have an account, Sign In
                            </a>
                            </div>
                        </div>            
                <div>
                    <button 
                    type='submit'
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={signupUser}>
                        Sign Up
                    </button>   
                </div>
            </form>
            </div>
            </div>

     );
}

export default Signup;