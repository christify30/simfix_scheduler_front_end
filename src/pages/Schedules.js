import React, { useEffect, useState, useRef, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GetReports, CancelReport } from '../service/actions/report';
import LongButton from '../component/Buttons/DefaultButtonLarge';
import  NotificationSystem from 'react-notification-system';
const moment = require('moment-timezone');

function Schedules(props) {
    const [schedules, setSchedules] = useState([]);
    const notify = useRef();
    const interval = useRef();

    useEffect(()=>{
        props.GetReports();
        interval.current = setInterval(()=>{
            props.GetReports();
        },60000)
    },[]);

    useEffect(()=>{
        const { report } = props.report;
        console.log(report);
        report.data ?  setSchedules(report.data) :  setSchedules([])
    }, [props.report]);

    useEffect(()=>{
        return ()=>{
            clearInterval(interval.current);
            console.log("stopped");
        }
    },[])

    const cancel = async (id) => {
        var youWantToCancel = window.confirm('Are you sure you want to cancel this shedule?')
        if(!youWantToCancel){
            return false
        }
        const cancelled = await CancelReport(id);
        const { error, message, errors } = cancelled;
        console.log(cancelled);
        
        if(error){
            notify.current.addNotification({
                message: errors,
                level: 'error',
                autoDismiss:5
              });
              props.GetReports();
        }else{
            notify.current.addNotification({
                message: message,
                level: 'success',
                autoDismiss:5
              });
              props.GetReports();
        }
    }
    return (
        <Fragment>
            <NotificationSystem ref ={notify}/>
            <div>
               <LongButton title = 'Schedule a report' onClick = {()=>props.history.push('/')}/>
                <h2 className = 'heading_two'>ALL SCHEDULED REPORTS</h2>
            </div>
            <div className = 'report_container'>
                <table className = 'report_display'>
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>REPORT NAME</th>
                            <th>START DATE</th>
                            <th>STATUS</th>
                            <th>END DATE</th>
                            <th>RECURRING</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.map((data,i)=>
                            <tr key = {i+1}>
                                <td className='center_text'><small>{i+1}</small></td>
                                <td><small>{data.title}</small></td>
                                <td className='center_text'><small>{moment.utc(data.start_date).tz(props.report.zone).format()}</small></td>
                                <td className='center_text'><small>{data.status}</small></td>
                                <td className='center_text'><small>{data.type === "recurrent_stop" ?  moment.utc(data.end_date).tz(props.report.zone).format() : '---'}</small></td>
                                <td className='center_text'> 
                                    <input className = 'checkBox' type="checkbox" checked = {data.type !== "one_off"}/>
                                </td>
                                <td className='center_text'>
                                    <button onClick={()=>alert('In progress')} className='small_button'>Edit</button>
                                    <button onClick={()=>{
                                       cancel(data.id)
                                    }} className='small_button' style={{backgroundColor:'red'}}>Cancel</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className = 'buttom_but_cont'>
            </div>
        </Fragment>
    )
}
Schedules.propTypes = {
    report: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    report: state.report
})

export default connect(mapStateToProps, { GetReports })(Schedules);