import React from "react";

type Props = {
    title?: string;
    onBack: () => void;
};

const StudentsHeader: React.FC<Props> = ({title = "🎓 Student Portal", onBack}) => {
    return (
        <>
            <style>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 1200px;
          margin-bottom: 30px;
          flex-wrap: wrap;
          gap: 15px;
          position: relative;
          z-index: 10;
          padding-left: 36px;
          padding-right: 36px;
          box-sizing: border-box;
        }

        .title {
          font-size: 2.8rem;
          font-weight: 700;
          background: linear-gradient(145deg, #fff8e7, #ffe6b0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
          letter-spacing: -0.02em;
          text-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }

        .backBtn {
          padding: 12px 28px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 40px;
          font-size: 1rem;
          font-weight: 500;
          color: white;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
        }

        .backBtn:hover {
          background: rgba(255,255,255,0.2);
          transform: translateY(-2px);
          border-color: rgba(255,255,255,0.4);
        }

        @media (max-width: 640px) {
          .title { font-size: 2rem; }
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