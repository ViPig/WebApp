import { SHOW_PROCESS_MODAL, HIDE_PROCESS_MODAL, UPLOAD_PROCESS_MODAL } from '../actions/showProcessingModal';

const initialState = {
  processStatus: false,
  file: '',
  text: '',
  hashing: false,
  uploading: false,
};

function processModal(state = initialState, action) {
  switch (action.type) {
    case SHOW_PROCESS_MODAL:
      return Object.assign({}, state, {
        processStatus: action.status,
        file: action.file,
        text: action.text,
        hashing: action.status,
      });
    case HIDE_PROCESS_MODAL:
      return initialState;
    case UPLOAD_PROCESS_MODAL:
      return Object.assign({}, state, {
        uploading: action.status,
        text: action.text,
        hashing: action.hashing,
      });
    default:
      return state;
  }
}

export default processModal;
