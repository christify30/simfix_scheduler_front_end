import React from 'react';
import './Logo.css';
import { Link } from 'react-router-dom';


const Logo = props => <Link to = '/' className = 'main_logo'>{props.title}</Link>;

export default Logo;