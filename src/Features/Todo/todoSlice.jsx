import { createSlice,nanoid } from '@reduxjs/toolkit'


const getLocalItem=()=>{
  let list=localStorage.getItem('todos');
  if(list){
      return JSON.parse(list);
  }else{
      return [];
  }
}
const initialState = {
  todos:getLocalItem()
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodos: (state,action) => {
      const todo = {
        id:nanoid(),
        work: action.payload,
      }
      state.todos.push(todo)
    },
    deleteTodos: (state,action) => {
        state.todos = state.todos.filter(todo => todo.id!== action.payload)
        console.log(action.payload)
    },
    updateTodos: (state,action) => {
      state.todos = state.todos.map(todo => todo.id === action.payload.id? action.payload : todo)
     
    }
  }
})

// Action creators are generated for each case reducer function
export const {addTodos,deleteTodos,updateTodos} = todoSlice.actions

export default todoSlice