import React from "react";
import {Row, Col, Form, Button, Spinner, FormGroup, FormControl} from "react-bootstrap";
import "./SignUpForm.scss";

export default function SignUpForm(props){
    const {setShowModal} = props;
    const onSubmit = e => {e.preventDefault();
    setShowModal(false);
};
return (
    <div className="sign-up-form">
        <h2>Crea tu cuenta</h2>
        <Form onSubmit={onSubmit}>
            <FormGroup>
                <Row>
                    <Col>
                    <FormControl type ="Text" placeholder = "Nombre" />
                    </Col>
                    <Col>
                    <FormControl type = "text" placeholder = "Apellido"/>
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <FormControl type = "email" placeholder = "Correo electronico"/>
            </FormGroup>
            <FormGroup>
            <Row>
                <Col>
                <FormControl type = "password" placeholder = "Contraseña" />
                </Col>
                <Col>
                <FormControl type = "password" placeholder = "Repetir contraseña" />
                </Col>
            </Row>
            </FormGroup>
            <Button variant = "primary" type = "submit">
                Registrarse
            </Button>
        </Form>
    </div>
);
}