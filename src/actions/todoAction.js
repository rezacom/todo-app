import {
    TODO_LIST,
    ADD_TODO,
    EDIT_TODO,
    ADD_BELOW_TODO,
    EDIT_BELOW_TODO,
    DELETE_TODO
} from "../constants/action-types";

export const todoList = (todos) => ({
    type: TODO_LIST,
    payload: {
        todos
    }
})

export const addTodo = (title, id, parentId) => ({
    type: ADD_TODO,
    payload: {
        title,
        id,
        parentId
    }
})

export const editTodo = (title, id, parentId) => ({
    type: EDIT_TODO,
    payload: {
        title,
        id,
        parentId
    }
})

export const addBelowTodo = (id, parentId) => ({
    type: ADD_BELOW_TODO,
    payload: {
        id,
        parentId
    }
})

export const deleteTodo = (id, parentId) => ({
    type: DELETE_TODO,
    payload: {
        id,
        parentId
    }
})

export const editBelowTodo = (title, id, parentId) => ({
    type: EDIT_BELOW_TODO,
    payload: {
        title,
        id,
        parentId
    }
})