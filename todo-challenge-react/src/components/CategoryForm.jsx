import React, {useContext, useState, useRef, useEffect} from 'react'
import { StoreContext } from './StoreProvider'
import TaskList from './TaskList';

const CategoryForm = () => {
    const [store, dispatch] = useContext(StoreContext);
    const {categories} = store;
    // console.log(categories)
    const [taskTitle, setTaskTitle] = useState('');
    const inputRef = useRef('');

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

            let taskSaved = await taskSavedPromise.json();

            dispatch({
                type: 'create-task',
                payload: taskSaved
            })
            inputRef.current.value = '';
            setTaskTitle('');
            
        }
    }

  return (
    <div className='general-container'>
        {
            categories.map(category => {
                return <div key={category.id} className={'category-container'}>
                    <h2>{category.categoryName}    </h2>
                <button onClick={(e)=>deleteCategory(e, category.id)}>Delete Category</button>
                <br />

                <input type="text" onChange={addTaskTitle} ref={inputRef}/>
                <button onClick={(event)=>{addTask(event, category.id)}}>Create Task</button>
                <TaskList fkCategory={category.id} />
                <br/>
                </div>
            })
        }
    </div>
  )
}

export default CategoryForm