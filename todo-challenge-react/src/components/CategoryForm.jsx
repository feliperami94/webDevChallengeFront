import React, {useContext, useState, useRef, useEffect} from 'react'
import { StoreContext } from './StoreProvider'
import TaskList from './TaskList';

const CategoryForm = () => {
    const [store, dispatch] = useContext(StoreContext);
    const {categories} = store;
    // console.log(categories)
    const [taskTitle, setTaskTitle] = useState('');
    const inputRef = useRef('');
    const [editingState, setEditingState] = useState(false);
    const [task, setTask] = useState('');


    useEffect(()=>{
        let fetchCategories = fetchAllCategories().then(
          categoriesFetched => {
            let action ={
              type: 'get-categories',
              payload: categoriesFetched
            }
            dispatch(action);
          }
        )
      }, [])
    //   console.log(categories);
      const fetchAllCategories = async() =>{
        let response = await fetch('http://localhost:8081/api/v1')
        let data = await response.json()
        return data
      }
  

    const addTaskTitle = (event) =>{
        setTaskTitle(event.target.value);
    }

    const deleteCategory = async (event, categoryId) =>{
        event.preventDefault();
        let response = await fetch(`http://localhost:8081/api/v1/delete/category/${categoryId}`,
        {
            method: 'DELETE'
        })
        if (response.status === 200){
          dispatch({
            type: 'delete-category',
            payload: categoryId
          })
        }
        
    }

    const addTask = async (event, idCategory) => {
        event.preventDefault();
        if(taskTitle){
            const newTask={
                taskMessage: taskTitle,
                taskStatus: false,
                fkCategory: idCategory
            }
            let taskSavedPromise = await fetch('http://localhost:8081/api/v1/task',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(newTask)
            })

            setTaskTitle('');
            inputRef.current.value = '';
            let taskSaved = await taskSavedPromise.json();

            dispatch({
                type: 'create-task',
                payload: taskSaved
            })
            
        }
    }

    const updateTask = async (event, idCategory) => {
        event.preventDefault();
        setEditingState(false);
        if(taskTitle){
            const updateTask={
                taskId: task.taskId,
                taskMessage: taskTitle,
                taskStatus: task.taskStatus,
                fkCategory: task.fkCategory
            }
            console.log(updateTask)
            
            let taskUpdatedPromise = await fetch('http://localhost:8081/api/v1/update/task',
        {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updateTask)
        })
        let taskUpdated = await taskUpdatedPromise.json();
  
        dispatch({
          type:'update-task',
          payload: taskUpdated
        })
        setTaskTitle('');
        inputRef.current.value = '';
        setEditingState(false);
        }
        
    }

  return (
    <div className='general-container'>
        <form >
        {
            categories.map(category => {
                return <div key={category.id} className={'category-container'}>
                    <h2>{category.categoryName}    </h2>
                <button onClick={(e)=>deleteCategory(e, category.id)}>Delete Category</button>
                <br />

                <input type="text" onChange={addTaskTitle} ref={inputRef} value={taskTitle}/>

                <input type="submit" onClick={editingState? (event)=>{updateTask(event, category.id)}:(event)=>{addTask(event, category.id)}} value={editingState?"Update task":"Create task"}></input>

                <TaskList fkCategory={category.id} setEditingState={setEditingState} setTaskTitle={setTaskTitle} setTask={setTask}/>
                <br/>
                </div>
            })
        }

        </form>
    </div>
  )
}

export default CategoryForm