import React from "react";
import { useAuth } from '../contexts/AuthContext';

import { Routes, Route, useNavigate } from "react-router-dom";
import {Login, Signup, Landing, SurveyComponent, Consent} from "../components/index.js";
import { Navigate } from "react-router-dom";

// Component that receives the id parameter


const Router = () => {

    const { currentUser } = useAuth();
    const PrivateRoute = ({children} ) => {
        return currentUser ? children : <Navigate to="/login" />;
    };

    return (
        <>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/survey" element={<PrivateRoute><SurveyComponent/></PrivateRoute>} />
                <Route path="/consent" element={<Consent/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </>
    );
};

export default Router;
