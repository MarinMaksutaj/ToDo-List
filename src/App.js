import Header from './components/Header';
import Tasks from './components/Tasks';
import {useState} from 'react';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';
import {BrowserRouter as Router, Route} from 'react-router-dom';
function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([
    {
      "id": 1,
      "text": "Demo Task 1",
      "day": "May 29th at 9:30pm",
      "reminder": true
    },
    {
      "id": 2,
      "text": "Demo Task 2",
      "day": "Jun 4th at 1:30pm",
      "reminder": true
    }
  ]);

  // addTask

  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = {id, ...task}
    setTasks([...tasks, newTask])
    console.log(task);
  }

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task ))
    console.log(tasks);
  }

  return (
    <Router>
    <div className="container">
      <Header title="Todo List" onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      
    <Route path='/' exact render={() => (
      <>
        {showAddTask ? (<AddTask onAdd={addTask}/>) : ("")}
      {tasks.length > 0 ? 
      (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
        ) : (
          "No ToDo's at the moment"
          )}
      </>
    )} />
    <Route path='/about' component={About} />
    <Footer />
    </div>
    </Router>
  );
}

export default App;
