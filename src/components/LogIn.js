import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";
import { login } from "../features/tasksSlice"

import AOS from 'aos'
import 'aos/dist/aos.css'



const LogIn = () => {

    const taskState = useSelector(state => state.taskState);

    const { loginError } = taskState

    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = (e) => {
    e.preventDefault()

    // 
    dispatch(login({email, password}))

    setEmail('')
    setPassword('')
   
    
    }

    useEffect(() => {
   
      if(loginError){
        toast.error(loginError)
      }

      AOS.init({
        offset: 100,
        duration: 500,
        easing: 'ease'
      });
  }, [loginError])
  return (
    <form data-aos='zoom-in' onSubmit={onSubmit} className="login-form">
      <div data-aos="fade-left" className="email-box">
         <label>Email</label>
         <br/>
         <input type='email' placeholder="   enter your email" value={email} onChange={(e)=> setEmail(e.target.value)} />
      </div>

      <div data-aos='fade-right' className="password-box">
          <label>Password</label>
          <br/>
          <input type='password' placeholder="   enter your password" value={password} onChange={(e)=> setPassword(e.target.value)} />
      </div>
      <button className="btn" type="submit">Submit</button>
    </form>
  )
}

export default LogIn