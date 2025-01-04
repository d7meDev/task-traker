import Button from "./Button"
import { useLocation } from "react-router-dom"
const Header = ({showAddTask,showAddTaskButtonToggle}) => {
  
      const location = useLocation();

  
    return (
    <header className="header">
        <h1>Task Traker</h1>

        {location.pathname==="https://d7medev.github.io/task-traker/"?<Button text={showAddTask? "Close":"Add"} color={showAddTask? "red":"green"} func={showAddTaskButtonToggle}></Button>:""}
        
    </header>
  )
}



export default Header
