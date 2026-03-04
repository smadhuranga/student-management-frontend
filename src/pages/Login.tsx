import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {loginUser} from "../services/authservice";

import LoginLayout from "../components/login/LoginLayout";
import LoginCard from "../components/login/LoginCard";

const Login: React.FC = () => {
    const navigate = useNavigate();


    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        if (!name || !password) {
            setError("Please enter both username and password");
            return;
        }

        setLoading(true);
        setError("");

        try {
            console.log("Payload sent to backend:", {Name: name, Password: password});
            await loginUser({Name: name, Password: password});

            await Swal.fire({
                icon: "success",
                title: "Login Successful!",
                text: "Welcome back!",
                timer: 1500,
                showConfirmButton: false,
            });

            navigate("/dashboard");
        } catch (err) {
            console.error("Login failed", err);
            setError("Invalid username or password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleLogin();
    };

    return (
        <LoginLayout>
            <LoginCard
                name={name}
                setName={setName}
                password={password}
                setPassword={setPassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                loading={loading}
                error={error}
                onLogin={handleLogin}
                onKeyDown={handleKeyDown}
            />
        </LoginLayout>
    );
};

export default Login;