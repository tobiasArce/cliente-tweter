import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faUser, faUsers, faPowerOff} from "@fortawesome/free-solid-svg-icons";
import LogoWhite from "../../Assets/Png/4.2_logo-white.png";
import "./LeftMenu.scss";
import TweetModal from "../modal/TweetModal";
import {logoutApi} from "../../Api/auth";
import useAuth from "../../hooks/useAuth";

export default function LeftMenu(props){
    const {setRefreshCheckLogin}= props;
    const user = useAuth();
    const [showModal, setShowModal] = useState(false);

    const logout = () =>{
        logoutApi();
        setRefreshCheckLogin(true);
    };

    return (
        <div className="left-menu">
            <img className="logo" src={LogoWhite} alt="tweter"/>

            <Link to="/">
                <FontAwesomeIcon icon={faHome}/> Inicio
            </Link>

            <Link to="users">
                <FontAwesomeIcon icon={faUsers}/> Usuarios
            </Link>

            <Link to={`/${user?._id}`}>
                <FontAwesomeIcon icon={faUser}/> Perfil
            </Link>

            <Link to="" onClick={logout}>
                <FontAwesomeIcon icon={faPowerOff}/> Cerrar Sesion
            </Link>

            <Button onClick={() => setShowModal(true)}>Twettear</Button>
            <TweetModal show={showModal} setShow={setShowModal} />

        </div>
    )
}