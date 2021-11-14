import React, { useState, useEffect } from 'react'


const getLocalData = () =>{
    const lists = localStorage.getItem("todoList");
    if(lists){
        return JSON.parse(lists);
    }else{
        return [];
    }
}
const Todo = () => {
    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    //Add the Items function
    const addItem = () => {
        if(!inputData){
            alert("Please input items")
        }else if(inputData && toggleButton){
            setItems(
                items.map((curElem) => {
                    if(curElem.id === isEditItem){
                    return {...curElem, name: inputData};
                }
                return curElem;
                })
            );
            setInputData("");
            setIsEditItem(null);
            setToggleButton(false);

        }else{
            const newInputData = {
                id: new Date().getTime().toString(),
                name: inputData,
            }
            setItems([...items, newInputData]);
            setInputData("");

        }
    };
    //How to edit items
    const editItem = (index) =>{
        const item_todo_edited = items.find((curElem) =>{
            return curElem.id === index;
        });
        setInputData(item_todo_edited.name);
        setIsEditItem(index);
        setToggleButton(true);

    };
    //How to delete the items
    const deleteItem = (index) => {
        const updatedItem = items.filter((curElem) => {
            return curElem.id !== index;
        })
        setItems(updatedItem);
    }
    //remove all Element
    const removeAll = () =>{
        setItems([]);
    }
    //how to add data on local storage
    useEffect(() => {
        localStorage.setItem("todoList", JSON.stringify(items));
        
    }, [items])
    return (
        <>  
           <div className="main">
            <h3>React Todo App</h3>
           </div>
            <div className="main-div">
                
                <div className="child-div">
                    <figure>
                        <img src="./todo.png" alt="todologo" />
                        <figcaption>Add Your Items Here</figcaption>
                    
                    </figure>

                <div className="addItems">
                    <input 
                    type="text"
                    placeholder="✍ Add Item"
                    className="form-control"
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                    
                    />
                    {toggleButton ? ( <i className="fa fa-edit add-btn" onClick={addItem}></i>
                     ) : ( <i className="fa fa-plus add-btn" onClick={addItem}></i>
                    )}
                   
                
                </div>

                {/* show all items  */}
                    <div className="showItem">
                        {items.map((curElem) => {
                            return (
                                <div className="eachItem" key={curElem.id}>
                                <h3>{curElem.name}</h3>
                                <div className="todo-btn">
                                 <i className="far fa-edit add-btn" onClick={ () =>  editItem(curElem.id)}></i>      
                                 <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(curElem.id)}></i>      
                                </div>
                                 
                            </div>


                            );
                        })}
                    </div>
                {/* remove all items */}
                <div className="showItems">
                    <button className="btn effect04" data-sm-link-text= "Remove All" 
                    onClick={removeAll}>
                        <span>CheckList</span>
                    </button>

                </div>
                </div>
            </div>   
        </>
    )
}

export default Todo
