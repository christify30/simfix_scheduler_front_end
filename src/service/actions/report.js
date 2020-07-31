import axios from 'axios';
import { SEND_REPORT_SUCCESS, SEND_REPORT_FAILED, SET_TIME_ZONE, GET_REPORT } from '../types';

import BASE_URL from './BASE_URL';

export const ScheduleReporter =  data => async dispatch => {
    try {
        const response = await axios.post(`${BASE_URL}task/start`, data);
        dispatch({
            type: SEND_REPORT_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        if(error.response) {
            dispatch({
                type: SEND_REPORT_FAILED,
                payload: error.response.data.errors
            })
        }else{
            alert('network error')
        }
    }
}

export const GetReports = () => async dispatch => {
    try {
        const report = await axios.get(`${BASE_URL}task`);
        dispatch({
            type: GET_REPORT,
            payload: report.data
        })
    } catch (error) {
        alert('network error')
    }
    
}

export const setTimeZone = (time) => dispatch => {
    dispatch({
        type:SET_TIME_ZONE,
        payload: time
    })
}

export const CancelReport = async (id) =>{
    try {
        const canceled = await axios.post(`${BASE_URL}task/stop`, {id:id});
        if(canceled){
            return {error:false, data:canceled, errors:null,  message:'Schduled cancelled successfully'}
        }
        return {error:true, data:null, errors:'Operation failed', message:'Operation failed'}
    } catch (error) {
        if(error.response){
            return {error:true, data:null, errors:error.response.data.errors, message:error.response.data.message}
        }else{
            return {error:true, data:null, errors:'Network error', message:'Network error'}
        }
    }

}