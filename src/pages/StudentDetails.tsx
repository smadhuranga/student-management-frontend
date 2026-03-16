import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import type { Student } from "../types/Student";
import type { StudentEnrolledCourse } from "../types/StudentEnrolledCourse";
import { getStudentById } from "../services/studentservice";
import { getEnrollmentDetailsByStudent } from "../services/enrollmentservice";
import StudentCoursesCard from "../components/students/StudentCoursesCard";

const StudentDetails: React.FC = () => {
    const { id } = useParams();
    const studentId = Number(id);

    const [student, setStudent] = useState<Student | null>(null);
    const [courses, setCourses] = useState<StudentEnrolledCourse[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!studentId) return;
        void loadStudentDetails();
    }, [studentId]);

    const loadStudentDetails = async () => {
        setLoading(true);
        try {
            const [studentData, enrollmentData] = await Promise.all([
                getStudentById(studentId),
                getEnrollmentDetailsByStudent(studentId),
            ]);

            setStudent(studentData);
            setCourses(enrollmentData);
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to load student details", "error");
        } finally {
            setLoading(false);
        }
    };

    if (!studentId) {
        return <div>Invalid student id</div>;
    }

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700&display=swap');

        .sdPage {
          min-height: 100vh;
          padding: 24px 18px;
          background: linear-gradient(145deg, #0b1120 0%, #192132 100%);
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        .sdPage::before {
          content: '';
          position: absolute;
          width: 500px;
          height: 500px;
          background: rgba(96, 165, 250, 0.15);
          border-radius: 50%;
          filter: blur(90px);
          top: -200px;
          left: -200px;
          animation: float 25s infinite alternate ease-in-out;
          z-index: 0;
        }

        .sdPage::after {
          content: '';
          position: absolute;
          width: 600px;
          height: 600px;
          background: rgba(167, 139, 250, 0.1);
          border-radius: 50%;
          filter: blur(90px);
          bottom: -300px;
          right: -200px;
          animation: float 30s infinite alternate ease-in-out;
          z-index: 0;
        }

        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(40px, -40px) scale(1.1); }
        }

        .sdContainer {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          gap: 18px;
          position: relative;
          z-index: 10;
        }

        .sdCard {
          background: rgba(17, 25, 40, 0.6);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 48px;
          padding: 24px;
          box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.6), inset 0 1px 2px rgba(255,255,255,0.05);
          color: #fff;
        }

        .sdTitle {
          margin: 0 0 8px 0;
          font-family: 'Poppins', sans-serif;
          font-size: 24px;
          font-weight: 700;
          background: linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.02em;
        }

        .sdGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 12px;
          margin-top: 14px;
        }

        .sdItem {
          border: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(255, 255, 255, 0.03);
          border-radius: 24px;
          padding: 16px;
        }

        .sdLabel {
          color: #94a3b8;
          font-size: 12px;
          margin-bottom: 4px;
          text-transform: uppercase;
          font-weight: 600;
        }

        .sdValue {
          font-size: 15px;
          font-weight: 600;
          color: #fff;
        }
      `}</style>

            <div className="sdPage">
                <div className="sdContainer">
                    <div className="sdCard">
                        <h1 className="sdTitle">Student Details</h1>

                        {loading ? (
                            <div>Loading...</div>
                        ) : student ? (
                            <div className="sdGrid">
                                <div className="sdItem">
                                    <div className="sdLabel">First Name</div>
                                    <div className="sdValue">{student.firstName}</div>
                                </div>
                                <div className="sdItem">
                                    <div className="sdLabel">Last Name</div>
                                    <div className="sdValue">{student.lastName}</div>
                                </div>
                                <div className="sdItem">
                                    <div className="sdLabel">Email</div>
                                    <div className="sdValue">{student.email}</div>
                                </div>
                                <div className="sdItem">
                                    <div className="sdLabel">Date of Birth</div>
                                    <div className="sdValue">{student.dateOfBirth}</div>
                                </div>
                                <div className="sdItem">
                                    <div className="sdLabel">Student Enrollment Date</div>
                                    <div className="sdValue">{student.enrollmentDate}</div>
                                </div>
                            </div>
                        ) : (
                            <div>Student not found.</div>
                        )}
                    </div>

                    <StudentCoursesCard courses={courses} loading={loading} />
                </div>
            </div>
        </>
    );
};

export default StudentDetails;