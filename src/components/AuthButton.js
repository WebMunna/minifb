import { FaSignInAlt , FaUser} from 'react-icons/fa'
import { loginButtonClick, regiButtonClick } from '../features/tasksSlice'
import { useDispatch } from 'react-redux'

const AuthButton = () => {

    const dispatch = useDispatch();
  return (
    <div className='auth-button ' >
      <h2>Please LogIn Or Registration For Post Something Here</h2>
      <div className='a-buttons'>
     <button className='login-button btn' onClick={() => {dispatch(loginButtonClick())}}>
       <FaSignInAlt size='20px'/> <h1>Log In</h1>
     </button>
     <button className='logout-button btn' onClick={() => {dispatch(regiButtonClick())}}>
       <FaUser size='20px'/> <h1>Registration</h1>
     </button>
     </div>
    </div>
  )
}

export default AuthButton