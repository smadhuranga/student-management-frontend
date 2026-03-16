// DashboardStats.tsx
import React from "react";
import StatCard from "./StatCard";

type Props = {
    totalStudents: number;
    totalCourses: number;
    loading: boolean;
    onManageStudents: () => void;
    onManageCourses: () => void;
};

const DashboardStats: React.FC<Props> = ({
                                             totalStudents,
                                             totalCourses,
                                             loading,
                                             onManageStudents,
                                             onManageCourses,
                                         }) => {
    return (
        <>
            <style>{`
                .cards-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 2rem;
                    margin: 3rem 0;
                }

                .card-value {
                    font-size: 3.5rem;
                    font-weight: 700;
                    line-height: 1.2;
                    background: linear-gradient(145deg, #ffffff, #cbd5e1);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: 0.5rem;
                }

                .loading-placeholder {
                    font-size: 3rem;
                    font-weight: 700;
                    color: rgba(255,255,255,0.2);
                    animation: pulse 1.5s infinite;
                }

                @keyframes pulse {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 0.8; }
                }

                @media (max-width: 640px) {
                    .cards-grid { gap: 1rem; }
                }
            `}</style>

            <div className="cards-grid">
                <StatCard icon="👥" title="Total Students" onClick={onManageStudents}>
                    {loading ? (
                        <div className="loading-placeholder">...</div>
                    ) : (
                        <div className="card-value">{totalStudents}</div>
                    )}
                    <div style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
                        enrolled
                    </div>
                </StatCard>

                <StatCard icon="📚" title="Total Courses" onClick={onManageCourses}>
                    {loading ? (
                        <div className="loading-placeholder">...</div>
                    ) : (
                        <div className="card-value">{totalCourses}</div>
                    )}
                    <div style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
                        available
                    </div>
                </StatCard>
            </div>
        </>
    );
};

export default DashboardStats;