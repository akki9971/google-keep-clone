export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST'

export const onLogInRequest = (data) => {
    return {
        type: LOG_IN_REQUEST,
        payload: data
    }
}

export const onLogOutRequest = (data) => {
    return {
        type: LOG_OUT_REQUEST,
        payload: data
    }
}