import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pg from "pg";



const port=4000;
const app=express();
app.use(cors());
app.use(express.json());



const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "todolist",
    password: "muk123",
    port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

//CREATING TODO
app.post("/todos",async (req,res)=>{
    try{
      const {description}=req.body;
      const newTodo= await db.query("INSERT INTO todo(description) VALUES($1) RETURNING *",[description]);
      res.json(newTodo.rows[0]);
    }  
    catch(err){
      console.error(err.message);
    }
  })

//GET ALL TODOS
app.get("/todos",async(req,res)=>{
  try{
    const allTodos=await db.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch(err){
    console.error(err.message)
  }
})
// get a todo
app.get("/todos/:id",async(req,res)=>{
  try{
    const {id}=req.params;
    const todo =await db.query("SELECT * FROM todo WHERE todo_id =$1",[id]);
    res.json(todo.rows[0]);
    
  } catch (err){
    console.error(err.message);
  }
})
//update a todo
app.put("/todos/:id",async (req,res)=>{
  try{
    const {id}=req.params;
    const {description}=req.body;
    const updateTodo=await db.query("UPDATE todo SET description =$1 WHERE todo_id =$2",[description,id]);
    res.json("todo was updated");
                                                              
  }catch(err){
    console.error(err.message)
  }
})
//delete a todo

app.delete("/todos/:id",async (req,res)=>{
  try{
     const {id}=req.params;
     const deleteTodo= await  db.query("DELETE FROM todo WHERE todo_id=$1",[id]);
     res.json("todo was deleted");
  }catch(error){
    console.error(error.message);
  }
})

app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
})