import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTodos,deleteTodos,updateTodos } from '../Features/Todo/todoSlice'
function Home() {
  const todos = useSelector((state) => state.todos.todos);


  const dispatch = useDispatch()
  const [input,setinputHanlder] = useState("")
  const [editBox,setEditBox] = useState(false);
    const [editIndex, setEditIndex] = useState(null);



  const handleAddTodo=()=>{
      dispatch(addTodos(input)); // Dispatch action with Work field
      setinputHanlder(""); // Reset input after adding
  }

    useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const editHandler=(index)=>{
    setEditIndex(index);
    setEditBox(true)
   }

   const editInputHandler=(e)=>{

    setinputHanlder(e.target.value)
       
   }
   const editSubmitHandler=(e)=>{

       e.preventDefault();
  
    if (!input) return; 
    const updateData = { id: editIndex, work: input };
    dispatch(updateTodos(updateData));
    setinputHanlder(""); 
   
    setEditBox(false)
   }

  return (
   
   <div className="container-fluid text-center  ">
    {/* ======================input row================== */}
    <div className="row py-5 mt-5 justify-content-center">
      <div className="col-md-4">
        {
           editBox ? <form action="" onSubmit={editSubmitHandler} className='flex'>
          <input type="text" placeholder="Enter your todo's" value={input} onChange={editInputHandler} className='rounded   w-full px-3 py-1 '/>

          <button type="submit" className='btn btn-danger text-white '>edit</button>
      </form>:<>
      <input type="text" value={input} onChange={(e)=>setinputHanlder(e.target.value)}  placeholder="Enter your todo's" />
        <button className='btn btn-primary' onClick={() => handleAddTodo()}> Add</button>
      </>
        
        }
      </div>
    </div>
    {/* ==========================================table row======================== */}
    <div className="row justify-content-center">
      <div className="col-md-6">
      <table className="table  table table-dark table-striped">
  <thead>
    <tr>
      <th scope="col">NO.</th>
      <th scope="col">Work</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    {
      todos.map((todo,index) => (
        <tr key={index}>
          <th scope="row">{index+1}</th>
          <td>{todo.work}</td>
          <td><button className='btn btn-primary' onClick={()=>editHandler(todo.id)}>Edit</button></td>
          <td><button className='btn btn-danger' onClick={()=>dispatch(deleteTodos(todo.id))}>Delete</button></td>
        </tr>
      ))
    }
  
   
  </tbody>
</table>
      </div>
    </div>
   </div>
  )
}

export default Home