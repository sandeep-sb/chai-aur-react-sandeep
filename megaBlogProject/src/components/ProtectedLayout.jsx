import React, {useState, useEffect} from "react";
import { UseSelector, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protectedlayout = ({children, authentication=true}) => {

    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        // true && true!==false  ====>  true && true ====> true ----> move to login page
        // true && true!==true ====> true && false ====> false ----> next statement
        if(authentication && authentication!==authStatus){
            navigate("/login");
        }
        // false && true!==false  ====>  false && true ====> false ----> next statement
        // false && true!==true ====> false && false ====> true ----> move to home page
        else if(!authentication && authentication!==authStatus){
            navigate("/");
        }
        setLoader(false);
    }, [navigate, authStatus, authentication]);

    return loader ? <h1>Loading...</h1> : <>{children}</>
}

export default Protectedlayout;