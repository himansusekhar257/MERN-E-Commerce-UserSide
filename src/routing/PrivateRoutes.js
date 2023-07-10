import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export const PrivateRoutes = ({children}) => {
    const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("customer"))
    return getTokenFromLocalStorage?.token!==undefined ? children : (toast.info("please Login First")&&<Navigate to='/login' replace={true}/>)
}