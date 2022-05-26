import {  FETCH_ALL_NOTES, REMOVE_ALL_NOTES } from "../actions/NotesAction"
const initialState = {
    allNotes:[]
}

export const NotesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_NOTES:
            return {
                ...state,
                allNotes:action.payload
            }
        case REMOVE_ALL_NOTES:
            return {
                ...state,
                allNotes:action.payload
            }
        default:
            return state
    }
}
