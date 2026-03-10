import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStudents } from "../services/studentservice";
import { getCourses } from "../services/courseservice";

import DashboardLayout from "../components/ dashboard/ DashboardLayout.tsx";
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
                        background: "rgba(255, 255, 255, 0.05)",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        borderRadius: "40px",
                        padding: "1rem 3rem",
                        fontSize: "1.2rem",
                        fontWeight: 500,
                        color: "white",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                        marginTop: "2rem",
                        border: "none",
                    }}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background =
                            "rgba(255, 80, 100, 0.3)";
                        (e.currentTarget as HTMLButtonElement).style.transform =
                            "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background =
                            "rgba(255, 255, 255, 0.05)";
                        (e.currentTarget as HTMLButtonElement).style.transform =
                            "translateY(0)";
                    }}
                >
                    Logout
                </button>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;