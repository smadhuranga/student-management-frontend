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
        .sdPage{
          min-height: 100vh;
          padding: 24px 18px;
          background:
            radial-gradient(1200px 700px at 20% -10%, rgba(99,102,241,.22), transparent 60%),
            radial-gradient(900px 600px at 90% 10%, rgba(37,99,235,.18), transparent 55%),
            #070b16;
        }

        .sdContainer{
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          gap: 18px;
        }

        .sdCard{
          background: linear-gradient(180deg, rgba(17,24,39,.72), rgba(15,23,42,.55));
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 18px;
          padding: 18px;
          box-shadow: 0 20px 60px rgba(0,0,0,.35);
          color: rgba(255,255,255,.92);
        }

        .sdTitle{
          margin: 0 0 8px 0;
          font-size: 24px;
          font-weight: 700;
        }

        .sdGrid{
          display:grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 12px;
          margin-top: 14px;
        }

        .sdItem{
          border: 1px solid rgba(255,255,255,.08);
          background: rgba(255,255,255,.04);
          border-radius: 14px;
          padding: 12px;
        }

        .sdLabel{
          color: rgba(255,255,255,.62);
          font-size: 12px;
          margin-bottom: 4px;
          text-transform: uppercase;
        }

        .sdValue{
          font-size: 15px;
          font-weight: 600;
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