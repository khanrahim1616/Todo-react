import React, { useState, useEffect } from 'react'
import "./App.css"
import IconButton from "@mui/material/IconButton";
// import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

const inLocalStorage = () => {
  let inLocal = localStorage.getItem("list");
  if (inLocal) { return JSON.parse(localStorage.getItem("list")); }
  else { return []; }
};

const App = () => {
  const [inputList, setInput] = useState()
  const [items, setItems] = useState(inLocalStorage())
  const [index, setIndex] = useState()
  const [toggleButton, setTogglebutton] = useState(true)
  const [deleteButton, setDeletebutton] = useState(false)

  const addingData = (event) => {
    setItems((items) => {
      return [...items, inputList]
    })
    event.preventDefault();
    setInput("")
  }

  const deleteItems = (id) => {
    setItems((items) => items.filter((elem, index) => {
      return index !== id
    })
    )
    setInput("")
    setTogglebutton(true)

  }
  const removeAll = () => {
    setItems([])
    setInput("")
    setTogglebutton(true)
    setDeletebutton(false)


  }
  const editItems = (text, id) => {
    setInput(text)
    setTogglebutton(false)
    setIndex(id)
    setDeletebutton(true)
  }
  const updateItems = (event) => {
    setTogglebutton(true)
    event.preventDefault();
    let arr = [...items]
    arr[index] = inputList
    setItems(arr)
    setInput("")
    setDeletebutton(false)

  }
  useEffect(() => { localStorage.setItem("list", JSON.stringify(items)); }, [items]);

  const cancel = () => {
    setTogglebutton(true)
    setInput("")
        setDeletebutton(false)

  }
  return (
    <div className='mainDiv'>
      <form className='childDiv1' onSubmit={toggleButton ? addingData : updateItems} >
        <h1>TODO--"List App"</h1>
        <input type="text" placeholder='Add Details you want to save' value={inputList}
          maxLength={60} onChange={(e) => setInput(e.target.value)} />

        {
          <div className='flex'>
            {toggleButton ? <button disabled={!inputList?.trim()}>Add</button> :
              <div>
                <button disabled={!inputList?.trim()}>
                  UpDate
                </button>
                <button onClick={cancel}>
                  Cancel
                </button>

              </div>}
          </div>
        }
      </form>
      <ul className='childDiv2'>
        {
          items.map((elem, index) => {
            return (

              <div className='todolist'>
                <li>
                <div>
                 {elem}
                 </div>
                  <div className='buttons'>
                    <IconButton onClick={() => deleteItems(index)} disabled={deleteButton}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => editItems(elem, index)}>
                      <DriveFileRenameOutlineIcon />
                    </IconButton>
                  </div>
                </li>
              </div>
            )
          })}
      </ul>
      <div className='flex'>
        {items.length > 0 && <button className='flex' onClick={removeAll}> Remove all </button>
        }
      </div>
    </div>
  )
}

export default App
