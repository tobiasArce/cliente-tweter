import React from "react";
import {Link} from "react-router-dom";
import Error404Image from "../../Assets/Png/1.1_error-404.png";
import Logo from "../../Assets/Png/4.1_logo.png";
import "./Error404.scss";

export default function Error404(){
    return(
        <div className="error404">
            <img src={Logo} alt="tweter"/>
            <img src={Error404Image} alt="error404" />
            <Link to="/"> Volver al inicio </Link>  
        </div>
    );
}