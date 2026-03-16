// LoginStyles.ts – modern dark theme matching dashboard
import type React from "react";

export const ensureLoginKeyframes = () => {
    const id = "login-modern-styles";
    if (document.getElementById(id)) return;

    const styleSheet = document.createElement("style");
    styleSheet.id = id;
    styleSheet.textContent = `
    @keyframes float {
      0%, 100% { transform: translate(0, 0) scale(1); }
      25% { transform: translate(8px, -10px) scale(1.02); }
      50% { transform: translate(-6px, 12px) scale(0.98); }
      75% { transform: translate(10px, 6px) scale(1.01); }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(12px); }
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
      -webkit-text-fill-color: #e2e8f0;
      transition: background-color 5000s ease-in-out 0s;
      box-shadow: inset 0 0 20px 20px #0f172a;
    }
  `;
    document.head.appendChild(styleSheet);
};

export const loginStyles: { [key: string]: React.CSSProperties } = {
    // Main container – dark gradient background
    container: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        padding: "24px",
        background: "linear-gradient(145deg, #0b1120 0%, #192132 100%)",
        fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    },

    // Subtle grid – barely visible on dark
    bgGrid: {
        position: "absolute",
        inset: 0,
        backgroundImage:
            "linear-gradient(rgba(96, 165, 250, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(96, 165, 250, 0.05) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        maskImage:
            "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 80%)",
        WebkitMaskImage:
            "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 80%)",
        pointerEvents: "none",
    },

    // Soft glow accents (matching dashboard blobs)
    glowTopLeft: {
        position: "absolute",
        top: "-200px",
        left: "-200px",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(96, 165, 250, 0.2), transparent 70%)",
        filter: "blur(90px)",
        pointerEvents: "none",
    },

    glowBottomRight: {
        position: "absolute",
        bottom: "-200px",
        right: "-200px",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(167, 139, 250, 0.15), transparent 70%)",
        filter: "blur(90px)",
        pointerEvents: "none",
    },

    // Floating orbs – very subtle (like dashboard blobs)
    orb1: {
        position: "absolute",
        top: "5%",
        left: "10%",
        width: "300px",
        height: "300px",
        borderRadius: "999px",
        background: "radial-gradient(circle, rgba(96,165,250,0.1), transparent 70%)",
        filter: "blur(90px)",
        animation: "float 18s infinite ease-in-out",
        pointerEvents: "none",
    },

    orb2: {
        position: "absolute",
        bottom: "10%",
        right: "5%",
        width: "350px",
        height: "350px",
        borderRadius: "999px",
        background: "radial-gradient(circle, rgba(167,139,250,0.08), transparent 70%)",
        filter: "blur(90px)",
        animation: "float 22s infinite ease-in-out reverse",
        pointerEvents: "none",
    },

    orb3: {
        position: "absolute",
        top: "40%",
        left: "60%",
        width: "250px",
        height: "250px",
        borderRadius: "999px",
        background: "radial-gradient(circle, rgba(244,114,182,0.06), transparent 70%)",
        filter: "blur(90px)",
        animation: "float 16s infinite ease-in-out",
        pointerEvents: "none",
    },

    // Card – glass panel with blur
    card: {
        width: "100%",
        maxWidth: "440px",
        background: "rgba(17, 25, 40, 0.6)",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        borderRadius: "48px",
        padding: "32px 32px",
        boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.6), inset 0 1px 2px rgba(255,255,255,0.05)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        position: "relative",
        zIndex: 5,
        animation: "fadeIn 0.4s ease-out",
        color: "#fff",
    },

    // Accent line – gradient (from dashboard header)
    accentLine: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        background: "linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6)",
        borderTopLeftRadius: "48px",
        borderTopRightRadius: "48px",
    },

    header: {
        textAlign: "left",
        marginBottom: "24px",
    },

    brandRow: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "16px",
    },

    brandDot: {
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
        boxShadow: "0 0 0 4px rgba(96, 165, 250, 0.3)",
    },

    brandText: {
        fontSize: "0.9rem",
        color: "#94a3b8",
        fontWeight: 600,
        letterSpacing: "0.02em",
        textTransform: "uppercase",
    },

    title: {
        fontSize: "2rem",
        fontWeight: 700,
        color: "#fff",
        margin: 0,
        letterSpacing: "-0.02em",
    },

    subtitle: {
        fontSize: "1rem",
        color: "#94a3b8",
        marginTop: "8px",
        marginBottom: 0,
        lineHeight: 1.5,
    },

    errorMessage: {
        background: "rgba(239, 68, 68, 0.1)",
        border: "1px solid rgba(239, 68, 68, 0.3)",
        borderRadius: "16px",
        padding: "12px 14px",
        marginBottom: "20px",
        color: "#f87171",
        fontSize: "0.95rem",
        textAlign: "center",
    },

    inputGroup: {
        marginBottom: "18px",
    },

    label: {
        display: "block",
        fontSize: "0.9rem",
        fontWeight: 600,
        color: "#e2e8f0",
        marginBottom: "6px",
        marginLeft: "4px",
    },

    inputShell: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "40px",
        padding: "8px 16px",
        transition: "border-color 0.2s, box-shadow 0.2s",
        boxShadow: "0 10px 25px -8px rgba(0, 0, 0, 0.4)",
    },

    leadingIcon: {
        fontSize: "1.2rem",
        color: "#94a3b8",
        width: "24px",
        display: "flex",
        justifyContent: "center",
    },

    input: {
        flex: 1,
        padding: "10px 4px",
        backgroundColor: "transparent",
        border: "none",
        outline: "none",
        color: "#fff",
        fontSize: "1rem",
        fontWeight: 400,
        width: "100%",

    },

    eyeButton: {
        background: "transparent",
        border: "none",
        borderRadius: "12px",
        cursor: "pointer",
        padding: "8px 8px",
        color: "#94a3b8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.2s",
    },

    button: {
        width: "100%",
        marginTop: "16px",
        padding: "14px 16px",
        borderRadius: "999px",
        border: "none",
        background: "linear-gradient(135deg, #475569 0%, #1e293b 100%)",
        color: "#fff",
        fontSize: "1.05rem",
        fontWeight: 600,
        cursor: "pointer",
        boxShadow: "0 10px 25px -8px rgba(0, 0, 0, 0.4)",
        position: "relative",
        overflow: "hidden",
        transition: "opacity 0.2s",
    },

    buttonDisabled: {
        opacity: 0.5,
        cursor: "not-allowed",
        boxShadow: "none",
    },

    buttonShimmer: {
        position: "absolute",
        inset: 0,
        background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
        width: "40%",
        transform: "translateX(-120%) skewX(-15deg)",
        animation: "shimmer 2.2s infinite",
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
        border: "2px solid rgba(255,255,255,0.3)",
        borderTopColor: "#fff",
        animation: "spin 0.8s linear infinite",
        display: "inline-block",
    },

    footer: {
        marginTop: "20px",
        textAlign: "center",
        fontSize: "0.9rem",
        color: "#94a3b8",
    },

    footerText: {
        fontWeight: 600,
        color: "#e2e8f0",
    },

    footerMuted: {
        color: "#64748b",
    },
};