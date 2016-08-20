import * as types from '../constants/actionTypes';

export default function list(state = [], action) {
  switch (action.type) {
    case types.LIST_LOADED:
      return action.payload;
    default:
      return state;
  }
}