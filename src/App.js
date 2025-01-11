import React ,{Fragment}from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';  // Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Bootstrap JS with Popper.js included


//components
import InputTodo from './components/InputTodo';
import ListTodos from './components/ListTodos';
function App() {
  return (
    <Fragment>
       <div className='container'>
       <InputTodo/>
       <ListTodos/>
       </div>

      
    </Fragment>
  );
}

export default App;
