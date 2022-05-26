export const FETCH_ALL_NOTES = 'FETCH_ALL_NOTES';
export const REMOVE_NOTE = 'REMOVE_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';
export const REMOVE_ALL_NOTES = 'REMOVE_ALL_NOTES';
// export const ADD_NOTE = 'ADD_NOTE';


export const onFetchAllNotes = (data) => {
    return {
        type: FETCH_ALL_NOTES,
        payload: data
    }
}
export const onRemoveNote = (data) => {
    return {
        type: REMOVE_NOTE,
        payload: data
    }
}
export const onEditNote = () => {
    return {
        type: EDIT_NOTE,
        payload: null
    }
}
export const onRemoveAllNotes = () => {
    return {
        type: REMOVE_ALL_NOTES,
        payload: null
    }
}