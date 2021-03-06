import React, {useContext} from 'react'
import { StoreContext } from '../store/StoreProvider';

const TaskList = ({fkCategory, setEditingState, setTaskTitle, setTask}) => {

    const [store, dispatch] = useContext(StoreContext);
    const {categories} = store;

    const deleteTask = async (event, taskToBeDeleted) => {
        event.preventDefault();
        let response = await fetch(`http://localhost:8081/api/v1/delete/task/${taskToBeDeleted.taskId}`,
        {
            method: 'DELETE'
        })
        if (response.status === 200){
          dispatch({
            type: 'delete-task',
            payload: taskToBeDeleted
          })
        }

    }

    const onCheckbox = async (event, task) => {
        const checked = event.currentTarget.checked
        let taskWithCheckBoxInformation = {...task, taskStatus: checked}

        let taskUpdatedPromise = await fetch('http://localhost:8081/api/v1/update/task',
        {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(taskWithCheckBoxInformation)
        })
        let taskUpdated = await taskUpdatedPromise.json();
  
        dispatch({
          type:'update-task',
          payload: taskUpdated
        })
    }

    const editTaskName = (e, task) => {
        e.preventDefault();
        setEditingState(true);
        setTaskTitle(task.taskMessage);
        setTask(task);
    }

    const categoryContext = categories.find(category => category.id == fkCategory);

  return (
    <div>
            {
                categoryContext.taskList.map(task =>{
                    return <div className='tasksList' key={task.taskId}>
                            <p className="task-message" style={task.taskStatus? {textDecoration: 'line-through'}:{}}>{task.taskMessage}</p>
                            <input type="checkbox" onChange={(event) => onCheckbox(event, task)} checked={task.taskStatus}/>
                            <button onClick={(e)=>{
                                deleteTask(e, task)
                            }}>Delete Task</button>
                            <button onClick={(e)=>{
                                editTaskName(e, task)
                            }}>Edit Task</button>
                            <br />
                            </div>
                })
            }
    </div>
  )
}

export default TaskList