import React, {useEffect, useState} from "react";
import { Card, Image } from "react-bootstrap";
import {Link} from "react-router-dom";
import {API_HOST} from "../../utilidades/constant";
import {getUserApi} from "../../Api/user";
import AvatarNoFound from"../../Assets/Png/8.2_avatar-no-found.png";

export default function User(props){
    const {user} = props;
    const[userInfo, setUserInfo ] = useState(null);

    useEffect(()=>{
        getUserApi(user.id).then((response)=>{
            setUserInfo(response);
        })
    }, [user]);

    return (
        <Card as={Link} to={`/${user.id}`} className="list-users__user">
            <Image
            width={64}
            height={64}
            roundedCircle
            className="mr-3"
            src={
                userInfo?.avatar
                ?`${API_HOST}/obtenerAvatar?id=${user.id}`
                :AvatarNoFound
            }
            alt={`${user.nombre} ${user.apellido}`}
            />
            <Card.Body>
                <h5>
                    {user.nombre} {user.apellido}
                </h5>
                <p>{userInfo?.biografia}</p>
            </Card.Body>
        </Card>
    )
}