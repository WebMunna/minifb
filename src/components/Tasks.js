import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getTask } from "../features/tasksSlice"
import { CircularProgress } from "@mui/material"
import { toast } from "react-toastify"



import Task from "./Task"




const Tasks = () => {

  const taskState = useSelector(state => state.taskState)
 
  const { tasks, deleteTaskError, deleteTaskStatus } = taskState;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTask());
    if(deleteTaskError){

      toast.error(deleteTaskError)
    }
  
  }, [dispatch, deleteTaskError])

  

 

 
  return (
      
   <div className="task-box">
     {taskState.getTaskStatus === "pending" ? <CircularProgress/> : null}
     {taskState.deleteTaskStatus === "pending" ? <CircularProgress/> : null}
   {tasks.map((task) => (
       <Task key={task._id} task={task} scrollId={task._id} />
   ))}
   {tasks.length === 0 && <p className="no-task" > There is No Talk To Show! </p> } 
   </div>
  )
}

export default Tasks