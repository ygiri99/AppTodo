import React, { useState, useEffect, useRef } from "react";
import PageElement from "../components/PageElement.jsx";
import { Input, InputGroup, Button } from "reactstrap";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../components/connection.js";

function Home() {
  const [todos, setTodos] = useState([]);
  const [inputTitle, setInputTitle] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState("");
  const inputEle = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  //Logic for Todos in current page
  const indexLastTodo = currentPage * itemsPerPage;
  const indexFirstTodo = indexLastTodo - itemsPerPage;
  const currentTodos = todos.slice(indexFirstTodo, indexLastTodo);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await getTodos();
        setTodos(response.data);
      } catch (error) {
        console.log(`fetch Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const addTodo = async () => {
    if (!inputValue.trim() && !inputTitle.trim())
      return alert("Please enter a todo and title");
    try {
      const response = await createTodo({
        title: inputTitle,
        description: inputValue,
      });
      setTodos([...todos, response.data]);
      setInputValue("");
      setInputTitle("");
      if (currentTodos.length === 5) setCurrentPage((prev) => prev + 1);
    } catch (error) {
      console.log(`Error adding todo: ${error.message}`);
    }
  };

  const handleStatus = async (id) => {
    const currentTodo = todos.find((todo) => todo._id === id);
    if (!currentTodo) return;

    const nextStatus = !currentTodo.status;

    try {
      const response = await updateTodo(id, { status: nextStatus });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, status: nextStatus } : todo,
        ),
      );
    } catch (error) {
      console.log(`Error updating todo status: ${error.message}`);
    }
  };

  const handleUpdate = async () => {
    if (!inputValue.trim() && !inputTitle.trim())
      return alert("Please enter a todo and title");

    try {
      const response = await updateTodo(editingId, {
        title: inputTitle,
        description: inputValue,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === editingId
            ? { ...todo, title: inputTitle, description: inputValue }
            : todo,
        ),
      );
      setInputTitle("");
      setInputValue("");
      setIsEditing(false);
      setEditingId("");
    } catch (error) {
      console.log(`Error updating todo: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this todo?",
    );
    if (!confirmDelete) return;
    try {
      const response = await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      todos.length > 4 && currentTodos.length === 1
        ? setCurrentPage((prev) => prev - 1)
        : null;
    } catch (error) {
      console.log(`Error deleting todo: ${error.message}`);
    }
  };

  // console.log(currentItems.length);
  const handleEdit = (id) => {
    const todoToUpdate = todos.find((todo) => todo._id === id);
    if (todoToUpdate) {
      setInputTitle(todoToUpdate.title);
      setInputValue(todoToUpdate.description);
      setEditingId(id);
      setIsEditing(true);
      setTimeout(() => {
        inputEle.current?.focus();
      }, 0);
    }
  };

  useEffect(() => {
    if (isEditing && inputEle.current) {
      inputEle.current.focus();
    }
  }, [isEditing]);

  return (
    <>
      <div className="container d-flex  align-items-center       flex-column mb-3 pt-5 vh-100">
        <div className="col-12 col-md-8 py-2">
          <InputGroup className="w-100">
            <Input
              placeholder={inputTitle || "Enter a new title..."}
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
              innerRef={inputEle}
            />
            <Input
              placeholder={inputValue || "Enter a new todo..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            {isEditing ? (
              <Button
                className="bg-warning"
                type="submit"
                onClick={handleUpdate}
              >
                Update
              </Button>
            ) : (
              <Button className="bg-success" type="submit" onClick={addTodo}>
                Add
              </Button>
            )}
          </InputGroup>
        </div>
        <div className="col-12 col-md-8 mt-2 h-50">
          <ul className="list-group w-100">
            {loading ? (
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : todos.length > 0 ? (
              currentTodos.map((todo) => (
                <li
                  className="list-group-item text-bg-secondary d-flex justify-content-between align-items-center mb-2"
                  key={todo._id}
                  id={todo._id}
                >
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={todo.status}
                      onChange={() => handleStatus(todo._id)}
                    />
                    <span className="fw-bold">{todo.title}</span>:
                    <p className="mb-0">{todo.description}</p>
                  </div>
                  {todo.status ? (
                    <span
                      className="badge bg-danger rounded-pill"
                      role="button"
                      onClick={() => {
                        handleDelete(todo._id);
                      }}
                    >
                      Delete
                    </span>
                  ) : (
                    <button
                      className="badge text-bg-warning bg-opacity-75 bg-gradient rounded-pill"
                      onClick={() => {
                        handleEdit(todo._id);
                      }}
                      disabled={isEditing}
                    >
                      Update
                    </button>
                  )}
                </li>
              ))
            ) : (
              <div className="col-12 col-md-8 col-lg-6 mt-2">
                <p className="text-center fw-bold text-muted">
                  Enter todos to get started.
                </p>
              </div>
            )}
          </ul>
        </div>
        {todos.length > 0 ? (
          <PageElement
            currentPage={currentPage}
            totalTodos={todos.length}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
          />
        ) : null}
      </div>
    </>
  );
}

export default Home;
