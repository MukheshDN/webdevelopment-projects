import React, { Fragment, useState } from "react";

const EditTodo = ({ todo }) => {
    const [description,setDescription]=useState(todo.description);
    const [isOpen, setIsOpen] = useState(false);
    //update description
     const updateDescription=async(e)=>{
        e.preventDefault();
        try {
           const body={description};
           const response=await fetch(`http://localhost:4000/todos/${todo.todo_id}`,{
            method:"PUT",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(body)
           }) 
           window.location="/"
        } catch (err) {
            console.error(err.message) 
        }
     }

    // Functions to open and close the modal
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
     
    return (
        <Fragment>
            {/* Button to open modal */}
            <button type="button" className="btn btn-warning" onClick={openModal}>
                Edit
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="modal" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Edit Todo</h4>
                                <button type="button" className="close" onClick={()=>{setDescription(todo.description); closeModal();}}>
                                    &times;
                                </button>
                            </div>
                            <div className="modal-body">
                                <input type="text" className="form-control" value={description} onChange={e=>setDescription(e.target.value)}/>
                                {/* You can add inputs or editing functionality here */}
                            </div>
                            <div className="modal-footer">
                            <button type="button" className="btn btn-warning" onClick={e=>updateDescription(e) }>
                                    edit
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={()=>{setDescription(todo.description); closeModal();}}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default EditTodo;
