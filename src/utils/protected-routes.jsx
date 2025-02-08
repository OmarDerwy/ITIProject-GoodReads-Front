import { Navigate, Outlet } from "react-router-dom";
import axiosInstance from "../apis/config";
import React, { useEffect, useState } from "react";

const ProtectedRoutes = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosInstance.get('api/auth/')
            .then(res => {
                setUser(res.data.id);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    if (loading) return null; 
    return user ? <Outlet /> : <Navigate to="/login" />;
};

const UserAuthRoutes = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosInstance.get('api/auth/')
            .then(res => {
                setUser(res.data.id);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    if (loading) return null; 
    return !user ? <Outlet /> : <Navigate to="/profile" />;
};

export { ProtectedRoutes, UserAuthRoutes };