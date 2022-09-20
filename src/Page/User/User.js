import React, {useState, useEffect} from "react";
import {getUserApi} from "../../Api/user";
import {toast} from "react-toastify";
import {Button, Spinner} from "react-bootstrap";
import BasicLayout from"../../layout/BasicLayout";
import {withRouter} from "react-router-dom";
import BannerAvatar from "../../components/User/BannerAvatar";
import InfoUser from "../../components/User/InfoUser/InfoUser";
import ListTweets from "../../components/ListTweets";
import { getUserTweetsApi } from "../../Api/tweet";
import useAuth from "../../hooks/useAuth";
import "./User.scss";

function User(props){
    const { match, setRefreshCheckLogin } = props;
    const [user, setUser] = useState(null);
    const [tweets, setTweets] = useState(null);
    const [page, setPage] = useState(1);
    const [loadingTweets, setLoadingTweets] = useState(false);
    const { params } = match;
    const loggedUser = useAuth();

    useEffect(()=> {
        getUserApi(params.id)
        .then((response) =>{
            if(!response) toast.error("El usuario que buscas no existe");
            setUser(response);
        })
        .catch(()=>{
            toast.error("El usuario que buscas no existe");
        });
    }, [params]);

    useEffect(() => {
        getUserTweetsApi(params.id, 1)
          .then((response) => {
            setTweets(response);
          })
          .catch(() => {
            setTweets([]);
          });
      }, [params]);
    
      const moreData = () => {
        const pageTemp = page + 1;
        setLoadingTweets(true);
    
        getUserTweetsApi(params.id, pageTemp).then((response) => {
          if (!response) {
            setLoadingTweets(0);
          } else {
            setTweets([...tweets, ...response]);
            setPage(pageTemp);
            setLoadingTweets(false);
          }
        });
      };

    return (
        <BasicLayout className="user">
            <div className="user__title">
                <h2>
                    {user ? `${user.nombre} ${user.apellido}` : "Usuario inexistente"}



                </h2>
            </div>
            <BannerAvatar user = {user} loggedUser = {loggedUser}/>
            <InfoUser user = {user}/>
            <div className="user__tweets">
            <h3>Tweets</h3>
        {tweets && <ListTweets tweets={tweets} />}
        <Button onClick={moreData}>
          {!loadingTweets ? (
            loadingTweets !== 0 && "Obtener más Tweets"
          ) : (
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              arian-hidden="true"
            />
          )}
        </Button>
      </div>
        </BasicLayout>
    );
}

export default withRouter(User);