import {
    TODO_LIST,
    ADD_TODO,
    EDIT_TODO,
    ADD_BELOW_TODO,
    DELETE_TODO
} from "../constants/action-types";

const initialState = []

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case TODO_LIST:
            return [...payload.todos]

        case ADD_TODO:
            return [...state, { title: payload.title, id: payload.id, parentId: payload.parentId, children: [] }]

        // case ADD_BELOW_TODO:
        //     return state.map(item => (
        //         item.id === payload.parentId ? {
        //             title: item.title,
        //             id: item.id,
        //             parentId: item.parentId,
        //             children: item.children,
        //             children: [...item.children, { title: "", id: payload.id, parentId: payload.parentId, children: [] }]
        //         } : item
        //     ))

        case EDIT_TODO:
            if (payload.parentId === 0) {

                return state.map(item => (
                    item.id === payload.id ? {
                        title: payload.title,
                        id: item.id,
                        parentId: item.parentId,
                        children: item.children
                    } : item
                ))
            } else {
                return state.map(item => (
                    item.id === payload.parentId ? {
                        title: item.title,
                        id: item.id,
                        parentId: item.parentId,
                        children: [
                            ...item.children.map(item2 => (
                                item2.id === payload.id ? {
                                    title: payload.title,
                                    id: item2.id,
                                    parentId: item2.parentId,
                                    children: item2.children
                                } : item2
                            ))
                        ]
                    } : item
                ))
            }

        // delete todo
        case DELETE_TODO:
            if (payload.parentId === 0) {
                return state.filter(item => item.id !== payload.id)
            } else {
                return state.map(item => (
                    item.id === payload.parentId ? {
                        title: item.title,
                        id: item.id,
                        parentId: item.parentId,
                        children: [
                            ...item.children.filter(item2 => item2.id !== payload.id)
                        ]
                    } : item
                ))
            }

        case ADD_BELOW_TODO:

            return state.map(item => (
                item.id === payload.parentId ? {
                    title: item.title,
                    id: item.id,
                    parentId: item.parentId,
                    children: [...item.children, { title: "", id: payload.id, parentId: payload.parentId, children: [] }]
                } : item
            ))

        // case EDIT_BELOW_TODO:

        //     return state.map(item => (
        //         item.id === payload.parentId ? {
        //             title: item.title,
        //             id: item.id,
        //             parentId: item.parentId,
        //             children: [
        //                 item.children.map(item2 => (
        //                     item2.id === payload.id ? {
        //                         title: payload.title,
        //                         id: item2.id,
        //                         parentId: item2.parentId,
        //                         children: item2.children
        //                     } : item2
        //                 ))
        //             ]
        //         } : item
        //     ))

        default:
            return state
    }
}
