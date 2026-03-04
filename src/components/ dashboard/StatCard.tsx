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
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 32px;
          padding: 2rem 1.5rem;
          transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.3);
          cursor: ${onClick ? "pointer" : "default"};
        }

        .stat-card:hover {
          transform: translateY(-8px);
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255,255,255,0.3);
          box-shadow: 0 25px 40px -12px rgba(0,0,0,0.5);
        }

        .card-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          background: rgba(255,255,255,0.1);
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 40px;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .card-title {
          font-size: 1.3rem;
          font-weight: 500;
          color: rgba(255,255,255,0.9);
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