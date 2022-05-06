import React, {useContext} from 'react'
import { StoreContext } from './StoreProvider';

const TaskList = ({fkCategory}) => {

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

    const categoryContext = categories.find(category => category.id == fkCategory);

  return (
    <div>
            {
                categoryContext.taskList.map(task =>{
                    return <div className='tasksList' key={task.taskId}>
                            <p className="task-message" style={task.done? {textDecoration: 'line-through'}:{}}>{task.taskMessage}</p>
                            <input type="checkbox" checked={task.done}/>
                            <button onClick={(e)=>{
                                deleteTask(e, task)
                                }}>Delete Task</button>
                            <br />
                            </div>
                })
            }
    </div>
  )
}

export default TaskList