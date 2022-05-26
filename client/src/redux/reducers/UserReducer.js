import { LOG_IN_REQUEST, LOG_OUT_REQUEST } from "../actions/UserAuthAction";

const UserState = null

export const UserReducer = (state=UserState, {type,payload}) =>{
    switch (type) {
        case LOG_IN_REQUEST:
            return {
                state:payload
            }
    
        case LOG_OUT_REQUEST:
            return {
                state:null
            }
    
        default:
            return state
    }
}