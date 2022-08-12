import { FaTrash, FaEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment";
import { deleteTask, editButton } from '../features/tasksSlice';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {Link} from 'react-scroll'

import AOS from 'aos'
import 'aos/dist/aos.css'

// const stopScrol = () => {
//   clearInterval(editScrol)
// }


const Task = ({ task, scrollId }) => {
  
  const dispatch = useDispatch();

  // const taskState = useSelector(state => state.taskState)

  // const { deleteTaskError } = taskState;

  // const pageScroll = () => {
  //   const element = document.getElementById('root')
  //   element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  //  }


  const editHandler = () => {
    // pageScroll();
   const id = task._id

   
   dispatch(editButton(id))
   
  }

 

  useEffect(() => {
   
    AOS.init({
      offset: 100,
      duration: 500,
      easing: 'ease'
    });
  },[])
 

  return (
    <>
      <ToastContainer/>
      
    <div key={task._id} data-aos='fade-left'   className={`task ${task.reminder ? 'reminder' : ''}`} id={`${scrollId}`}>
       
      <div className='contents'>
       
         <h4>Posted By: </h4>
         
         <h3 style={{ color: "steelblue"}}>{task.name}</h3>
         <hr style={{width: '200px'}}/>
         <br/>
       
         
          <p style={{textAlign: 'center'}}>{task.day}</p>
          <p className='moment'>Added: {moment(task.createdAt).fromNow()}</p>
        
      </div>
    
       
     <div className='buttons'>
         
          <button className='delete-btn' onClick={()=> dispatch(deleteTask(task._id))}><FaTrash size='15px'/></button>
          
          <button className='edit-btn' onClick={editHandler}> <Link  onClick={editHandler} to = 'add-form'  smooth={true} duration={1000}><FaEdit size='20px'/></Link></button>
          
     </div>
    </div>
    </>
    
  )
}

export default Task