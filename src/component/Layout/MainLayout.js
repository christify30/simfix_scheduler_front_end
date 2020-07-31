import React, { Fragment } from 'react';
import NavBar from './NavBar';
import Content from './Content';

function MainLayout(props){
    return(
        <Fragment>
            <NavBar/>
            <Content>
                {props.children}
            </Content>
        </Fragment>
    )
}   
export default MainLayout;