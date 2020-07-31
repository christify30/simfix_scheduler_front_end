import { UPLOAD_FILE} from '../types';

const initialState = {
    file: null
};

export default function(state = initialState, action){
    switch(action.type){
        case UPLOAD_FILE :
            return {
                ...state,
                file: action.payload
            }
        default :
            return {
                ...state
            }
    }
}