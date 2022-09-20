import React, {useState, useCallback} from "react";
import {Form, FormControl, FormGroup, Col, Row, Button, Spinner} from "react-bootstrap";
import DatePicker from"react-datepicker";
import es from "date-fns/locale/es";
import {useDropzone} from "react-dropzone";
import { toast } from "react-toastify";
import {API_HOST} from "../../../utilidades/constant";
import {Camara} from "../../../utilidades/icons";
import {uploadBannerApi, uploadAvatarApi, updateInfoApi} from "../../../Api/user"
import "./EditUserForm.scss";

export default function EditUserForm(props){
const {user, setShowModal} = props;
const [formData, setFormData] = useState(initialValue(user));

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

         if (bannerFile){
            await uploadBannerApi(bannerFile).catch(()=>{
                toast.error("Error al subir el Banner")
            })
        }

        if (avatarFile){
            await uploadAvatarApi(avatarFile).catch(()=>{
                toast.error("Error al subir el Avatar")
            })
        }

        await updateInfoApi(formData).then(()=>{
            setShowModal(false);
        })
        .catch(()=>{
            toast.error("Error al modificar los datos")
        })
        setLoading(false);
        window.location.reload();
    }

    const onChange = e =>{
        setFormData ({...formData, [e.target.name] : e.target.value});
    }

    const [bannerUrl, setBannerUrl] = useState(
        user?.banner
        ?`${API_HOST}/obtenerBanner?id=${user.id}`
        :null);

        const [avatarUrl, setAvatarUrl] = useState( user?.avatar
            ?`${API_HOST}/obtenerAvatar?id=${user.id}`
            :null);
    
        const [bannerFile, setBannerFile] = useState(null);
        const [avatarFile, setAvatarFile] = useState(null);
        const [ loading, setLoading] = useState(false);

    const onDropBanner = useCallback((acceptedFile) => {
        console.log(acceptedFile)
        const file = acceptedFile[0];
        setBannerUrl(URL.createObjectURL(file));
        setBannerFile(file);
    });

    const onDropAvatar = useCallback(acceptedFile=>{
        const file =acceptedFile[0];
        setAvatarUrl(URL.createObjectURL(file));
        setAvatarFile(file);
    });
    const {
        getRootProps : getRootBannerProps,
        getInputProps : getInputBannerProps,
    }= useDropzone({
        accept: "image/*",
        noKeyboard: true,
        multiple: false,
        onDrop: onDropBanner,
    });
    
    const { getRootProps: getRootAvatarProps,
            getInputProps: getInputAvatarProps
    } = useDropzone({
        accept:"image/*",
        noKeyboard: true,
        multiple: false,
        onDrop: onDropAvatar
    });

    return (
        <div className="edit-user-form">
            <div 
          className="banner"
          style={{ backgroundImage: `url('${bannerUrl}')` }}
          {...getRootBannerProps()}
          >
            <input {...getInputBannerProps()} />
        <Camara/>
            </div>

            <div 
            className="avatar"
            style={{ backgroundImage: `url('${avatarUrl}')` }}
            {...getRootAvatarProps()}
            >
                <input {...getInputAvatarProps()}/>
                <Camara/>
            </div>

            <Form onSubmit={onSubmit}>
                <FormGroup className="form-group">
                    <Row>
                        <Col>
                        <FormControl 
                        type="text" 
                        placeholder="Nombre" 
                        name="nombre"
                        defaultValue={formData.nombre}
                        onChange={onChange}
                        />
                        </Col>
                        <Col>
                        <FormControl 
                        type="text" 
                        placeholder="Apellido" 
                        name="apellido"
                        defaultValue={formData.apellido}
                        onChange={onChange}
                        />
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup className="form-group">
                    <FormControl 
                    as="textarea" 
                    row="3"
                    placeholder="Agrega tu biografia"
                    type = "text"
                    name="biografia"
                    defaultValue={formData.biografia}
                    onChange={onChange}
                    />
                </FormGroup>
                <FormGroup className="form-group"> 
                    <FormControl
                     type="text"
                      placeholder="Sitio Web"
                       name="sitioWeb"
                       defaultValue={formData.sitioWeb}
                       onChange={onChange}
                       />
                </FormGroup>
                <FormGroup>
                    <DatePicker 
                    placeholder="fecha de nacimiento"
                    locale={es}
                    selected={new Date(formData.fechaNacimiento)}
                    onChange= {value =>
                              setFormData({...formData, fechaNacimiento : value})
                              }
                    />
                </FormGroup>
                <Button className="btn-submit" variant="primary" type="submit">
                   {loading && <Spinner animation="border" size="sm"/>} Actualizar
                </Button>
            </Form>
        </div>
    );
}

function initialValue(user){
    return{
        nombre: user.nombre || "",
        apellido: user.apellido || "",
        biografia: user.biografia || "",
        ubicacion: user.ubicacion || "",
        sitioWeb: user.sitioWeb || "",
        fechaNacimiento: user.fechaNacimiento || ""

    }
}