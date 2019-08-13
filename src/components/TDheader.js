import React from 'react';

function TDheader(props) {

  return (
    <div className="todo-list">
      <h1>MY TODO LIST ON REACT</h1>
      <input
        ref = {props.inputAddRef}
        className="add-input" 
        type="text"                      
        name="tempAdd" 
        placeholder="What do you want to do?" 
      />
      <button 
        className="add-btn" 
        onClick={props.addItem}
      >
        Add new item
      </button>
    </div>
  )
}

export default TDheader