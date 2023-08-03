import { Routes, Route } from "react-router-dom";
import useAuth from "./hooks/useAuth";

import "./App.css";
import Login from "./pages/Login";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/Dashboard";
import PaymentMethod from "./pages/PaymentMethod";
import ProtectedRoute, { ProtectedRouteProps } from "./components/ProtectedRoute";
import Client from "./pages/Client";

function App() {
    const { isAuthenticated } = useAuth();
    const defaultProtectedRouteProps: Omit<ProtectedRouteProps, "outlet"> = {
        isAuthenticated,
        authenticationPath: "/login",
    };

    // console.log("xx", isAuthenticated);

    return (
        <Routes>
            <Route path="*" element={<h1>PAGE NOT FOUND</h1>} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin">
                {/* <Route
                    path="dashboard"
                    element={
                        <ProtectedRoute
                            {...defaultProtectedRouteProps}
                            outlet={<Layout mainComponent={<Dashboard />} />}
                        />
                    }
                /> */}
                <Route path="dashboard" element={<Layout mainComponent={<Dashboard />} />} />
                <Route path="master">
                    <Route path="payment_method" element={<Layout mainComponent={<PaymentMethod />} />} />
                    <Route path="client" element={<Layout mainComponent={<Client />} />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
