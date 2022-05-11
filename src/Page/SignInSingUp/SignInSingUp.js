import React, {useState} from "react";
import BasicModal from "../../components/modal/BasicModal";
import {Container, Row, Button, Col} from  "react-bootstrap";
import LogoTweter from "../../Assets/Png/4.1_logo.png";
import LogoWhiteTweter from "../../Assets/Png/4.2_logo-white.png";
import "./SignInSingUp.scss";
import {FontAwesomeIcon}from "@fortawesome/react-fontawesome";
import {
    faSearch,
faUsers,
faComment
} from "@fortawesome/free-solid-svg-icons";
import SignUpForm from "../../components/SignUpForm/SignUpForm";


export default function SignInSingUp(){
    const[showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState(null);
    const openModal = content => {
        setShowModal(true);
        setContentModal(content);
    };

    return (
        <>
        <Container className = "signin-signup" fluid >
          <Row>
            <LeftComponent />
            <RightComponent openModal={openModal} 
            setShowModal = {setShowModal}
             />
          </Row>
        </Container>
        <BasicModal show = {showModal} setShow = {setShowModal}>
            {contentModal}
        </BasicModal>
        </>
    );
}
function LeftComponent(){
    return (
        <Col className = "signin-signup__left" xs = {6} >
            <img src = {LogoTweter} alt = "Tweter"/>
            <div>
                <h2>
                    <FontAwesomeIcon icon = {faSearch}/>
                    Sigue lo que te interesa.
                    </h2>

                <h2>
                <FontAwesomeIcon icon = {faUsers}/>
                 Entérate de lo qué está hablando la gente.
                 </h2>

                <h2>
                <FontAwesomeIcon icon = {faComment}/>
                    Únete a la conversación.
                </h2>

            </div>
        </Col>
    );
}

function RightComponent(props){
    const {openModal, setShowModal} = props;

    return (
        <Col className = "signin-signup__right" xs = {6}>
            <div>
                <img src={LogoWhiteTweter} alt = "Tweter" />
                <h2>Mira lo que está pasando en el mundo.</h2>
                <h3>Únete a Tweter hoy mismo.</h3>
                <Button 
                variant = "primary"
                onClick={ () => openModal (<SignUpForm setShowModal = {setShowModal} /> ) }
                >
                    Registrate
                    </Button>
                <Button
                 variant = "outline-primary"
                 onClick={ () => openModal (<SignUpForm setShowModal = {setShowModal} /> ) }
                 >
                     Iniciar sesión
                     </Button>
            </div>
        </Col>
    );
}
