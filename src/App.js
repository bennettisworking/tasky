import React, { Component } from "react";
import "./App.scss";
//import card_bg from './card_bg.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: []
    };
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }
  addItem(e) {
    if (this._inputElement.value !== "") {
      let r = Math.round(Math.random()*4);
      let colorArray = ['#add5ae', '#f1e9b0', '#7ccae3', '#ddadd1', '#f5a1ad'];
      let newTask = {
        message: this._inputElement.value,
        color: colorArray[r],
        key: Date.now()
      };

      this.setState(
        prevState => {
          return {
            taskList: prevState.taskList.concat(newTask)
          };
        },
        () => {
          console.log(this.state.taskList);
        }
      );
      this._inputElement.value = "";
    }
  }
  removeItem(a) {
    console.log("meowww");
    console.log(a);
    console.log(this.state);
    let templist = this.state.taskList.filter((item, index) => {
      return item.key !== a;
    });
    console.log(templist);
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
          <TodoItems tasks={this.state.taskList} delete={this.removeItem} />
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
    return (
      <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={task.key}>
        <div className="task-card" style={{backgroundColor: task.color}}>
          {task.message}
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
  render() {
    let todoEntries = this.props.tasks;
    let listItems = todoEntries.map(this.createTasks);

    return <div className="row main">{listItems}</div>;
  }
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
