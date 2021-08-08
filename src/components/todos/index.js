import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, todoList } from '../../actions/todoAction';
import Todo from '../todo';
import "./style.scss";
import { v4 as uuidv4 } from 'uuid';

export default function Todos() {

    const dispatch = useDispatch();
    const { todos } = useSelector((state) => state);

    useEffect(() => {
        handleSetLocalDataToState()
    }, [])

    useEffect(() => {
        setTimeout(() => {
            handleSetDataOnLocal()
        }, 1000);
    }, [todos])

    // load page set local data on redux state 
    const handleSetLocalDataToState = () => {
        const localData = JSON.parse(localStorage.getItem("todos"));

        // console.log(JSON.parse(localData));
        dispatch(todoList(localData))
    }

    // set data on localStorage 
    const handleSetDataOnLocal = () => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    // add todo
    // check inputs validation stop and focus item
    const handleAddTodo = () => {
        let flag = 0;
        [...document.querySelectorAll(".todo-app__todos input")].map(item => {
            if (!item.value) {
                item.classList.add("error")
                document.getElementById(item.id).focus()
                flag += 1
            }
            else item.classList.remove("error")
        })
        if (flag !== 0) return

        let id = uuidv4()
        dispatch(addTodo("", id, 0))
        setTimeout(() => {
            document.getElementById(id).focus()
        }, 200);
    }

    return (
        <>
            {
                todos.length ? (
                    <>
                        <ul>
                            {
                                todos.map(item => (
                                    <Todo {...item} key={item.id} />
                                ))
                            }
                        </ul>
                        <button onClick={handleAddTodo} className="add-btn">+</button>
                    </>
                ) : (
                    <div>
                        <button className="add-todo-btn" onClick={handleAddTodo}>add Todo</button>
                    </div>
                )
            }
        </>
    )
}
