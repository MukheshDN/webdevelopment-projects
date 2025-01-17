import React ,{Fragment,useState}from "react";

const  InputTodo =()=>{
    const [description,setDescription]=useState("")
    const onSubmitForm=async (e) =>{
        e.preventDefault();
        try{
            console.log(description);
            const body={description};
            const response= await fetch("http://localhost:4000/todos",{
               method:"POST",
               headers:{"content-type":"application/json"} ,
               body:JSON.stringify(body)
            })
            
            window.location ="/";
        }catch(err){
            console.error(err.message);
        }
    }
    return (
        <Fragment>
        <h1 className="text-center mt-5"> Todo list</h1>
        <form className="d-flex mt-5" onSubmit={onSubmitForm}>
           <input type="text" className="form-control" value={description} 
           onChange={e=>setDescription(e.target.value)}/>
           <button className="btn btn-success">add</button> 
        </form>
        </Fragment>
    )
}

export default InputTodo;