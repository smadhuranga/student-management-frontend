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
        .header { text-align: center; margin-bottom: 3rem; }
        .greeting {
          font-size: 3.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #fff8e7, #ffe6b0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
          text-shadow: 0 2px 15px rgba(0,0,0,0.2);
        }
        .subhead {
          font-size: 1.2rem;
          color: rgba(255,255,255,0.7);
          font-weight: 300;
        }
        @media (max-width: 640px) {
          .greeting { font-size: 2.2rem; }
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