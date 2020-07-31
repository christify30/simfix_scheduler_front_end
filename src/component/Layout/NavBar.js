import React, { Fragment, useEffect, useState } from 'react';
import Logo from '../Logo/MainLogo';
import './Layout.css';
import { BsClock } from 'react-icons/all';
import {connect} from 'react-redux';
import { setTimeZone } from '../../service/actions/report';
import axios from 'axios';

function NavBar(props){
    const [zone, setZone] = useState('');
    const [zones, setZones] = useState([]);

    useEffect(()=>{
        getZones()
    },[]);

    useEffect(()=>{
        setZone(props.zone);
    },[props.zone]);

    const getZones = async () => {
        try {
            const timeZones = await axios.get('http://worldtimeapi.org/api/timezone');
            setZones(timeZones.data);
            
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Fragment>
            <nav className = 'main_nav'>
                <Logo title = 'Reportr' />
                 <div className = 'time_zone'>
                     <BsClock size = {30}/>
                     <select onChange = {(e)=> props.setTimeZone(e.target.value)} value = {zone} className ='time_zone_select'>
                         {zones.map((z,i)=>
                            <option key = {i} value = {z}>{z}</option>
                            )}
                     </select>
                 </div>
            </nav>
        </Fragment>
    )
}
const mapStateToProps = state => ({
    zone : state.report.zone
})
export default connect(mapStateToProps, {setTimeZone})(NavBar);