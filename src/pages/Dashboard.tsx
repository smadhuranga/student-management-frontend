import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getStudents} from "../services/studentservice";

const Dashboard: React.FC = () => {

    const navigate = useNavigate();
    const [totalStudents, setTotalStudents] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStudents();
    }, []);

    // Function to load students and update the total count
    const loadStudents = async () => {
        setLoading(true);
        try {
            const students = await getStudents();
            setTotalStudents(students.length);
        } catch (error) {
            console.error("Failed to load students", error);
        } finally {
            setLoading(false);
        }
    };

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <>
            <style>{`
        .dashboard-wrapper {
          min-height: 100vh;
          background: linear-gradient(125deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Animated background blobs */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          z-index: 0;
          animation: float 20s infinite ease-in-out;
        }

        .blob1 {
          width: 500px;
          height: 500px;
          background: linear-gradient(135deg, #ff6ec4, #7873f5);
          top: -200px;
          left: -200px;
          animation-delay: 0s;
        }

        .blob2 {
          width: 600px;
          height: 600px;
          background: linear-gradient(135deg, #3b9ae1, #9750dd);
          bottom: -300px;
          right: -200px;
          animation-delay: 5s;
        }

        .blob3 {
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, #f093fb, #f5576c);
          top: 40%;
          left: 30%;
          animation-delay: 10s;
          opacity: 0.6;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(50px, -30px) scale(1.1); }
          50% { transform: translate(-20px, 50px) scale(0.9); }
          75% { transform: translate(30px, 20px) scale(1.05); }
        }

        .glass-panel {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1200px;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 48px;
          padding: 3rem 2rem;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255,255,255,0.2);
          animation: fadeIn 0.8s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .header {
          text-align: center;
          margin-bottom: 3rem;
        }

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

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }

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

        .card-value {
          font-size: 3.5rem;
          font-weight: 700;
          line-height: 1.2;
          background: linear-gradient(145deg, #fff, #f0e6ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
        }

        .loading-placeholder {
          font-size: 3rem;
          font-weight: 700;
          color: rgba(255,255,255,0.3);
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .action-card {
          background: linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02));
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 32px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: white;
          text-decoration: none;
        }

        .action-card:hover {
          background: rgba(255,255,255,0.15);
          border-color: rgba(255,255,255,0.4);
          transform: scale(1.02);
        }

        .action-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .action-label {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .action-desc {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.7);
        }

        .logout-btn {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 40px;
          padding: 1rem 3rem;
          font-size: 1.2rem;
          font-weight: 500;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
          margin-top: 2rem;
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          border: none;
        }

        .logout-btn:hover {
          background: rgba(255, 80, 100, 0.3);
          border-color: rgba(255, 100, 120, 0.5);
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(255, 80, 100, 0.3);
        }

        .logout-btn:active {
          transform: translateY(0);
        }

        /* Responsive */
        @media (max-width: 640px) {
          .greeting { font-size: 2.2rem; }
          .glass-panel { padding: 2rem 1rem; }
          .cards-grid { gap: 1rem; }
        }
      `}</style>

            <div className="dashboard-wrapper">
                {/* Animated background blobs */}
                <div className="blob blob1"></div>
                <div className="blob blob2"></div>
                <div className="blob blob3"></div>

                {/* Main glass panel */}
                <div className="glass-panel">
                    <div className="header">
                        <h1 className="greeting">Welcome back</h1>
                        <p className="subhead">Manage your students efficiently</p>
                    </div>

                    {/* Cards grid */}
                    <div className="cards-grid">
                        {/* Total Students Card */}
                        <div className="stat-card">
                            <div className="card-icon">👥</div>
                            <h2 className="card-title">Total Students</h2>
                            {loading ? (
                                <div className="loading-placeholder">...</div>
                            ) : (
                                <div className="card-value">{totalStudents}</div>
                            )}
                            <div style={{color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem'}}>
                                enrolled
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="stat-card" onClick={() => navigate("/students")} style={{cursor: 'pointer'}}>
                            <div className="card-icon">📋</div>
                            <h2 className="card-title">Manage Students</h2>
                            <div style={{fontSize: '1.2rem', marginTop: '0.5rem'}}>→</div>
                            <div style={{color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginTop: '0.5rem'}}>
                                View, add, edit, delete
                            </div>
                        </div>

                        {/* Additional card: System Status (example) */}
                        <div className="stat-card">
                            <div className="card-icon">⚙️</div>
                            <h2 className="card-title">System Status</h2>
                            <div style={{fontSize: '1rem', color: '#aaffaa'}}>● Online</div>
                            <div style={{color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginTop: '0.5rem'}}>
                                All services operational
                            </div>
                        </div>
                    </div>

                    {/* Logout button */}
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button className="logout-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;