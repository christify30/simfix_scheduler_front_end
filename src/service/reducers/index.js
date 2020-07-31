import { combineReducers} from 'redux';
import upload from './upload';
import report from './report';

export default combineReducers({
    file: upload,
    report
})