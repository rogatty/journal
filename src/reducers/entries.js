import { ADD_ENTRY, DELETE_ENTRY, EDIT_ENTRY } from "../constants/ActionTypes";

export default function entries(state = [], action) {
  switch (action.type) {
    case ADD_ENTRY:
      return [
        ...state,
        {
          id: state.reduce((maxId, entry) => Math.max(entry.id, maxId), -1) + 1,
          completed: false,
          text: action.text
        }
      ];

    case DELETE_ENTRY:
      return state.filter(entry => entry.id !== action.id);

    case EDIT_ENTRY:
      return state.map(
        entry =>
          entry.id === action.id ? { ...entry, text: action.text } : entry
      );

    default:
      return state;
  }
}
