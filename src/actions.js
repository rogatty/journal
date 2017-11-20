import * as types from "./constants/ActionTypes";

export const addEntry = text => ({ type: types.ADD_ENTRY, text });
export const deleteEntry = id => ({ type: types.DELETE_ENTRY, id });
export const editEntry = (id, text) => ({ type: types.EDIT_ENTRY, id, text });
