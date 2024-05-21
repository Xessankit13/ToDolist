import { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import { v4 as uuidv4 } from "uuid";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [showFinsihed, setshowFinsihed] = useState(true)

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      settodos(todos);
    }
  }, []);

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    settodo("");
    saveToLS();
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((item) => item.id === id);
    //console.log(t);
    settodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    settodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    settodos(newTodos);
    saveToLS();
  };

  const handleChange = (e) => {
    settodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    //console.log(`The id is ${id}`);
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    //console.log(`The index is ${index}`);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos);
    //console.log(newTodos);
    saveToLS();
  };

  const handleToggleFinsihed =()=>{
    setshowFinsihed(!showFinsihed)
  }

  return (
    <>
      <Navbar />
      <div className="my-4 w-11/12 mx-auto min-h-[80vh] rounded-xl bg-blue-200 py-2">
        <div className="main mx-4">
          <div className="Addtodo ">
            <h2 className="text-xl font-bold">Add a Task</h2>
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-1/2 rounded-md mt-3"
            />
            <button
              onClick={handleAdd} disabled ={todo.length <=3}
              className="mx-4 rounded-md bg-blue-500 px-2 py-1 disabled:bg-blue-800  text-sm font-bold text-white hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          <div className="flex gap-2 mb-4">
          <input  onChange={handleToggleFinsihed} type="checkbox" checked={showFinsihed} />
          <h2>Show Finished</h2></div>
          <h2 className="text-lg font-bold">Your Tasks</h2>
          <div className="Todos">
            {todos.length === 0 && <div className="italic">No Task to display</div>}

            {todos.map((item) => {
              return (showFinsihed || !item.isCompleted)&&(
                <div
                  key={item.id}
                  className="todo flex w-60 justify-between my-2"
                >
                  <div className="flex gap-5">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className=" mx-1 rounded-md bg-blue-500 px-2 py-1 text-sm font-bold text-white hover:bg-blue-700"
                    >
                      {" "}
                      <AiFillEdit />

                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="mx-1 rounded-md bg-blue-500 px-2 py-1 text-sm font-bold text-white hover:bg-blue-700"
                    >
                      {" "}
                      <MdDelete />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
