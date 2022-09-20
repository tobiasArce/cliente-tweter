import React, {useState} from "react";
import {Form, Button, FormGroup, FormControl,} from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import {values, size} from "lodash";
import {toast} from "react-toastify";
import {isEmailValid} from "../../utilidades/validation";
import "./SignInForm.scss";
import {signInApi, setTokenApi} from "../../Api/auth";


export default function SignInForm(props){
    const [formData, setFormData] = useState(initialFormValue());
    const [signInLoading, setSignInLoding] = useState(false);
    const {setRefreshCheckLogin} = props;

    const onSubmit = e =>{
        e.preventDefault();
        let validCount = 0;
        values(formData).some(value =>{
            value && validCount ++
            return null;
        });
        if (size(formData)!== validCount){
            toast.warning ("Debes completar todos los campos del formulario.");
        } else {
            if (!isEmailValid(formData.email)){
                toast.warning("Email incorrecto.");
            }else{
                setSignInLoding(true);
                signInApi (formData).then(response =>{
                    if (response.message){
                        toast.warning(response.message);
                    }
                    else {
                        setTokenApi(response.token)
                        setRefreshCheckLogin(true);
                    }
                })
                .catch ( ()=>{
                    toast.error("Error en el servidor, intentelo mas tarde.");
                } )
                .finally ( ()=> {
                    setSignInLoding(false);
                }
                );
            }
        }
    };

    const onChange = e => {
        setFormData({...formData, [e.target.name] : e.target.value});
    }

    return(
        <div className="sign-in-form">
            <h2>Iniciar sesión</h2>
            <Form onSubmit={onSubmit} onChange = {onChange}>
                <FormGroup className="form-group">
                    <FormControl 
                    type="email"
                    name="email"
                     placeholder="Correo electronico"
                     defaultValue={formData.email}
                     />
                </FormGroup>

                <FormGroup className = "form-group">
                    <FormControl 
                    type="password" 
                    name="password"
                    placeholder="Contraseña"
                    defaultValue={formData.password}
                    />
                </FormGroup>
                <Button variant = "primary" type="submit">
                    {!signInLoading ? "Iniciar sesión": <Spinner animation = "border"/>}
                </Button>
            </Form>
        </div>
    );
}
function initialFormValue(){
    return {
        email : "",
        password : "" 
    }
}