import React from "react";

type Props = {
    title?: string;
    onBack: () => void;
};

const StudentsHeader: React.FC<Props> = ({title = "🎓 Student Portal", onBack}) => {
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700&display=swap');

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 1200px;
          margin-bottom: 30px;
          flex-wrap: wrap;
          gap: 14px;
          position: relative;
          z-index: 10;
          padding-left: 36px;
          padding-right: 36px;
          box-sizing: border-box;
        }

        .title {
          font-family: 'Poppins', sans-serif;
          font-size: 2.35rem;
          font-weight: 700;
          color: rgba(255,255,255,.95);
          margin: 0;
          letter-spacing: -0.02em;
          text-shadow: 0 10px 28px rgba(0,0,0,.35);
        }

        .backBtn {
          font-family: 'Inter', sans-serif;
          padding: 12px 20px;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 999px;
          font-size: 0.98rem;
          font-weight: 600;
          color: rgba(255,255,255,.92);
          cursor: pointer;
          box-shadow: 0 12px 30px rgba(0,0,0,0.22);
          transition: transform 0.12s ease, background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .backBtn:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.22);
          box-shadow: 0 16px 40px rgba(0,0,0,0.28);
          transform: translateY(-1px);
        }

        .backBtn:active {
          transform: translateY(0px);
        }

        @media (max-width: 640px) {
          .title { font-size: 1.85rem; }
          .header { padding-left: 24px; padding-right: 24px; }
        }
      `}</style>

            <div className="header">
                <h1 className="title">{title}</h1>
                <button className="backBtn" onClick={onBack}>
                    ← Dashboard
                </button>
            </div>
        </>
    );
};

export default StudentsHeader;