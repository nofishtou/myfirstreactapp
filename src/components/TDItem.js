import React from 'react';

function TDItem(props) {

  let textContent
  
  if(props.item.isEdit && !props.item.completed) {
    textContent = (
      <span>
          <input 
            ref = {props.inputEditRef}
            type="text" 
            name = "tempEdit" 
            value={props.tempEdit ? props.tempEdit : props.item.text }  
            onChange={(event) => {props.changeEdit(event)} 
          }
        />
        <button 
            className="save-icon" 
            onClick={() => {props.saveItem(props.item.id)}}
            >&#10004;
        </button>
      </span>
    )
  } else {
    textContent = (<span 
                    className={props.item.completed ? "completed" : "text-content"} 
                    onClick={props.item.completed ? null : () => {props.toEdit(props.item.id)}}
                  >
                    {props.item.text}
                  </span>)
  }


  return (
    <div className="todo-item">
      <input 
        type="checkbox" 
        name="" id="" 
        checked={props.item.completed} 
        onChange={() => {props.checkChkBox(props.item.id)}} 
        disabled = {props.item.completed || props.item.isEdit ? true : false} 
      />
      {textContent}
      <button 
        className="delete-icon" 
        onClick={() => {props.deleteItem(props.item.id)}}
      >
        &#10006;
      </button>
    </div>
  )
}

export default TDItem