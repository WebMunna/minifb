import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask, editTask } from "../features/tasksSlice";
// import { CircularProgress } from "@mui/material"

import AOS from 'aos'
import 'aos/dist/aos.css'

const AddTask = ({ onAdd }) => {

   const dispatch = useDispatch();

    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const taskState = useSelector(state => state.taskState)

    const { idForEdit , editButtonClicked, tasks} = taskState;

    const user = JSON.parse(localStorage.getItem('user'))
    // const currentTasks = state.tasks.filter((task) => task._id !== action.payload._id)
    // return {}

    const taskForEdit = tasks.map((task) => task._id === idForEdit ) 

   

    const onSubmit = (e) => {
        e.preventDefault()

        if (!day) {
            alert('please write something')
            return
        }
      
      
        dispatch(createTask({name:user.name, day:day, reminder:reminder}));
     

        setText('')
        setDay('')
        setReminder(false)
    }

    useEffect(() => {
      AOS.init({
        offset: 100,
        duration: 500,
        easing: 'ease'
      });
    })
  return (
    <>
    <form data-aos='fade-lefe' className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
      
      <h2>Welcome</h2>    
    {/* {
      setTimeout(<h1>{user.name}</h1>, 100)
    } */}
      <h1>{user.name}</h1>
      <h3>To The Talk Tracker</h3>
      
           
        
            
      </div>

      <div className="form-control">
            <label>Post Your Talk Here</label>
            <input type="text" placeholder="write what on your mind" value={day} onChange={(e) => setDay(e.target.value)}/>
      </div>

      <div className="form-control form-control-check">
            <label>গুরুত্বপূর্ণ হলে ডানে টিক চিহ্ন  </label>
            <input type="checkbox" checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
      </div>


      <input type="submit" value="Save Talk" className="btn btn-block"/>
    </form>
    </>
  )
}

export default AddTask
