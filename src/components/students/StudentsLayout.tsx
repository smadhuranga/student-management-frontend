import React from "react";

type Props = { children: React.ReactNode };

const StudentsLayout: React.FC<Props> = ({children}) => {
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .students-page {
          min-height: 100vh;
          padding: 40px 20px;

          background:
            radial-gradient(1200px 800px at 10% 10%, rgba(109,40,217,.25), transparent 55%),
            radial-gradient(1200px 800px at 90% 20%, rgba(37,99,235,.22), transparent 55%),
            linear-gradient(135deg, #070816 0%, #101a3b 45%, #0a0b14 100%);

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
          animation: float 22s infinite ease-in-out;
          opacity: .85;
        }

        .blob1 {
          width: 620px;
          height: 620px;
          background: radial-gradient(circle at 30% 30%, rgba(255,110,196,.55), rgba(120,115,245,.18));
          top: -220px;
          left: -240px;
          animation-delay: 0s;
        }

        .blob2 {
          width: 760px;
          height: 760px;
          background: radial-gradient(circle at 40% 40%, rgba(59,154,225,.45), rgba(151,80,221,.14));
          bottom: -340px;
          right: -260px;
          animation-delay: 6s;
        }

        .blob3 {
          width: 520px;
          height: 520px;
          background: radial-gradient(circle at 35% 35%, rgba(240,147,251,.45), rgba(245,87,108,.14));
          top: 42%;
          left: 28%;
          animation-delay: 12s;
          opacity: 0.55;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(55px, -35px) scale(1.08); }
          50% { transform: translate(-25px, 55px) scale(0.92); }
          75% { transform: translate(35px, 25px) scale(1.04); }
        }

        .glassCard {
          width: 100%;
          max-width: 1200px;

          background: linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.04));
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);

          border: 1px solid rgba(255, 255, 255, 0.10);
          border-radius: 32px;

          padding: 30px;
          margin-bottom: 34px;

          box-shadow:
            0 34px 70px rgba(0,0,0,0.34),
            inset 0 1px 2px rgba(255,255,255,0.08);

          z-index: 10;
          animation: fadeInUp 0.6s ease-out;
          box-sizing: border-box;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(26px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .cardTitle {
          font-size: 1.6rem;
          font-weight: 700;
          color: rgba(255,255,255,.94);
          margin-top: 0;
          margin-bottom: 22px;
          letter-spacing: -0.01em;
          display: flex;
          align-items: center;
          gap: 10px;
          text-shadow: 0 10px 24px rgba(0,0,0,.25);
        }

        @media (max-width: 640px) {
          .glassCard { padding: 22px; border-radius: 28px; }
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