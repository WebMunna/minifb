import React from 'react'
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../features/tasksSlice'

import AOS from 'aos'
import 'aos/dist/aos.css'
import { toast } from 'react-toastify'


const SignUp = () => {

   const taskState = useSelector((state) => state.taskState)

   const { registerUserError } = taskState

   const dispatch = useDispatch();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = (e) => {
     e.preventDefault();
       dispatch(registerUser({ name, email, password}))
       
       setName('')
       setEmail('')
       setPassword('')
    }

    useEffect(() => {
      AOS.init({
         offset: 100,
         duration: 500,
         easing: 'ease'
       });

       if(registerUserError){
          
         toast.error(registerUserError)
       }
       
   }, [registerUserError])

  return (
    <form data-aos='zoom-in' className="signup-form" onSubmit={onSubmit}>
    <div data-aos='fade-left' className="name-box">
       <label>Name</label>
       <br/>
       <input type='text' placeholder="   enter your name" value={name} onChange={(e)=> setName(e.target.value)} />
    </div>
    <div data-aos='fade-right' className="email-box">
       <label>Email</label>
       <br/>
       <input type='email' placeholder="   enter your email" value={email} onChange={(e)=> setEmail(e.target.value)} />
    </div>

    <div data-aos='fade-left' className="password-box">
        <label>Password</label>
        <br/>
        <input type='password' placeholder="   enter your password" value={password} onChange={(e)=> setPassword(e.target.value)} />
    </div>
    <button className="btn" type="submit">Submit</button>
  </form>
  )
}

export default SignUp