import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const baseURL = "http://localhost:4000/api/"

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    tasks: [],
    showAddTask: false,
    idForEdit:"",
    editButtonClicked:false,
    loggedIn: user,
    loginButton: false,
    regiButton: false,
    createTaskStatus: "",
    createTaskError: "",
    message:"",

    registerUserStatus: "",
    registerUserError: "",
    loginStatus:"",
    loginError:"",

    getTaskStatus: "",
    getTaskError:"",
    updateTaskStatus:"",
    updateTaskError:"",
    deleteTaskStatus:"",
    deleteTaskError:""
}

//Register user
export const registerUser = createAsyncThunk('auth/register', async(user, { rejectWithValue }) => {
    try {
        const response = await axios.post(baseURL + "users", user)
        
        if(response.data) {
            localStorage.setItem('user', JSON.stringify(response.data))
        }
        // return response.data
      } catch (error) {
         console.log(error);
         return rejectWithValue(error.response?.data)
      }
})

//Login user
export const login = createAsyncThunk('auth/login', async(user,  { rejectWithValue }) => {
    try {
      const response = await axios.post(baseURL + "users/login", user)
   
      if(response.data) {
          localStorage.setItem('user', JSON.stringify(response.data))
      }
    //    return response.data
    } catch (error) {
       console.log(error);
       return rejectWithValue(error.response?.data)
    }
})



export const createTask = createAsyncThunk(
    "tasks/createTask",
    async (task, { rejectWithValue }) => {

        try {
            const user = JSON.parse(localStorage.getItem('user'))
            const token = user.token
          
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            
            const response = await axios.post(baseURL + "tasks", task, config);
           
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data)
        }
    }
);
export const getTask = createAsyncThunk(
    "tasks/getTask",
    async (id = null, { rejectWithValue }) => {

        try {
            const response = await axios.get(baseURL + "tasks");
           
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data)
        }
    }
);
export const deleteTask = createAsyncThunk(
    "tasks/deleteTask",
    async (id, thunkAPI) => {

        try {

            const user = JSON.parse(localStorage.getItem('user'))
            const token = user.token

           
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await axios.delete(baseURL + "tasks/" + id, config);
            
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response?.data)
        }
    }
);
export const editTask = createAsyncThunk(
    "tasks/editTask",
    async (tas , thunkAPI) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            const token = user.token
         
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const { _id, task, day, reminder} = tas;
            
            const response = await axios.put(baseURL + "tasks/" + _id, {
                task,
                day,
                reminder,
                
            }, config);
           
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response?.data)
        }
    }
);



export const taskSlice = createSlice({
    name: 'tasks',
   initialState,
   reducers: {
       showAdd: (state, action) => {
        //    state.showAddTask = !state.showAddTask

        if(state.editButtonClicked){
            state.editButtonClicked = !state.editButtonClicked
            state.showAddTask = true
        } else {
            state.showAddTask = !state.showAddTask
        }
       },
       editButton: (state, action) => {
           
           const user = JSON.parse(localStorage.getItem('user'))
           state.idForEdit = action.payload
         

        //    if(!state.showAddTask ) {
           
        //     state.editButtonClicked = !state.editButtonClicked
        //    } else if(state.showAddTask) {
        //     state.editButtonClicked = !state.editButtonClicked
        //     state.showAddTask = !state.showAddTask
        //    }


        
        if(user){
            
            state.editButtonClicked = true
        } else if(user && !state.editButtonClicked) {
            state.editButtonClicked = !state.editButtonClicked
        } else if( !user) {
                 state.message = "Please LogIn Or Registration"
                 state.editButtonClicked = false
                 toast.error("Please LogIn Or Registration")
        }
        
       },

       onCanncel: (state, action) => {
           state.editButtonClicked = false
       },
       loginButtonClick: (state, action) => {
        

            
        if(state.regiButton){
            state.regiButton = !state.regiButton
            state.loginButton = true
        } else {
            state.loginButton = !state.loginButton
        }
       },
       loginButtonCancel: (state, action) => {
           state.loginButton = false
       },

       regiButtonClick: (state, action) => {
        if(state.loginButton){
            state.loginButton = !state.loginButton
            state.regiButton = true
        } else {
            state.regiButton = !state.regiButton
        }
       },
       regiButtonCancel: (state, action) => {
           state.regiButton = false
       },
       logOutUser: (state, action) => {
        localStorage.clear()
        state.user = null
        state.loggedIn = false
       }
        //       edit: (state, action) => {
        //     const { id, task, dateTime, reminder} = action.payload;
        //     const taskToEdit = state.find((task) => task.id === id );

        //     if(taskToEdit) {
        //         taskToEdit.task = task;
        //         taskToEdit.dateTime = dateTime;
        //         taskToEdit.reminder = reminder;
        //     }
        // },
        // toggle: (state, action) => {
            
        // },

        // remove: (state, action) => {
        //     const {payload} = action;

        //     const index = state.find(task => task.id === payload);

        //     if (index !== -1) {
        //          state.splice(index, 1)
        //     }
        // }
    },


   
   extraReducers: {
     [registerUser.pending]: (state, action) => {
         return {
             ...state,
         

             registerUserStatus: "pending",
             registerUserError: "",
             loginStatus:"",
             loginError:"",
         }
     },
     [registerUser.fulfilled]: (state, action) => {
         return {
             ...state,
            //  user: [action.payload, ...state.user],
             
            
           

            registerUserStatus: "success",
            registerUserError: "",
            loggedIn:"true",
            loginStatus:"",
            loginError:"",
         }
     },
     [registerUser.rejected]: (state, action) => {
         return {
             ...state,
            

             registerUserStatus: "rejected",
             registerUserError: action.payload,
             loginStatus:"",
             loginError:"",
         }
     },
     [login.pending]: (state, action) => {
         return {
             ...state,
         

             registerUserStatus: "",
             registerUserError: "",
             loginStatus:"pending",
             loginError:"",
         }
     },
     [login.fulfilled]: (state, action) => {
         return {
             ...state,
            //  user: [action.payload, ...state.user],
             
            
           

            registerUserStatus: "",
            registerUserError: "",
            loggedIn:"true",
            loginStatus:"success",
            loginError:"",
         }
     },
     [login.rejected]: (state, action) => {
         return {
             ...state,
            

             registerUserStatus: "",
             registerUserError: "",
             loginStatus:"rejected",
             loginError:action.payload,
         }
     },
     [createTask.pending]: (state, action) => {
         return {
             ...state,
             createTaskStatus: "pending",
             createTaskError: "",
             getTaskStatus: "",
             getTaskError:"",
             updateTaskStatus:"",
             updateTaskError:"",
             deleteTaskStatus:"",
             deleteTaskError:"",

             registerStatus: "",
             registerError: "",
             loginStatus:"",
             loginError:"",
         }
     },
     [createTask.fulfilled]: (state, action) => {
         return {
             ...state,
             tasks: [action.payload, ...state.tasks],
             createTaskStatus: "success",
             createTaskError: "",
             getTaskStatus: "",
             getTaskError:"",
             updateTaskStatus:"",
             updateTaskError:"",
             deleteTaskStatus:"",
             deleteTaskError:"",

            registerStatus: "",
            registerError: "",
            loginStatus:"",
            loginError:"",
         }
     },
     [createTask.rejected]: (state, action) => {
         return {
             ...state,
             createTaskStatus: "rejected",
             createTaskError: action.payload,
             getTaskStatus: "",
             getTaskError:"",
             updateTaskStatus:"",
             updateTaskError:"",
             deleteTaskStatus:"",
             deleteTaskError:"",

             registerStatus: "",
             registerError: "",
             loginStatus:"",
             loginError:"",
         }
     },
     [getTask.pending]: (state, action) => {
         return {
             ...state,
             createTaskStatus: "",
             createTaskError: "",
             getTaskStatus: "pending",
             getTaskError:"",
             updateTaskStatus:"",
             updateTaskError:"",
             deleteTaskStatus:"",
             deleteTaskError:""
         }
     },
     [getTask.fulfilled]: (state, action) => {
         return {
             ...state,
             tasks: action.payload,
             createTaskStatus: "",
             createTaskError: "",
             getTaskStatus: "success",
             getTaskError:"",
             updateTaskStatus:"",
             updateTaskError:"",
             deleteTaskStatus:"",
             deleteTaskError:""
         }
     },
     [getTask.rejected]: (state, action) => {
         return {
             ...state,
            createTaskStatus: "",
            createTaskError: "",
            getTaskStatus: "rejected",
            getTaskError: action.payload,
            updateTaskStatus:"",
            updateTaskError:"",
            deleteTaskStatus:"",
            deleteTaskError:""
             
         }
     },
     [deleteTask.pending]: (state, action) => {
         return {
             ...state,
             createTaskStatus: "",
             createTaskError: "",
             getTaskStatus: "",
             getTaskError:"",
             updateTaskStatus:"",
             updateTaskError:"",
             deleteTaskStatus:"pending",
             deleteTaskError:""
         }
     },
     [deleteTask.fulfilled]: (state, action) => {

        const currentTasks = state.tasks.filter((task) => task._id !== action.payload._id)
         return {
            ...state,
             tasks: currentTasks,
             createTaskStatus: "",
             createTaskError: "",
             getTaskStatus: "",
             getTaskError:"",
             updateTaskStatus:"",
             updateTaskError:"",
             deleteTaskStatus:"success",
             deleteTaskError:""
         }
     },
     [deleteTask.rejected]: (state, action) => {
         
             return {
                 ...state,
                createTaskStatus: "",
                createTaskError: "",
                getTaskStatus: "",
                getTaskError: "",
                updateTaskStatus:"",
                updateTaskError:"",
                deleteTaskStatus:"rejected",
                deleteTaskError:action.payload ? action.payload : 'Please logIn Or Registration'
             }
     },
     [editTask.pending]: (state, action) => {
         return {
             ...state,
             createTaskStatus: "",
             createTaskError: "",
             getTaskStatus: "",
             getTaskError:"",
             updateTaskStatus:"pending",
             updateTaskError:"",
             deleteTaskStatus:"",
             deleteTaskError:""
         }
     },
     [editTask.fulfilled]: (state, action) => {

       const editedTasks = state.tasks.map((task) => task._id === action.payload._id ? action.payload : task)

         return {
            ...state,
             tasks: editedTasks,
             createTaskStatus: "",
             createTaskError: "",
             getTaskStatus: "",
             getTaskError:"",
             updateTaskStatus:"success",
             updateTaskError:"",
             deleteTaskStatus:"",
             deleteTaskError:""
         }
     },
     [editTask.rejected]: (state, action) => {
         
        return {
            ...state,
            createTaskStatus: "",
            createTaskError: "",
            getTaskStatus: "",
            getTaskError:"",
            updateTaskStatus:"rejected",
            updateTaskError: action.payload,
            deleteTaskStatus:"",
            deleteTaskError:"",
            
        }
     },
   }
        })



// export const { create, edit, remove } = taskSlice.actions;
export const { showAdd, editButton, onCanncel, loginButtonClick, loginButtonCancel, regiButtonClick, regiButtonCancel, logOutUser } = taskSlice.actions;
export default taskSlice.reducer;