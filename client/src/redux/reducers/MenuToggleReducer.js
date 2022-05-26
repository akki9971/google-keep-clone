import {MENU_TOGGLE, SHOW_MENU, HIDE_MENU} from '../actions/MenuAction.js'

const initialState = {
    ToggleMenu:true
}

export const MenuToggleReducer = (state=initialState, action) => {
    switch(action.type){
        case MENU_TOGGLE:
            return {
                ...state, ToggleMenu: !state.ToggleMenu
            }
        case SHOW_MENU:
            return {
                ...state, ToggleMenu: action.payload
            }
        case HIDE_MENU:
            return {
                ...state, ToggleMenu: action.payload
            }
        default:
            return state
    }
}
