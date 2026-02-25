import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authservice";
import Swal from 'sweetalert2';

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
    console.log("Payload sent to backend:", { Name: name, Password: password });
    await loginUser({ Name: name, Password: password });

   
    await Swal.fire({
      icon: 'success',
      title: 'Login Successful!',
      text: 'Welcome back!',
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
    <div style={styles.container}>
      {/* Animated background shapes */}
      <div style={styles.shape1}></div>
      <div style={styles.shape2}></div>
      <div style={styles.shape3}></div>

      {/* Glass card */}
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Welcome Back</h1>
          <p style={styles.subtitle}>Sign in to continue to your Students Dashboard</p>
        </div>

        {error && <div style={styles.errorMessage}>{error}</div>}

        <div style={styles.inputGroup}>
          <label style={styles.label}>Username</label>
          <div style={styles.inputWrapper}>
            <span style={styles.inputIcon}>👤</span>
            <input
              type="text"
              placeholder="Enter your username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              style={styles.input}
              disabled={loading}
              autoFocus
            />
          </div>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <div style={styles.inputWrapper}>
            <span style={styles.inputIcon}>🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              style={styles.input}
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
        </div>

        {/* <div style={styles.options}>
          <label style={styles.checkboxLabel}>
            <input type="checkbox" style={styles.checkbox} /> Remember me
          </label>
          <a href="#" style={styles.forgotLink}>Forgot password?</a>
        </div> */}

        <button
          onClick={handleLogin}
          style={{ ...styles.button, ...(loading ? styles.buttonDisabled : {}) }}
          disabled={loading}
        >
          {loading ? (
            <span style={styles.loader}>⏳</span>
          ) : (
            "Sign In"
          )}
        </button>

        {/* <div style={styles.footer}>
          Don't have an account? <a href="#" style={styles.signupLink}>Contact admin</a>
        </div> */}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    position: "relative",
    overflow: "hidden",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  shape1: {
    position: "absolute",
    top: "-10%",
    left: "-5%",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "linear-gradient(45deg, #ff6b6b, #feca57)",
    opacity: 0.6,
    filter: "blur(60px)",
    animation: "float 20s infinite ease-in-out",
  },
  shape2: {
    position: "absolute",
    bottom: "-10%",
    right: "-5%",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "linear-gradient(45deg, #48dbfb, #1dd1a1)",
    opacity: 0.5,
    filter: "blur(70px)",
    animation: "float 25s infinite ease-in-out reverse",
  },
  shape3: {
    position: "absolute",
    top: "40%",
    left: "50%",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "linear-gradient(45deg, #f368e0, #ee5a24)",
    opacity: 0.4,
    filter: "blur(50px)",
    animation: "float 18s infinite ease-in-out",
  },
  card: {
    width: "90%",
    maxWidth: "420px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "32px",
    padding: "40px 32px",
    boxShadow: "0 30px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset",
    zIndex: 10,
    animation: "fadeInUp 0.8s ease-out",
  },
  header: {
    textAlign: "center",
    marginBottom: "32px",
  },
  title: {
    fontSize: "2.4rem",
    fontWeight: "700",
    color: "white",
    marginBottom: "8px",
    letterSpacing: "-0.02em",
    textShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },
  subtitle: {
    fontSize: "1rem",
    color: "rgba(255,255,255,0.8)",
    fontWeight: "400",
  },
  errorMessage: {
    backgroundColor: "rgba(255, 100, 100, 0.2)",
    border: "1px solid rgba(255, 80, 80, 0.3)",
    borderRadius: "12px",
    padding: "12px 16px",
    marginBottom: "24px",
    color: "#fff",
    fontSize: "0.95rem",
    backdropFilter: "blur(4px)",
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: "24px",
  },
  label: {
    display: "block",
    fontSize: "0.9rem",
    fontWeight: "500",
    color: "rgba(255,255,255,0.9)",
    marginBottom: "6px",
    marginLeft: "8px",
  },
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "30px",
    padding: "0 16px",
    transition: "all 0.2s",
  },
  inputIcon: {
    fontSize: "1.2rem",
    marginRight: "10px",
    opacity: 0.7,
    color: "white",
  },
  input: {
    flex: 1,
    padding: "16px 0",
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    color: "white",
    fontSize: "1rem",
    fontWeight: "400",
    width: "100%",
  },
  eyeButton: {
    background: "none",
    border: "none",
    fontSize: "1.2rem",
    cursor: "pointer",
    padding: "8px",
    opacity: 0.7,
    color: "white",
    transition: "opacity 0.2s",
  },
  options: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
    fontSize: "0.9rem",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "rgba(255,255,255,0.8)",
    cursor: "pointer",
  },
  checkbox: {
    width: "18px",
    height: "18px",
    accentColor: "#667eea",
    cursor: "pointer",
  },
  forgotLink: {
    color: "rgba(255,255,255,0.9)",
    textDecoration: "none",
    borderBottom: "1px solid rgba(255,255,255,0.3)",
    transition: "border-color 0.2s",
  },
  button: {
    width: "100%",
    padding: "16px",
    backgroundColor: "#667eea",
    border: "none",
    borderRadius: "30px",
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "white",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
    transition: "transform 0.2s, box-shadow 0.2s",
    marginBottom: "24px",
  },
  buttonDisabled: {
    opacity: 0.7,
    cursor: "not-allowed",
    boxShadow: "none",
  },
  loader: {
    display: "inline-block",
    animation: "spin 1s linear infinite",
  },
  footer: {
    textAlign: "center",
    color: "rgba(255,255,255,0.7)",
    fontSize: "0.9rem",
  },
  signupLink: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
    borderBottom: "1px solid rgba(255,255,255,0.3)",
  },
};

// Add keyframe animations to the document
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(10px, -15px) scale(1.1); }
    50% { transform: translate(-10px, 20px) scale(0.9); }
    75% { transform: translate(15px, 10px) scale(1.05); }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-background-clip: text;
    -webkit-text-fill-color: white;
    transition: background-color 5000s ease-in-out 0s;
    box-shadow: inset 0 0 20px 20px rgba(255, 255, 255, 0.1);
  }
`;
document.head.appendChild(styleSheet);

export default Login;