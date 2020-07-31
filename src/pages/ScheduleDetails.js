import React, { useState, useEffect, useRef, Fragment } from 'react';
import {FcDocument} from 'react-icons/all'
import {Row, Col} from 'reactstrap';
import {connect} from 'react-redux';
import { ScheduleReporter as sendReport, GetReports } from '../service/actions/report';
import  NotificationSystem from 'react-notification-system';
import Loader from 'react-loader-spinner';
const moment = require('moment-timezone');

function ScheduleDetail(props) {
    const [data, setData] = useState({
        type:'one_off',
        frequency:1,
        multiplier:1
    });
    const notify = useRef();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(!props.file.file) props.history.push('/')
    },[props.file, props.history]);

    useEffect(()=>{
        if(loading) {
            const { error, errors, data } = props.report;
            if(!error && data) {
                notify.current.addNotification({
                    message: "Report scheduled successfully",
                    level: 'success',
                    autoDismiss:5
                  });
                  props.GetReports();
                setTimeout(()=>{
                    props.history.push('/schedules')
                },3000)
            }else if(error){
                notify.current.addNotification({
                    message: errors,
                    level: 'error',
                    autoDismiss:5
                  });
            }
            console.log(props.report);   
            setLoading(false);
        }
    }, [props.report])

    const dataEntered = e => {
        setData({...data, [e.target.name]: e.target.value});
    }

    const changeType = value => {
        setData({...data, type: value});
    }

    const createNewSchedule = e => {
        e.preventDefault();
        const form = new FormData();
        form.append('type', data.type);
        form.append('document', props.file.file);
        form.append('title', data.title);
        form.append('recipients', data.recipients);
        const fstime = data.start_date + 'T' + data.start_time + ':00'
        //moment.
        let st = moment.tz(fstime, props.report.zone);
       // moment.utc().tz
        st  = st.utc().format();
        console.log(st);
        form.append('start_date', st);
        if(data.type !== 'one_off') {
            let f = Number(data.frequency) *  Number(data.multiplier);
            form.append('frequency', f);
        }else  form.append('frequency', 0);
        if(data.type === 'recurrent_stop') {
           let end = moment.tz((data.end_date + 'T' + data.end_time + ':00'), props.report.zone);
           end  = end.utc().format();
            form.append('end_date', end)
        }
        // for (var pair of form.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]); 
        // }
        setLoading(true)
        props.sendReport(form);
    }
   
    return (
        <Fragment>
            <NotificationSystem ref ={notify}/>
              <form onSubmit = {createNewSchedule} style={{overflow:'hidden'}}>
                 <Row>
                    <Col md={4}>
                            <div className = 'schedule_flex_div'>
                                <FcDocument  size = {250} />
                                <input onChange = {dataEntered} name = 'title'  required className= 'normal_input' placeholder = 'Enter the title'/>
                            </div>
                    </Col>
                    <Col md={8}>
                        <Row style={{height:'100%'}}>
                        <Col sm = {12} md= {6}>
                                <div className = 'text_area_container'>
                                    <table style={{margin:"10px"}}>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <button type = 'button' onClick = {()=>changeType('one_off')} className={data.type==='one_off'?'selected_button':''}>One off</button>
                                                </td>
                                                <td>
                                                <button type = 'button' onClick = {()=>changeType('recurrent')}  className={data.type==='recurrent'?'selected_button':''}>Recurrent</button>
                                                </td>
                                                <td>
                                                <button type = 'button' onClick = {()=>changeType('recurrent_stop')}  className={data.type==='recurrent_stop'?'selected_button':''}>Recurrent Until</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                        <table style={{width:'80%'}}>
                                            <tbody>
                                                <tr>
                                                    <th>Start Date</th>
                                                    <td>
                                                        <input onChange = {dataEntered} name = 'start_date' required className= 'moment_input' type='date'/>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Start Time</th>
                                                    <td>
                                                        <input onChange = {dataEntered} name = 'start_time' required className= 'moment_input' type='time'/>
                                                    </td>
                                                </tr>
                                            {data.type !== 'one_off' && <tr>
                                                    <th>Frequency</th>
                                                    <td>
                                                        <input onChange = {dataEntered} name = 'frequency' required className= 'moment_input' defaultValue = {1} style={{width:"80px", height:"30px"}} type='number'/>
                                                        <select defaultChecked = '1' onChange = {dataEntered} name = 'multiplier' className = 'moment_input' style={{height:"30px"}}>
                                                            <option value = '1' >Minute(s)</option>
                                                            <option value = '60'>Hour(s)</option>
                                                            <option value = '1440'>Day(s)</option>
                                                        </select>
                                                    </td>
                                                </tr>}
                                            {data.type === 'recurrent_stop' && <tr>
                                                    <th>End Date</th>
                                                    <td>
                                                        <input onChange = {dataEntered} name = 'end_date' required className= 'moment_input' type='date'/>
                                                    </td>
                                                </tr>}
                                                {data.type === 'recurrent_stop' && <tr>
                                                    <th>End Time</th>
                                                    <td>
                                                        <input onChange = {dataEntered} name = 'end_time' required className= 'moment_input' type='time'/>
                                                    </td>
                                                </tr>}
                                            </tbody>
                                        </table>
                                </div>
                        </Col>
                        <Col sm = {12} md= {6}>
                        <div className = 'text_area_container'>
                                <textarea name = 'recipients' onChange = {dataEntered} required placeholder='Enter the recipient email(s) separeted by comma' className='recipient_email_input'></textarea>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <button  onClick = {()=>props.history.push('/')} disabled = {loading} type = 'button' style={{marginTop:"20px", width:"150px"}}>Go back</button>
                                            </td>
                                            <td>
                                                <button className='small_button'  disabled = {loading} type = 'submit' style={{marginTop:"20px", width:"150px"}}>
                                                    {loading?<Loader style={{display:"inline",marginLeft:"10px"}} type="TailSpin" color="#EDBF0B" height={30} width={30}/>:'Submit'}
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                        </div>
                        </Col>
                        </Row>
                    </Col>
                </Row>
            </form>
        </Fragment>
    )
}
const mapStateToProps = state => ({
    file: state.file,
    report: state.report,
});
export default connect(mapStateToProps, {sendReport,GetReports})(ScheduleDetail);