// ProtectedRoute.tsx

import { FC, ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
    children: ReactElement; // Agregar tipo explícito para la propiedad 'component'
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
    const { authenticated } = useAuth();
    console.log({authenticated})
    if (!authenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
