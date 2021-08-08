import React from 'react'
import { useDispatch } from 'react-redux';
import { addBelowTodo, deleteTodo, editTodo } from '../../actions/todoAction';
import { v4 as uuidv4 } from 'uuid';

export default function Todo({ title, id, parentId, children }) {

    const dispatch = useDispatch();

    // edit todo on keyup set redux state
    const handleEditTodo = (e) => {
        dispatch(editTodo(e.target.value, id, parentId))
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

        let id_c = uuidv4()
        dispatch(addBelowTodo(id_c, id))

        setTimeout(() => {
            document.getElementById(id_c).focus()
        }, 200);
    }

    // add below todo keydown enter key
    // check inputs validation stop and focus item
    const handleKeyPress = (event) => {

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

        let x = event.which || event.keyCode;
        let id_c = uuidv4()
        if (x === 13)
            dispatch(addBelowTodo(id_c, id))
    }

    // handle delete item for keydown Ctrl + Shift + Delete
    const handleDelete = (event) => {
        if(event.shiftKey && event.ctrlKey && event.keyCode == 46) {
            dispatch(deleteTodo(id, parentId))
        }
    }

    return (
        <li>
            <input defaultValue={title} id={id} onChange={handleEditTodo} onKeyPress={handleKeyPress} onKeyDown={handleDelete}/>
            {
                children.length ? (
                    <>
                        <ul>
                            {
                                children.map(item => (
                                    <Todo {...item} key={item.id} />
                                ))
                            }
                        </ul>
                        <button onClick={handleAddTodo} className="add-btn">+</button>
                    </>
                ) : <></>
            }
        </li>
    )
}
