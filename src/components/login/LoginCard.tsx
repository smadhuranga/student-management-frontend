// LoginCard.tsx (unchanged structure, only styles are updated via the imported object)
import React from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {loginStyles as styles} from "./LoginStyles";

type Props = {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    showPassword: boolean;
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;
    error: string;
    onLogin: () => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
};

const LoginCard: React.FC<Props> = ({
                                        name,
                                        setName,
                                        password,
                                        setPassword,
                                        showPassword,
                                        setShowPassword,
                                        loading,
                                        error,
                                        onLogin,
                                        onKeyDown,
                                    }) => {
    return (
        <div style={styles.card}>


            <div style={styles.header}>
                <div style={styles.brandRow}>
                    <div style={styles.brandDot}/>
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
                        onKeyDown={onKeyDown}
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
                        onKeyDown={onKeyDown}
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
                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                    </button>
                </div>
            </div>

            <button
                onClick={onLogin}
                style={{...styles.button, ...(loading ? styles.buttonDisabled : {})}}
                disabled={loading}
            >
                {loading ? (
                    <span style={styles.loadingRow}>
            <span style={styles.spinner}/>
            Signing in...
          </span>
                ) : (
                    "Sign In"
                )}
                <span style={styles.buttonShimmer}/>
            </button>

            {/*<div style={styles.footer}>*/}
            {/*    <span style={styles.footerText}>Tip:</span>{" "}*/}
            {/*    <span style={styles.footerMuted}>Press Enter to sign in faster.</span>*/}
            {/*</div>*/}
        </div>
    );
};

export default LoginCard;