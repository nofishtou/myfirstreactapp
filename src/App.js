import React, {Component} from 'react';
import TDItem from './components/TDItem';
import TDheader from './components/TDheader';
import TDarr from './components/TDarr';
import './App.css';

class App extends Component {
  state = {
    todos: TDarr
  }
  
  inputAddRef = React.createRef()
  inputEditRef = React.createRef()

  changeLocalStorage = (data) => localStorage.setItem('TODO', JSON.stringify(data))

  componentDidMount() {
    if(localStorage.length !== 0){
      const todos = JSON.parse(localStorage.getItem( "TODO"))
      this.setState({todos})  
    }
  }

  checkChkBox = (id) => {
    const updTodos = this.state.todos.map( item => {
      if(item.id === id) {
        item = {...item, completed: true } 
      }
      return item
    })

    this.setState({todos: updTodos})
    this.changeLocalStorage(updTodos)
  }

  toEdit = (id) => {
    const updTodos = this.state.todos.map( item => {
      if(item.id === id) {
        item = {...item, isEdit: true } 
      }
      return item
    })
    
    this.setState({todos: updTodos})
  }

  changeAdd = (event) => {
    const {name, value} = event.target
    
    this.setState({ [name]: value})
  }

  changeEdit = (event) => {
    const {name, value} = event.target
    
    this.setState({[name]: value})
  }

  addItem = () => {
    const newItem = {
      id: 0 ,
      text: "",
      completed: false,
      isEdit: false
    }
 
    // give uniq id
    this.state.todos.forEach(item => {
      if (item.id > newItem.id) {
        newItem.id = item.id
      }
      return ++newItem.id
    })

    newItem.text = this.inputAddRef.current.value

    const updTodos =  [...this.state.todos, newItem]

    this.setState({
      todos: updTodos,
    })
    this.inputAddRef.current.value = ""
    this.changeLocalStorage(updTodos)
  }

  saveItem = (id) => {
    const updTodos = this.state.todos.map( item => {
   
      if (item.id === id) {
        if(this.state.tempEdit !== "") {
          item = {...item, text: this.inputEditRef.current.value, isEdit: false } 
        } else {
          item = {...item, isEdit: false } 
        }          
      }
    
      return item
    })

    this.setState({
        todos: updTodos
    })
    
    this.changeLocalStorage(updTodos)
  }

  deleteItem = (id) => {
    const todos = this.state.todos;
    const updTodos = todos.filter(item => item.id !== id )
    
    this.setState({todos: updTodos})
    this.changeLocalStorage(updTodos)
  }

  render() {
    const toDoItems = this.state.todos.map( (item) => {
        return <TDItem 
                  key = {item.id} 
                  item = {item} 
                  checkChkBox = {this.checkChkBox} 
                  deleteItem = {this.deleteItem}
                  toEdit = {this.toEdit}  
                  changeEdit = {this.changeEdit} 
                  tempEdit={this.state.tempEdit} 
                  saveItem = {this.saveItem}
                  inputEditRef = {this.inputEditRef}
                  />
      }
    )
    
    return (
      <div>
        <TDheader 
          tempAdd = {this.state.tempAdd}  
          changeAdd = {this.changeAdd} 
          addItem = {this.addItem} 
          inputAddRef={this.inputAddRef}/>
        <div className="todo-list">
          {toDoItems}
        </div>
      </div>
    )
  }
}

export default App;
