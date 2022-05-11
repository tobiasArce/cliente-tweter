import React, {useState} from "react";

import SignInSingUp from "./Page/SignInSingUp";

export default function App() {
  const [user, setUser] = useState({name:"Tobias"});
  return <div>
    {user ? 
    (<SignInSingUp/>) : <h1>Debes loguearte</h1>}
  </div>;
} 


