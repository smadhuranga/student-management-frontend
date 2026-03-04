import React from "react";

type Props = {
    children: React.ReactNode;
};

const DashboardLayout: React.FC<Props> = ({ children }) => {
    return (
        <>
            <style>{`
        .dashboard-wrapper {
          min-height: 100vh;
          background: linear-gradient(125deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          z-index: 0;
          animation: float 20s infinite ease-in-out;
        }

        .blob1 {
          width: 500px;
          height: 500px;
          background: linear-gradient(135deg, #ff6ec4, #7873f5);
          top: -200px;
          left: -200px;
          animation-delay: 0s;
        }

        .blob2 {
          width: 600px;
          height: 600px;
          background: linear-gradient(135deg, #3b9ae1, #9750dd);
          bottom: -300px;
          right: -200px;
          animation-delay: 5s;
        }

        .blob3 {
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, #f093fb, #f5576c);
          top: 40%;
          left: 30%;
          animation-delay: 10s;
          opacity: 0.6;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(50px, -30px) scale(1.1); }
          50% { transform: translate(-20px, 50px) scale(0.9); }
          75% { transform: translate(30px, 20px) scale(1.05); }
        }

        .glass-panel {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1200px;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 48px;
          padding: 3rem 2rem;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255,255,255,0.2);
          animation: fadeIn 0.8s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Responsive */
        @media (max-width: 640px) {
          .glass-panel { padding: 2rem 1rem; }
        }
      `}</style>

            <div className="dashboard-wrapper">
                <div className="blob blob1"></div>
                <div className="blob blob2"></div>
                <div className="blob blob3"></div>

                <div className="glass-panel">{children}</div>
            </div>
        </>
    );
};

export default DashboardLayout;