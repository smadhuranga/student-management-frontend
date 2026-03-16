import React from "react";

type Props = {
    title?: string;
    onBack: () => void;
};

const StudentsHeader: React.FC<Props> = ({title = "🎓 Student Portal", onBack}) => {
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700&display=swap');

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
          padding: 0 36px;
          box-sizing: border-box;
        }

        .title {
          font-family: 'Poppins', sans-serif;
          font-size: 2.35rem;
          font-weight: 700;
          background: linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
          letter-spacing: -0.02em;
          text-shadow: 0 4px 20px rgba(96, 165, 250, 0.3);
        }

        .backBtn {
          font-family: 'Inter', sans-serif;
          padding: 12px 24px;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 999px;
          font-size: 1rem;
          font-weight: 600;
          color: #e2e8f0;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 10px 25px -8px rgba(0, 0, 0, 0.4);
        }
        .backBtn:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-2px);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 15px 30px -8px rgba(0, 0, 0, 0.5);
        }

        @media (max-width: 640px) {
          .title { font-size: 1.85rem; }
          .header { padding: 0 24px; }
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