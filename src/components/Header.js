import PropTypes from 'prop-types'

import { useSelector, useDispatch } from 'react-redux'
import { onCancel, showAdd, logOutUser } from '../features/tasksSlice'

import { FaMicrophoneAlt} from 'react-icons/fa'

const Header = ({ title }) => {

  const taskState = useSelector(state => state.taskState);

  // const { showAddTask, editButtonClicked, loggedIn } = taskState;

  const user = JSON.parse(localStorage.getItem('user'))
  const dispatch = useDispatch();

  // const onAdd = () => {
  //    dispatch(showAdd())
  // }

  // const oncCancel = () => {
  //   dispatch(onCancel())
  // }
  
  return (
    <header className='header' id='header'>
        <h1> <FaMicrophoneAlt/>{title}</h1>
        {/* { !editButtonClicked ?
       <Button color={ showAddTask ? 'red' : 'green'} text={ showAddTask ? 'Close' : 'Add'} onClick={onAdd}/>
       :
       <Button color={ 'red' } text={ 'Cancel'} onClick={oncCancel}/>
        } */}
       
        {
          user &&
          <button className='btn' onClick={() => dispatch(logOutUser())}> LogOut </button>
        }
    </header>
  )
}

Header.defaultProps = {
    title: 'Talk Tracker',
}

Header.propTypes ={
    title: PropTypes.string.isRequired,
}

export default Header