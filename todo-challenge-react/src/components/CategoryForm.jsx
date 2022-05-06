import React, {useContext, useState, useRef} from 'react'
import { StoreContext } from './StoreProvider'
import TaskList from './TaskList';

const CategoryForm = () => {
    const [store, dispatch] = useContext(StoreContext);
    const {categories, tasks} = store;
    const [taskTitle, setTaskTitle] = useState('');
    const inputRef = useRef('');

    const addTaskTitle = (event) =>{
        setTaskTitle(event.target.value);
    }

    const deleteCategory = (event, category) =>{
        event.preventDefault();
        dispatch({
            type: 'delete-category',
            payload: category
        })
    }

    const addTask = (event, idCategory) => {
        event.preventDefault();
        if(taskTitle){
            const newTask={
                id: Math.floor(Math.random()*10000),
                taskMessage: taskTitle,
                taskStatus: false,
                fkCategory: idCategory
            }
            inputRef.current.value = '';
            setTaskTitle('');
            dispatch({
                type: 'create-task',
                payload: newTask
            })
            
        }
    }

  return (
    <div className='general-container'>
        {
            categories.map(category => {
                return <div key={category.id} className={'category-container'}>
                    <h2>{category.categoryName}    </h2>
                <button onClick={(e)=>deleteCategory(e, category)}>Delete Category</button>
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