import React, { useState, useEffect } from 'react';
import {Row, Col} from 'reactstrap';
import {GrDocumentCloud} from 'react-icons/all'
import LongButton from '../component/Buttons/DefaultButtonLarge';
import RoundButton from '../component/Buttons/RoundButton';
import DragAndDrop from '../scripts/DragandDrop';
import { connect } from 'react-redux';
import {uploadFile} from '../service/actions/upload';
import PropTypes from 'prop-types';
import simfixImg from '../assets/simfix.png';

function UploadReport(props) {
    const [document, setDocument] = useState(null);
    
    useEffect(()=>{
        console.log(props.file.file); 
    },[props.file]);
    
    const _fileSelected = (e)=>{
        setDocument(e.target.files[0])
        props.uploadFile(e.target.files[0])
        //setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
    const handleDrop = (files)=>{
        props.uploadFile(files[0])
        setDocument(files[0]);
  }
    return (
        <section style={{overflow:'hidden'}}>
             <Row>
                 <Col className = 'logo_col' md={4}>
                    <div className = 'logo_buttin_house'>
                        <img src = {simfixImg}/>
                        <RoundButton onClick = {()=>props.history.push('/schedules')} title = 'View Scheduled Reports'/>
                    </div>
                 </Col>
                 <Col sm = {12} md={8}>
                    <div className = 'upload_area'>
                        <DragAndDrop handleDrop = {handleDrop}>
                            <div className = 'light_drag'>
                                { document? <GrDocumentCloud size={120}/> :
                                    <span className = 'drag_text' style={{fontWeight:'bold', fontSize:'16px'}}>Drag and drop the document here</span>
                                }
                            </div>
                        </DragAndDrop>
                        <p className = 'drag_text'>OR</p>
                        <input  onChange = {_fileSelected} className = 'upload_input' type = 'file' /><br/>
                        <LongButton onClick = {()=>{
                            props.history.push('/schedule_details');
                            }} disable={document?false:true} title = 'Upload & Schedule'/>
                    </div>
                 </Col>
             </Row>
             <Row className = 'mobile_row'>
                 <Col style = {{display: 'flex', justifyContent:'center'}}>
                    <button onClick = {()=>props.history.push('/schedules')} style={{alignSelf:'center'}}>View Schedules</button>
                 </Col>
             </Row>
        </section>
    )
}
UploadReport.propTypes = {
    file: PropTypes.object.isRequired,
    uploadFile: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    file: state.file
})
export default connect(mapStateToProps, {uploadFile})(UploadReport);