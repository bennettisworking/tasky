import React, { Component } from "react";
import Cookies from "universal-cookie";
import TaskView from "./TaskView";
import "./App.scss";

const cookies = new Cookies();
const savedList = cookies.get("taskList") || [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: savedList
    };
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markComplete = this.markComplete.bind(this);
    console.log(savedList);
  }
  addItem(e) {
    if (this._inputElement.value !== "") {
      const r = Math.round(Math.random() * 4);
      const colorArray = [
        "#add5ae",
        "#f1e9b0",
        "#7ccae3",
        "#ddadd1",
        "#f5a1ad"
      ];
      const newTask = {
        message: this._inputElement.value,
        color: colorArray[r],
        completed: null,
        key: Date.now()
      };

      this.setState(prevState => {
        const list = prevState.taskList.concat(newTask);
        cookies.set("taskList", list);
        return {
          taskList: list
        };
      });
      const cookieList = savedList.concat(newTask);
      this._inputElement.value = "";
    }
  }
  removeItem(a) {
    let templist = this.state.taskList.filter(item => item.key !== a);
    //console.log(templist);
    cookies.set("taskList", templist);
    this.setState({
      taskList: templist
    });
  }
  markComplete(a) {
    const templist = [...this.state.taskList];
    const ind = this.state.taskList.findIndex(item => item.key === a);
    templist[ind].completed = Date.now();
    //console.log(templist);
    cookies.set("taskList", templist);
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
            <button className="header__button btn" onClick={this.addItem}>
              Add
            </button>
          </div>
        </header>
        <section className="main">
          <TaskView
            tasks={this.state.taskList}
            delete={this.removeItem}
            complete={this.markComplete}
          />
        </section>
      </div>
    );
  }
}

export default App;