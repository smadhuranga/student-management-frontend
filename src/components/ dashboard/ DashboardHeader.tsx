// DashboardHeader.tsx
import React from "react";

type Props = {
    title?: string;
    subtitle?: string;
};

const DashboardHeader: React.FC<Props> = ({
                                              title = "Welcome back",
                                              subtitle = "Manage your students efficiently",
                                          }) => {
    return (
        <>
            <style>{`
        .header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .greeting {
          font-size: 3.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
          text-shadow: 0 4px 20px rgba(96, 165, 250, 0.3);
        }
        .subhead {
          font-size: 1.2rem;
          color: #94a3b8;
          font-weight: 400;
        }
        @media (max-width: 640px) {
          .greeting { font-size: 2.5rem; }
        }
      `}</style>

            <div className="header">
                <h1 className="greeting">{title}</h1>
                <p className="subhead">{subtitle}</p>
            </div>
        </>
    );
};

export default DashboardHeader;