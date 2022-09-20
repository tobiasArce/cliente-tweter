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
import SignInForm from "../../components/SignInForm";

export default function SignInSingUp(props) {
    const { setRefreshCheckLogin } = props;
    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState(null);
  
    const openModal = content => {
      setShowModal(true);
      setContentModal(content);
    };
  
    return (
      <>
        <Container className="signin-signup" fluid>
          <Row>
            <LeftComponent />
            <RightComponent
              openModal={openModal}
              setShowModal={setShowModal}
              setRefreshCheckLogin={setRefreshCheckLogin}
            />
          </Row>
        </Container>
  
        <BasicModal show={showModal} setShow={setShowModal}>
          {contentModal}
        </BasicModal>
      </>
    );
  }
  
  function LeftComponent() {
    return (
      <Col className="signin-signup__left" xs={6}>
        <img src={LogoTweter} alt="Tweter" />
        <div>
          <h2>
            <FontAwesomeIcon icon={faSearch} />
            Sigue lo que te interesa.
          </h2>
          <h2>
            <FontAwesomeIcon icon={faUsers} />
            Entérate de qué está hablando la gente.
          </h2>
          <h2>
            <FontAwesomeIcon icon={faComment} />
            Únete a la conversación.
          </h2>
        </div>
      </Col>
    );
  }
  
  function RightComponent(props) {
    const { openModal, setShowModal, setRefreshCheckLogin } = props;
  
    return (
      <Col className="signin-signup__right" xs={6}>
        <div>
          <img src={LogoWhiteTweter} alt="Tweter" />
          <h2>Mira lo que está pasando en el mundo en este momento</h2>
          <h3>Únete a Tweter hoy mimso.</h3>
          <Button
            variant="primary"
            onClick={() => openModal(<SignUpForm setShowModal={setShowModal} />)}
          >
            Regístrate
          </Button>
          <Button
            variant="outline-primary"
            onClick={() =>
              openModal(
                <SignInForm setRefreshCheckLogin = {setRefreshCheckLogin} />
              )
            }
          >
            Iniciar sesión
          </Button>
        </div>
      </Col>
    );
  }