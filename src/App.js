
import AddTask from "./components/AddTask";
import AddEditTask from "./components/AddEditTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useSelector} from "react-redux";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import AuthButton from "./components/AuthButton";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";









function App() {

  // const [showAddTask, setShowAddTask] = useState(false)
  

  const taskState = useSelector(state => state.taskState);

  const { editButtonClicked, createTaskStatus, registerUserStatus, updateTaskStatus, deleteTaskStatus, loginButton, regiButton} = taskState;

  const user = JSON.parse(localStorage.getItem('user'))
  // let loading = false
  // useEffect(() => {
  //  if(createTaskStatus || registerUserStatus || updateTaskStatus || deleteTaskStatus ){
  //     loading = true
  //  }
  // }, [createTaskStatus, registerUserStatus, updateTaskStatus, deleteTaskStatus]);



  return (
    <div className="container">
     <Header/>
     { user &&
     <AddTask/>
     
     }
   
 
     { user && editButtonClicked ?
     <AddEditTask/>
     :null
     }
     {
       !user &&
        <AuthButton/>
     }

     {
       !user && loginButton ?
       <LogIn/>
       : null
     }
     {
       !user && regiButton ?
       <SignUp/>
       : null
     }
  
    
  
     <Tasks />
     
    </div>
  );
}

export default App;
