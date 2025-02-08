import { Navigate, Outlet } from "react-router-dom";
import axiosInstance from "../apis/config";


const getUser = async () => {
    try {
        const res = await axiosInstance.get('api/auth/');
        console.log(res);
        return res.data.id;
    } catch (err) {
        return null
        console.log(err);
    }
};

const ProtectedRoutes = async () => {
    const user = await getUser();
    return user? <Outlet/> : <Navigate to="/login" />;
};

const UserAuthRoutes = async ()=>{
    const user = await getUser();
    return !user? <Outlet/> : <Navigate to="/profile" />;
};
export {ProtectedRoutes, UserAuthRoutes};