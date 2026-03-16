// StatCard.tsx
import React from "react";

type Props = {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
    onClick?: () => void;
};

const StatCard: React.FC<Props> = ({ icon, title, children, onClick }) => {
    return (
        <>
            <style>{`
        .stat-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 32px;
          padding: 2rem 1.5rem;
          transition: all 0.25s ease;
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.5);
          cursor: ${onClick ? "pointer" : "default"};
        }

        .stat-card:hover {
          transform: translateY(-6px);
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.15);
          box-shadow: 0 25px 45px -12px rgba(0, 0, 0, 0.7);
        }

        .card-icon {
          font-size: 2.8rem;
          margin-bottom: 1.2rem;
          background: rgba(255, 255, 255, 0.05);
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 40px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .card-title {
          font-size: 1.3rem;
          font-weight: 500;
          color: #e2e8f0;
          margin-bottom: 0.75rem;
        }
      `}</style>

            <div className="stat-card" onClick={onClick}>
                <div className="card-icon">{icon}</div>
                <h2 className="card-title">{title}</h2>
                {children}
            </div>
        </>
    );
};

export default StatCard;