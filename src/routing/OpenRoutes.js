import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export const OpenRoutes = ({children}) => {
    const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("customer"))
    return getTokenFromLocalStorage?.token===undefined ? children :(<Navigate to='/' replace={true}/>)
}