import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authservice";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!name || !password) {
      alert("Please enter username and password");
      return;
    }

    try {
      console.log("Payload sent to backend:", { Name: name, Password: password });
      await loginUser({ Name: name, Password: password }); // match backend fields exactly
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 fade-in animation-delay-2000">
      <h2 className="text-4xl font-bold text-blue-500 mb-4">Login Page</h2>

      <input
        type="text"
        placeholder="Username"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 w-72"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 w-72"
      />

      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
      >
        Login
      </button>

      <style>{`
         div {
            background: linear-gradient(to right, #1a1423, #372549);
            border-radius: 8px;
            box-shadow: 0 10px 16px rgba(0, 0, 0, 0.5);
            padding: 2rem;
            text-align: center;
        }
        h2 {
            color: #e6615a;
            margin-bottom: 1rem;
            font-size: 2.5rem;
            font-weight: bold;
            font-family: 'Arial', sans-serif;
        }
        textarea {
            width: 50%;
            padding: 0.5rem;
            margin-bottom: 1rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            background-color: #333;
            font-size: 1rem;
            font-family: 'Arial', sans-serif;
            color: white;
        }
        textarea::-webkit-input-placeholder {
            color: white;
        }
        textarea::placeholder {
            color: #999;
        }
        button {
            background-color: #ff8834;
            color: #fff;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
            font-family: 'Arial', sans-serif;
            transition: background-color 0.3s ease;
        }
        button:hover {
            background-color: #e6615a;
        }
        textarea:focus {
            outline: none;
            border-color: #007bff;
            box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
        }
        .fade-in {
            animation: fade-in 1s ease-in-out;
        }
        @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animation-delay-2000 {
            animation-delay: 2s;
        }
        .animation-delay-4000 {
            animation-delay: 4s;
        }
        .animation-delay-6000 {
            animation-delay: 6s;
        }
      `}</style>
    </div>
  );
};

export default Login;