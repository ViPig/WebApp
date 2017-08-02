export const SHOW_PROCESS_MODAL = 'SHOW_PROCESS_MODAL';
export const HIDE_PROCESS_MODAL = 'HIDE_PROCESS_MODAL';
export const UPLOAD_PROCESS_MODAL = 'UPLOAD_PROCESS_MODAL';

export function showProcessModal(status, file, text) {
  return {
    type: SHOW_PROCESS_MODAL,
    status,
    file,
    text,
  };
}

export function hideProcessModal() {
  return {
    type: HIDE_PROCESS_MODAL,
  };
}

export function uploadProcessModal(status, text, hashing) {
  return {
    type: UPLOAD_PROCESS_MODAL,
    status,
    hashing,
    text,
  };
}
