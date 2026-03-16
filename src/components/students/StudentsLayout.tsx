import React from "react";

type Props = { children: React.ReactNode };

const StudentsLayout: React.FC<Props> = ({children}) => {
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        .students-page {
          min-height: 100vh;
          padding: 40px 20px;
          background: linear-gradient(145deg, #0b1120 0%, #192132 100%);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          z-index: 0;
          animation: float 25s infinite alternate ease-in-out;
        }

        .blob1 {
          width: 500px;
          height: 500px;
          background: rgba(96, 165, 250, 0.2);
          top: -200px;
          left: -200px;
        }

        .blob2 {
          width: 600px;
          height: 600px;
          background: rgba(167, 139, 250, 0.15);
          bottom: -300px;
          right: -200px;
          animation-delay: 5s;
        }

        .blob3 {
          width: 400px;
          height: 400px;
          background: rgba(244, 114, 182, 0.1);
          top: 40%;
          left: 30%;
          animation-delay: 10s;
        }

        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(40px, -40px) scale(1.1); }
        }

        .glassCard {
          width: 100%;
          max-width: 1200px;
          background: rgba(17, 25, 40, 0.6);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 48px;
          padding: 30px;
          margin-bottom: 34px;
          box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.6), inset 0 1px 2px rgba(255,255,255,0.05);
          z-index: 10;
          animation: fadeIn 0.7s ease-out;
          box-sizing: border-box;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .cardTitle {
          font-family: 'Poppins', sans-serif;
          font-size: 1.8rem;
          font-weight: 700;
          background: linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0 0 22px 0;
          letter-spacing: -0.02em;
          text-shadow: 0 4px 20px rgba(96, 165, 250, 0.3);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        @media (max-width: 640px) {
          .glassCard { padding: 22px; border-radius: 32px; }
          .cardTitle { font-size: 1.5rem; }
        }
      `}</style>

            <div className="students-page">
                <div className="blob blob1"></div>
                <div className="blob blob2"></div>
                <div className="blob blob3"></div>

                {children}
            </div>
        </>
    );
};

export default StudentsLayout;