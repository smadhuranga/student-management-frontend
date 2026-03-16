// Dashboard.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStudents } from "../services/studentservice";
import { getCourses } from "../services/courseservice";

import DashboardLayout from "../components/ dashboard/ DashboardLayout";
import DashboardHeader from "../components/ dashboard/ DashboardHeader";
import DashboardStats from "../components/ dashboard/ DashboardStats";

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [totalStudents, setTotalStudents] = useState(0);
    const [totalCourses, setTotalCourses] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            await loadData();
        })();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const students = await getStudents();
            const courses = await getCourses();
            setTotalStudents(students.length);
            setTotalCourses(courses.length);
        } catch (error) {
            console.error("Failed to load dashboard data", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <DashboardLayout>
            <DashboardHeader />

            <DashboardStats
                totalStudents={totalStudents}
                totalCourses={totalCourses}
                loading={loading}
                onManageStudents={() => navigate("/students")}
                onManageCourses={() => navigate("/courses")}
            />

            <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                    onClick={handleLogout}
                    style={{
                        background: "linear-gradient(135deg, #475569 0%, #1e293b 100%)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "40px",
                        padding: "0.9rem 3rem",
                        fontSize: "1.1rem",
                        fontWeight: 500,
                        color: "#f1f5f9",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        boxShadow: "0 10px 25px -8px rgba(0, 0, 0, 0.4)",
                        marginTop: "2rem",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "linear-gradient(135deg, #5f6b7a, #2d3748)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 15px 30px -8px rgba(0, 0, 0, 0.5)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "linear-gradient(135deg, #475569 0%, #1e293b 100%)";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 10px 25px -8px rgba(0, 0, 0, 0.4)";
                    }}
                >
                    Logout
                </button>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;