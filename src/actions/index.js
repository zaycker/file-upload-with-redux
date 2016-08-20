import * as constants from '../constants/constants';
import * as types from '../constants/actionTypes';

function listLoaded(list) {
  return {
    type: types.LIST_LOADED,
    payload: list
  };
}

export const loadList = () => (dispatch) => {
  try {
    const list = JSON.parse(window.localStorage.getItem(constants.LIST_LOCALSTORAGE_KEY));
    dispatch(listLoaded(list || []));
  } catch (e) {
    dispatch(changeMessage(e.message));
  }
};

export const upload = (e) => async (dispatch, getState) => {
  e.preventDefault();
  const fileName = getState().filename;
  const form = e.target;

  dispatch(progressChange(1));

  try {
    const response = await window.fetch(constants.UPLOAD_URL, {
      method: 'post',
      body: new FormData(form)
    });

    const json = await response.json();

    if (!json || !json.success) {
      throw new Error('Unexpected server response');
    }

    dispatch(progressChange());
    dispatch(changeMessage(`File "${fileName}" was successfully uploaded`));
    form.reset();

    dispatch(fileSelected());

    dispatch(addToList({
      ...json,
      fileName
    }));
  } catch (e) {
    dispatch(progressChange());
    dispatch(changeMessage(e.message));
  }
};

const addToList = ({ fileName, key }) => (dispatch, getState) => {
  try {
    window.localStorage.setItem(constants.LIST_LOCALSTORAGE_KEY, JSON.stringify([
      ...getState().list,
      { fileName, key }
    ]));

    dispatch(loadList());
  } catch (e) {
    dispatch(changeMessage(e.message));
  }
};

export function fileSelected(filePath = '') {
  return {
    type: types.FILE_SELECTED,
    payload: filePath.split(/\\|\//).pop() || ''
  };
}

export function progressChange(payload = 0) {
  return {
    type: types.PROGRESS_CHANGE,
    payload
  };
}

export function changeMessage(payload = '') {
  return {
    type: types.MESSAGE_CHANGED,
    payload
  }
}
