import { combineReducers } from "redux";
import { MenuToggleReducer } from './MenuToggleReducer'
import { NotesReducer } from './notesReducer'
import { UserReducer } from './UserReducer'

export const rootReducer = combineReducers({
    MenuToggleReducer,
    NotesReducer,
    UserReducer
})