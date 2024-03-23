import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../Pages/Clients/Home";
import UserLogin from "../Pages/Clients/Login";
import Register from "../Pages/Clients/Register";
import VerifyEmail from "../Components/clients/Login/VerifyEmail";

function UserRoute() {
    const IsAuth = useSelector((state) => state.Client);
    return (
        <div>
            <Routes>
                <Route path="/" element={IsAuth.Token ? <Home /> : <UserLogin />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={IsAuth.Token ? <Home /> : <UserLogin />} />
                <Route path="/verify/:token" element={<VerifyEmail />} />
            </Routes>
        </div>
    );
}

export default UserRoute;
