import React from "react";
import {Row, Col, Form, Button, FormGroup, FormControl} from "react-bootstrap";
import {values, size}from "lodash";
import {toast} from "react-toastify";
import "./SignUpForm.scss";
import { useState } from "react";
import "../../utilidades/validation";
import { isEmailValid } from "../../utilidades/validation";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.css";
import {SignUpApi} from "../../Api/auth";

export default function SignUpForm(props){
    const {setShowModal} = props;
    
    const [signUpLoading, setSignUpLoading] = useState(false);

    const onSubmit = e => 
    {e.preventDefault();
    console.log(formData); 

    let validCount = 0;
    values(formData).some(value =>{
        value && validCount ++
        return null 
    });
    console.log(validCount);
    if (validCount !== size(formData)){
        toast.warning("Completa todos los campos del formulario");
    } else {
        if (!isEmailValid(formData.email)){
            toast.warning ("Email invalido");
        } else if (formData.password !== formData.repeatPassword){
            toast.warning ("Las contraseñas deben ser iguales");
        } else if (size( formData.password)<6){
            toast.warning("La contraseña debe tener al menos 6 caracteres");
        } else {
            setSignUpLoading(true);
            SignUpApi(formData)
            .then(response =>{
                if (response.code){
                    toast.warning(response.message);
                }else{
                        toast.success("El registro finalizo correctamente");
                        setShowModal(false);
                        setFormData(initialFormValue());
                }
                })
                .catch ( ()=>{
                    toast.error ("Error del servidor, intentelo mas tarde!");
                })
                .finally(() =>{
                    setSignUpLoading(false);
                })
        }
    }
};

const [formData, setFormData] = useState(initialFormValue());

const  onChange = e =>
 {
    setFormData ({ ...formData, [e.target.name]: e.target.value});
}

return (
    <div className="sign-up-form">
        <h2>Crea tu cuenta</h2>
        <Form onSubmit={onSubmit} onChange = {onChange}>
            <FormGroup className="form-group">
                <Row>
                    <Col>
                    <FormControl 
                    type ="Text" 
                    placeholder = "Nombre"
                    name= "nombre"
                    defaultValue={formData.nombre}
                    />
                    </Col>
                <Col>
                    <FormControl
                     type = "text" 
                     placeholder = "Apellido"
                     name="apellido"
                     defaultValue={formData.apellido}
                     />
                     </Col>
                     </Row>
            </FormGroup>
            <FormGroup className="form-group">
            
                <FormControl
                 type = "email"
                  placeholder = "Correo electronico"
                  name="email"
                  defaultValue={formData.email}
                  />
                
            </FormGroup>
            <FormGroup className="form-group">
            
                <FormControl 
                type = "password" 
                placeholder = "Contraseña" 
                name="password"
                defaultValue={formData.password}
                /> 
            </FormGroup>
            <FormGroup className="form-group">
                <FormControl
                 type = "password"
                 placeholder = "Repetir contraseña"
                 name="repeatPassword"
                 defaultValue={formData.repeatPassword} 
                 />
            </FormGroup>
            <Button variant = "primary" type = "submit">
            { !signUpLoading ? "Registrase" : <Spinner animation="border" variant="primary" />}
            </Button>
        </Form>
    </div>
);
}

function initialFormValue() {
    return {
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        repeatPassword: ""
    };
}