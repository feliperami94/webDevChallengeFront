import React, {useContext} from 'react'
import { StoreContext } from './StoreProvider';

const TaskList = ({fkCategory}) => {

    const [store, dispatch] = useContext(StoreContext);
    const {categories, tasks} = store;

    const deleteTask = (event, task) => {
        event.preventDefault();
        dispatch({
            type: 'delete-task',
            payload: task
        })

    }

  return (
    <div>
        <ul>
            {
                tasks.map(task =>{
                    if (task.fkCategory === fkCategory ){
                    return <li key={task.id}>{task.taskMessage}
                    <button onClick={(e)=>deleteTask(e, task)}>Delete Task</button>
                    </li>
                    }
                })
            }
        </ul>
    </div>
  )
}

export default TaskList