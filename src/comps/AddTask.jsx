
import  {useState}  from "react";

const AddTask = ({onAdd}) => {
      
     const [text,setText] = useState("");
     const [day,setDay] = useState("");
     const [reminder,setReminder] = useState(false);
     
     const onSubmit = e => {
        
        e.preventDefault();
     

        if(!text){
            alert("Enter Somthing!")
        }

        else{

            onAdd({text,day,reminder})
            setText('');
            setDay('');
            setReminder(false);
        }
     }

  return (
    <form className="add-form" onSubmit={onSubmit}>

        <div className="form-control">
            <label>Task</label>
            <input type="text" placeholder="Add a task" value={text} onChange={e => {console.log(text); setText(e.target.value)}} />
        </div>
        <div className="form-control">
            <label>Day & Time</label>
            <input type="text" placeholder="Add day & time"  value={day} onChange={e => setDay( e.target.value)}/>
        </div>
        <div className="form-control form-control-check">
            <label>Reminder</label>
            <input type="checkbox" checked={reminder}  onChange={e => {setReminder(e.currentTarget.checked) ;console.log(reminder);} } />
        </div>
        <input type="submit" className="btn btn-block" value="Save Task"/>

    </form>
  )
}

export default AddTask
