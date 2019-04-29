import React, { Component } from "react";

class TaskView extends Component {
  constructor(props) {
    super(props);
    this.createTasks = this.createTasks.bind(this);
  }
  createTasks(task) {
    let status = "";
    if (task.completed!==null) {
      let diff = task.completed - task.key;
      
      status = <div className="task-card__status-text task-card__status">Task completed in <br/><TimePassed diff={diff}/></div>;
    } else {
      status = <button className="btn btn-sm task-card__complete task-card__status"
      onClick={()=>{
        this.markComplete(task.key);
        }}
      >I did this!</button>;
    }
    return (
      <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={task.key}>
        <div className="task-card" style={{backgroundColor: task.color}}>
          {task.message}
          {status}
          <i
            className="fas fa-trash-alt task-card__delete"
            onClick={() => {
              this.delete(task.key);
            }}
          />
        </div>
      </div>
    );
  }
  delete(key) {
    this.props.delete(key);
  }
  markComplete(key){
    this.props.complete(key);
  }
  render() {
    let todoEntries = this.props.tasks;
    let listItems = todoEntries.map(this.createTasks);

    return <div className="row main">{listItems}</div>;
  }
}

function TimePassed(props){
  const{diff} = props;
  let timeString = "";
  let timeDiff = diff;
  const days = Math.floor(timeDiff / 86400000);
  timeDiff -= days * 86400;
  const hours = Math.floor(timeDiff / 3600000) % 24;
  timeDiff -= hours * 3600;
  const minutes = Math.floor(timeDiff / 60000) % 60;
  timeDiff -= minutes * 60;
  const seconds = Math.floor(timeDiff / 1000) % 60;
  if(days){timeString+=days + " days, "}
  if(hours){timeString+=hours + " hours, "}  
  if(minutes){timeString+=minutes + " minutes and "}  
  timeString+=seconds + " seconds";
  return timeString;
}

export default TaskView;