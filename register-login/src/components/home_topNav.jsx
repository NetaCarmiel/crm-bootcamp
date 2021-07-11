import React from "react";
import Button from '../components/button'
import {Link} from "react-router-dom";

function Home_TopNav(props) {

    return (
        <body>
        <div className="topnav">
        <div className="topnav_text">
            Beautiz
        </div>
        
        <Link to="/users"> Users</Link>
        <Link to="/clients"> Clients</Link>
        <Link to="/treatments"> Treatments</Link>
        <Link to="/"> Products</Link>
        <div className="buttons">
        <Button className = {props.className} button_text={props.button_text} onClick={props.onClick}></Button> 
        </div>
      </div>
      </body>
    );
}


export default Home_TopNav;