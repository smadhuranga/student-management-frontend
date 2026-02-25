import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStudents } from "../services/studentservice";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const students = await getStudents();
      setTotalStudents(students.length);
    } catch (error) {
      console.error("Failed to load students", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      {/* Liquid glass styles */}
      <style>{`
        .dashboard-container {
          min-height: 100vh;
          background: linear-gradient(145deg, #f0f4fa 0%, #d9e2ef 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Animated liquid background effect */
        .dashboard-container::before {
          content: '';
          position: absolute;
          width: 200%;
          height: 200%;
          top: -50%;
          left: -50%;
          background: radial-gradient(circle at 30% 40%, rgba(255,255,255,0.3) 0%, transparent 30%),
                      radial-gradient(circle at 70% 60%, rgba(255,255,255,0.2) 0%, transparent 35%),
                      radial-gradient(circle at 10% 80%, rgba(255,255,255,0.15) 0%, transparent 40%);
          animation: liquidMove 20s infinite linear;
          z-index: 0;
        }

        @keyframes liquidMove {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(5deg) scale(1.05); }
          100% { transform: rotate(0deg) scale(1); }
        }

        .dashboard-title {
          font-size: 3rem;
          font-weight: 600;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #1e2b3a, #2c3e50);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 2px 10px rgba(0,0,0,0.05);
          margin-bottom: 3rem;
          position: relative;
          z-index: 1;
        }

        .cards-container {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
          justify-content: center;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .card {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 32px;
          box-shadow: 0 20px 40px -10px rgba(0, 20, 40, 0.2), inset 0 1px 1px rgba(255,255,255,0.6);
          padding: 2rem 2.5rem;
          min-width: 240px;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
          color: #1e2b3a;
        }

        .card:hover {
          transform: translateY(-6px);
          box-shadow: 0 30px 50px -15px rgba(0, 20, 40, 0.3), inset 0 1px 2px rgba(255,255,255,0.8);
          background: rgba(255, 255, 255, 0.35);
        }

        .card h2 {
          font-size: 1.5rem;
          font-weight: 500;
          margin-bottom: 1rem;
          letter-spacing: -0.01em;
          color: #1e2b3a;
        }

        .card .count {
          font-size: 4rem;
          font-weight: 700;
          line-height: 1;
          margin: 0.5rem 0;
          background: linear-gradient(150deg, #1e2b3a, #2c3e50);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .card-button {
          background: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.7);
          border-radius: 40px;
          padding: 0.75rem 2rem;
          font-size: 1rem;
          font-weight: 500;
          color: #1e2b3a;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          margin-top: 1rem;
          width: 100%;
        }

        .card-button:hover {
          background: rgba(255, 255, 255, 0.5);
          transform: scale(0.98);
          box-shadow: 0 6px 15px rgba(0,0,0,0.1);
        }

        .logout-button {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 40px;
          padding: 0.6rem 2.5rem;
          font-size: 1rem;
          font-weight: 500;
          color: #1e2b3a;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          margin-top: 3rem;
          position: relative;
          z-index: 1;
        }

        .logout-button:hover {
          background: rgba(255, 255, 255, 0.35);
          transform: translateY(-2px);
          box-shadow: 0 10px 20px -5px rgba(0,20,40,0.2);
        }

        @media (max-width: 640px) {
          .dashboard-title { font-size: 2rem; }
          .cards-container { gap: 1rem; }
          .card { padding: 1.5rem; min-width: 180px; }
        }
      `}</style>

      <div className="dashboard-container">
        <h1 className="dashboard-title">🎓 Student Management Dashboard</h1>

        <div className="cards-container">
          <div className="card">
            <h2>Total Students</h2>
            <p className="count">{totalStudents}</p>
          </div>

          <div className="card">
            <h2>Manage Students</h2>
            <button className="card-button" onClick={() => navigate("/students")}>
              Go to Students
            </button>
          </div>

          {/* System info card is commented out as in original */}
        </div>

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Dashboard;
