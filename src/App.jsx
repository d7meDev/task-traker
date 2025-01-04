import Header from "./comps/Header";
import Footer from "./comps/Footer";
import Tasks from "./comps/Tasks";
import AddTask from "./comps/AddTask";
import { useState, useEffect } from "react";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import About from "./comps/About";

function App() {
  const [showAddTask, setShowAddTask] = useState(true);

  const [tasks, setTasks] = useState([]);


  useEffect(() => {
    try{
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }
  catch(error){
    console.log(error)
  }
  }, []);
  

  const fetchTasks = async () => {
    try{
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    return data;
    }
    catch(error){
      console.log(error)
      return[];
    }
  };

  const addTask = async (task) => {

    let lastId = tasks.length ? Math.max(...tasks.map(task => task.id)) : 0;
  
    try{
    await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: lastId + 1, ...task }),
    });
  }
  catch(e){
    console.log(e);
  }

    setTasks([...tasks, { id: lastId + 1, ...task }]);
  
    
  };

  async function deleteTask(id) {

    try{
      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
      });
    }
    catch(e){
      console.log(e)
    }
  

    setTasks(tasks.filter((task) => task.id !== id));
     
   
    
    
  }

  const toggleReminder = async (id) => {

    try{ 

      const [task] = tasks.filter((task) => task.id === id);
      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reminder: !task.reminder,
        }),
      });
    }
    catch(e){
      console.log(e)
    }
   

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  const showAddTaskButtonToggle = () => {
    setShowAddTask(!showAddTask);
  };

  return (
    <Router>
    <div className="container">
      <Header
        showAddTask={showAddTask}
        showAddTaskButtonToggle={showAddTaskButtonToggle}
      />
      
       <Routes>
        <Route path="https://d7medev.github.io/task-traker/" element = {<>{showAddTask ? <AddTask onAdd={addTask} /> : ""}
      {tasks.length === 0 ? (
        "No Tasks To Show"
      ) : (
        <Tasks
          tasks={tasks}
          onDelete={deleteTask}
          toggleReminder={toggleReminder}
        />
        
      )}
      <Footer/>
      </>}/>
       <Route path="/https://d7medev.github.io/task-traker/about" element= {<About/>}/>
       </Routes>
       
      
      
      

    </div>

    </Router>
  );
}

export default App;
