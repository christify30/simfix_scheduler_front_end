import { SEND_REPORT_SUCCESS, SEND_REPORT_FAILED, SET_TIME_ZONE, GET_REPORT } from '../types';

const initialState = {
    data:null,
    error:false,
    errors: null,
    report: [],
    loading: false,
    zone : Intl.DateTimeFormat().resolvedOptions().timeZone
};

export default function(state = initialState, action) {
    switch(action.type) {
        case SEND_REPORT_SUCCESS :
            return {
                ...state,
                error: false,
                loading :true,
                data: action.payload
            }
        case SEND_REPORT_FAILED :
            return {
                ...state,
                error: true,
                loading: true,
                errors: action.payload
            }
        case SET_TIME_ZONE :
            return {
                ...state,
                zone: action.payload
            }
        case GET_REPORT : 
            return {
                ...state,
                report: action.payload,
                error: false
            }
        default :
            return {
                ...state
            }
    }
}