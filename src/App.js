import "./App.scss";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import Body from "./components/body/Body";
import Header from "./components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchLogin,
  fetchUser,
  dispatchGetUser,
} from "./redux/actions/authAction";
import "antd/dist/antd.css";
import Chat from "./pages/home/Social/chat";

function App() {
  
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const {loginUser,isInstr} = auth 
  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const getToken = async () => {
        const res = await axios.get("http://localhost:5000/users/refresh_token", null);
        dispatch({ type: "GET_TOKEN", payload: res.data.refreshToken });
        
      };
      getToken();
    }
  }, [auth.isLogged, dispatch]);

  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin());

        return fetchUser(token).then((res) => {
         
          dispatch(dispatchGetUser(res));
          
        });
      };
      getUser(); 
 
    }
    
  }, [token, dispatch]);


 


  return (
    
      <div className="App">
      <Router>
        <Header />
        <Body />  
        <Chat/> 
      </Router>
      </div>
    
    
  );
}

export default App;
