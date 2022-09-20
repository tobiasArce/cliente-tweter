import React from "react";
import { useState, useEffect } from "react";
import EditUserForm from "../EditUserForm/EditUserForm";
import ConfigModal from "../../modal/ConfigModal/ConfigModal";
import AvatarNoFound from "../../../Assets/Png/8.2_avatar-no-found.png";
import {API_HOST} from "../../../utilidades/constant";
import {checkFollowApi, followUserApi, unFollowUserApi} from "../../../Api/follows";
import { Button } from "react-bootstrap";
import "./BannerAvatar.scss";

export default function BannerAvatar(props){
    const {user, loggedUser} = props;
    const [showModal, setShowModal] = useState(false);
    const [following, setFollowing ] = useState(null);
    const [reloadFollow, setReloadFollow] = useState(false);
    const bannerUrl = user?.banner
    ?`${API_HOST}/obtenerBanner?id=${user.id}`
    :null;
    const avatarUrl = user?.avatar
    ?`${API_HOST}/obtenerAvatar?id=${user.id}`
    :AvatarNoFound;

    useEffect(()=>{
        if (user){
            checkFollowApi(user?.id).then(response =>{
            if (response?.status){
                setFollowing(true);
            }else{
                setFollowing(false);
            }
        }) 
    }
        
        setReloadFollow(false);
    }, [user, reloadFollow])

    const onFollow = ()=>{
        followUserApi(user.id). then(()=>{
            setReloadFollow(true);
        })
    }

    const onUnfollow= ()=>{
        unFollowUserApi(user.id). then(()=>{
            setReloadFollow(true);
        })
    }
    

    return(
        <div
      className="banner-avatar"
      style={{backgroundImage: `url('${bannerUrl}')`}}
    >
            <div 
            className="avatar"
            style={{backgroundImage: `url('${avatarUrl}')`}}
            />
        
        {user &&(
            <div className="options">
            {loggedUser._id===user.id&&(<Button onClick={() => setShowModal(true)}>Editar perfil</Button>)}
            {loggedUser._id!==user.id&&(
                following!== null &&
                (following ? (
                <Button onClick={onUnfollow} className="unfollow">
                   <span>Siguiendo</span> 
                    </Button>
                ):(
                <Button onClick={onFollow}>Seguir</Button>
                ))
            )}
            </div>
        )}
        <ConfigModal
        show={showModal}
        setShow={setShowModal}
        title="Editar perfil">
            Formulario de edicion 
            <EditUserForm user={user} setShowModal={setShowModal}/>
        </ConfigModal>
        </div>
    );
}

