import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { editTask, onCanncel } from "../features/tasksSlice";
import { Link } from 'react-scroll'
import { CircularProgress } from "@mui/material";

import AOS from 'aos'
import 'aos/dist/aos.css'


const AddEditTask = ({ onAdd }) => {

   const dispatch = useDispatch();

   
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const taskState = useSelector(state => state.taskState)

    const { idForEdit ,  tasks, updateTaskError, updateTaskStatus } = taskState;

    // const currentTasks = state.tasks.filter((task) => task._id !== action.payload._id)
    // return {}

    const taskForEdit = tasks.map((task) => {
      if(task._id === idForEdit) {
       
      }
      
      return task
    } ) 

    

    const onSubbmit = () => {
        

        if (!day) {
            alert('add something or cancel')
            return
        }
        dispatch(editTask({_id:idForEdit,  day:day, reminder:reminder}))
        setDay('')
        setReminder(false)  
    }

    let editId = `${idForEdit}`

  

    useEffect(() => {
      
      if(updateTaskError){
        toast.error(updateTaskError)
      };
      AOS.init({
        offset: 100,
        duration: 500,
        easing: 'ease'
      });
    },[updateTaskError])
  return (
    <form data-aos='fade-right' id="add-form " className="add-form" >
         {taskState.updateTaskStatus === "pending" ? <CircularProgress/> : null}
       <div  className="edit-can btn" onClick={() => dispatch(onCanncel())}>Cancel</div>
      <div className="form-control edit-talks">
            <label>Change Your Text</label>
            <input type="text" placeholder="Change Your Text" value={day} onChange={(e) => setDay(e.target.value)}/>
      </div>

      <div className="form-control form-control-check">
            <label>গুরুত্বপূর্ণ হলে </label>
            <input type="checkbox" checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
      </div>


     
      <Link className="btn-edit btn btn-block btn" to={editId} smooth={true} duration={1000} onClick={onSubbmit}> Edit Talk </Link> 
    </form>
  )
}

export default AddEditTask
