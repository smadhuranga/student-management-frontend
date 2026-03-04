import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authservice";
import Swal from "sweetalert2";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login: React.FC = () => {
    const navigate = useNavigate();

    // ✅ Keep same state names (no breaking changes)
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ✅ Add keyframes once
    useMemo(() => {
        const id = "login-modern-styles";
        if (document.getElementById(id)) return;

        const styleSheet = document.createElement("style");
        styleSheet.id = id;
        styleSheet.textContent = `
      @keyframes float {
        0%, 100% { transform: translate(0, 0) scale(1); }
        25% { transform: translate(14px, -18px) scale(1.08); }
        50% { transform: translate(-10px, 22px) scale(0.95); }
        75% { transform: translate(18px, 10px) scale(1.05); }
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(18px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes shimmer {
        0% { transform: translateX(-120%) skewX(-15deg); }
        100% { transform: translateX(220%) skewX(-15deg); }
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
        box-shadow: inset 0 0 20px 20px rgba(255, 255, 255, 0.08);
      }
    `;
        document.head.appendChild(styleSheet);
    }, []);

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
        <div style={styles.container}>
            {/* Background grid + glow */}
            <div style={styles.bgGrid} />
            <div style={styles.glowTopLeft} />
            <div style={styles.glowBottomRight} />

            {/* Floating orbs */}
            <div style={styles.orb1} />
            <div style={styles.orb2} />
            <div style={styles.orb3} />

            {/* Card */}
            <div style={styles.card}>
                {/* Accent line */}
                <div style={styles.accentLine} />

                <div style={styles.header}>
                    <div style={styles.brandRow}>
                        <div style={styles.brandDot} />
                        <span style={styles.brandText}>Student Portal</span>
                    </div>

                    <h1 style={styles.title}>Sign in</h1>
                    <p style={styles.subtitle}>Access your Students Dashboard securely</p>
                </div>

                {error && <div style={styles.errorMessage}>{error}</div>}

                <div style={styles.inputGroup}>
                    <label style={styles.label}>Username</label>
                    <div style={styles.inputShell}>
                        <span style={styles.leadingIcon}>👤</span>
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
                    <div style={styles.inputShell}>
                        <span style={styles.leadingIcon}>🔒</span>
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
                            disabled={loading}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </button>
                    </div>
                </div>

                <button
                    onClick={handleLogin}
                    style={{ ...styles.button, ...(loading ? styles.buttonDisabled : {}) }}
                    disabled={loading}
                >
                    {loading ? (
                        <span style={styles.loadingRow}>
              <span style={styles.spinner} />
              Signing in...
            </span>
                    ) : (
                        "Sign In"
                    )}
                    <span style={styles.buttonShimmer} />
                </button>

                <div style={styles.footer}>
                    <span style={styles.footerText}>Tip:</span>{" "}
                    <span style={styles.footerMuted}>Press Enter to sign in faster.</span>
                </div>
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
        position: "relative",
        overflow: "hidden",
        padding: "24px",
        background:
            "radial-gradient(1200px 600px at 15% 10%, rgba(124, 92, 255, 0.35), transparent 55%)," +
            "radial-gradient(900px 600px at 85% 90%, rgba(0, 208, 255, 0.25), transparent 55%)," +
            "linear-gradient(135deg, #060818 0%, #11153a 45%, #0b1026 100%)",
        fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    },

    bgGrid: {
        position: "absolute",
        inset: 0,
        backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
        maskImage:
            "radial-gradient(circle at 50% 35%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)",
        WebkitMaskImage:
            "radial-gradient(circle at 50% 35%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)",
        opacity: 0.55,
        pointerEvents: "none",
    },

    glowTopLeft: {
        position: "absolute",
        top: "-220px",
        left: "-240px",
        width: "520px",
        height: "520px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(132, 92, 255, 0.55), transparent 60%)",
        filter: "blur(30px)",
        opacity: 0.9,
        pointerEvents: "none",
    },

    glowBottomRight: {
        position: "absolute",
        bottom: "-260px",
        right: "-260px",
        width: "620px",
        height: "620px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0, 220, 255, 0.35), transparent 60%)",
        filter: "blur(34px)",
        opacity: 0.9,
        pointerEvents: "none",
    },

    orb1: {
        position: "absolute",
        top: "-10%",
        left: "8%",
        width: "420px",
        height: "420px",
        borderRadius: "999px",
        background: "linear-gradient(135deg, rgba(255, 110, 196, 0.55), rgba(120, 115, 245, 0.4))",
        filter: "blur(70px)",
        opacity: 0.55,
        animation: "float 22s infinite ease-in-out",
        pointerEvents: "none",
    },

    orb2: {
        position: "absolute",
        bottom: "-12%",
        right: "6%",
        width: "520px",
        height: "520px",
        borderRadius: "999px",
        background: "linear-gradient(135deg, rgba(59, 154, 225, 0.45), rgba(151, 80, 221, 0.45))",
        filter: "blur(80px)",
        opacity: 0.45,
        animation: "float 26s infinite ease-in-out reverse",
        pointerEvents: "none",
    },

    orb3: {
        position: "absolute",
        top: "42%",
        left: "48%",
        width: "320px",
        height: "320px",
        borderRadius: "999px",
        background: "linear-gradient(135deg, rgba(240, 147, 251, 0.38), rgba(245, 87, 108, 0.32))",
        filter: "blur(65px)",
        opacity: 0.38,
        animation: "float 18s infinite ease-in-out",
        pointerEvents: "none",
    },

    card: {
        width: "100%",
        maxWidth: "440px",
        background:
            "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))",
        border: "1px solid rgba(255,255,255,0.16)",
        borderRadius: "28px",
        padding: "30px 28px",
        boxShadow:
            "0 22px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.15)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        position: "relative",
        zIndex: 5,
        overflow: "hidden",
        animation: "fadeIn 0.6s ease-out",
    },

    accentLine: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        background:
            "linear-gradient(90deg, rgba(124,92,255,1), rgba(0,220,255,1), rgba(255,110,196,1))",
        opacity: 0.95,
    },

    header: {
        textAlign: "left",
        marginBottom: "22px",
    },

    brandRow: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "14px",
    },

    brandDot: {
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #7c5cff, #00dcff)",
        boxShadow: "0 0 0 6px rgba(124,92,255,0.15)",
    },

    brandText: {
        fontSize: "0.95rem",
        color: "rgba(255,255,255,0.8)",
        fontWeight: 600,
        letterSpacing: "0.02em",
    },

    title: {
        fontSize: "2.1rem",
        fontWeight: 750,
        color: "white",
        margin: 0,
        letterSpacing: "-0.02em",
        textShadow: "0 10px 22px rgba(0,0,0,0.35)",
    },

    subtitle: {
        fontSize: "1rem",
        color: "rgba(255,255,255,0.75)",
        marginTop: "10px",
        marginBottom: 0,
        lineHeight: 1.5,
    },

    errorMessage: {
        background: "rgba(255, 72, 92, 0.18)",
        border: "1px solid rgba(255, 72, 92, 0.28)",
        borderRadius: "14px",
        padding: "12px 14px",
        marginBottom: "18px",
        color: "rgba(255,255,255,0.95)",
        fontSize: "0.95rem",
        textAlign: "center",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
    },

    inputGroup: {
        marginBottom: "16px",
    },

    label: {
        display: "block",
        fontSize: "0.9rem",
        fontWeight: 600,
        color: "rgba(255,255,255,0.9)",
        marginBottom: "8px",
        marginLeft: "6px",
    },

    inputShell: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        background:
            "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.06))",
        border: "1px solid rgba(255,255,255,0.16)",
        borderRadius: "16px",
        padding: "10px 12px",
        boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
        transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
    },

    leadingIcon: {
        fontSize: "1.1rem",
        opacity: 0.85,
        color: "white",
        width: "26px",
        display: "flex",
        justifyContent: "center",
    },

    input: {
        flex: 1,
        padding: "12px 4px",
        backgroundColor: "transparent",
        border: "none",
        outline: "none",
        color: "white",
        fontSize: "1rem",
        fontWeight: 500,
        width: "100%",
    },

    eyeButton: {
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.14)",
        borderRadius: "12px",
        cursor: "pointer",
        padding: "8px 10px",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.9,
    },

    button: {
        width: "100%",
        marginTop: "10px",
        padding: "14px 16px",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.16)",
        background:
            "linear-gradient(135deg, rgba(124,92,255,1) 0%, rgba(0,220,255,0.95) 55%, rgba(255,110,196,0.95) 100%)",
        color: "white",
        fontSize: "1.05rem",
        fontWeight: 750,
        cursor: "pointer",
        boxShadow: "0 16px 30px rgba(0,0,0,0.35)",
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
    },

    buttonDisabled: {
        opacity: 0.7,
        cursor: "not-allowed",
        boxShadow: "none",
    },

    buttonShimmer: {
        position: "absolute",
        inset: 0,
        background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
        width: "40%",
        transform: "translateX(-120%) skewX(-15deg)",
        animation: "shimmer 2.2s infinite",
        opacity: 0.6,
        pointerEvents: "none",
    },

    loadingRow: {
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
    },

    spinner: {
        width: "18px",
        height: "18px",
        borderRadius: "999px",
        border: "2px solid rgba(255,255,255,0.55)",
        borderTopColor: "rgba(255,255,255,0.95)",
        animation: "spin 0.9s linear infinite",
        display: "inline-block",
    },

    footer: {
        marginTop: "16px",
        textAlign: "center",
        fontSize: "0.9rem",
        color: "rgba(255,255,255,0.75)",
    },

    footerText: {
        fontWeight: 700,
        color: "rgba(255,255,255,0.9)",
    },

    footerMuted: {
        color: "rgba(255,255,255,0.7)",
    },
};

export default Login;