import React, { Component } from "react";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: []
    };
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markComplete = this.markComplete.bind(this);
  }
  addItem(e) {
    if (this._inputElement.value !== "") {
      let r = Math.round(Math.random()*4);
      let colorArray = ['#add5ae', '#f1e9b0', '#7ccae3', '#ddadd1', '#f5a1ad'];
      let newTask = {
        message: this._inputElement.value,
        color: colorArray[r],
        completed: null,
        key: Date.now()
      };

      this.setState(
        prevState => {
          return {
            taskList: prevState.taskList.concat(newTask)
          };
        }
      );
      this._inputElement.value = "";
    }
  }
  removeItem(a) {
    let templist = this.state.taskList.filter(item  => item.key !== a);
    //console.log(templist);
    this.setState({
      taskList: templist
    });
  }
  markComplete(a){
    let templist = [...this.state.taskList];
    let ind = this.state.taskList.findIndex(item => item.key === a);
    templist[ind].completed = Date.now();
    //console.log(templist);
    this.setState({
      taskList: templist
    });
  }

  render() {
    return (
      <div className="app">
        <header className="header row mr-0 ml-0">
          <div className="col-lg-3">
            <div className="header__title">
              <i className="fas fa-clipboard-check" /> TASKY
            </div>
          </div>
          <div className="col-lg-6 text-center">
            <input
              className="header__input text-input"
              ref={a => (this._inputElement = a)}
              placeholder="Enter a new task"
            />
            <Button className="header__button btn" onClick={this.addItem}>
              Add
            </Button>
          </div>
        </header>
        <section className="main">
          <TodoItems tasks={this.state.taskList} delete={this.removeItem} complete={this.markComplete}/>
        </section>
      </div>
    );
  }
}

class TodoItems extends Component {
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
      status = <Button className="btn btn-sm task-card__complete task-card__status"
      onClick={()=>{
        this.markComplete(task.key);
        }}
      >I did this!</Button>;
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

function Button(props) {
  const { className, children, onClick } = props;
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default App;
