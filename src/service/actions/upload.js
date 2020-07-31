import { UPLOAD_FILE} from '../types';

export const uploadFile = (file) => dispatch => {
    dispatch({
        type: UPLOAD_FILE,
        payload: file
    })
}