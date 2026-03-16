import React from "react";
import type { StudentEnrolledCourse } from "../../types/StudentEnrolledCourse";

type Props = {
    courses: StudentEnrolledCourse[];
    loading?: boolean;
};

const StudentCoursesCard: React.FC<Props> = ({ courses, loading = false }) => {
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700&display=swap');

        .scCard {
          background: rgba(17, 25, 40, 0.6);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 48px;
          padding: 24px;
          box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.6), inset 0 1px 2px rgba(255,255,255,0.05);
          color: #fff;
        }

        .scTitle {
          margin: 0 0 8px 0;
          font-family: 'Poppins', sans-serif;
          font-size: 20px;
          font-weight: 700;
          background: linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.02em;
        }

        .scSub {
          margin: 0 0 14px 0;
          color: #94a3b8;
          font-size: 13px;
        }

        .scTableWrap {
          overflow: auto;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(255, 255, 255, 0.02);
        }

        .scTable {
          width: 100%;
          border-collapse: collapse;
          min-width: 680px;
        }

        .scTable th,
        .scTable td {
          padding: 12px 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          text-align: left;
        }

        .scTable th {
          background: rgba(255, 255, 255, 0.03);
          color: #94a3b8;
          text-transform: uppercase;
          font-size: 12px;
          font-weight: 600;
        }

        .scTable td {
          color: #e2e8f0;
        }

        .scEmpty {
          color: #94a3b8;
          font-size: 14px;
          padding: 10px 0;
        }

        .scMuted {
          color: #94a3b8;
        }
      `}</style>

            <div className="scCard">
                <h3 className="scTitle">Enrolled Courses</h3>
                <p className="scSub">Display currently enrolled courses for this student.</p>

                {loading ? (
                    <div className="scEmpty">Loading enrolled courses...</div>
                ) : courses.length === 0 ? (
                    <div className="scEmpty">This student is not enrolled in any courses yet.</div>
                ) : (
                    <div className="scTableWrap">
                        <table className="scTable">
                            <thead>
                            <tr>
                                <th>Course Name</th>
                                <th>Course Code</th>
                                <th>Description</th>
                                <th>Enrollment Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            {courses.map((course) => (
                                <tr key={`${course.courseId}-${course.enrolledDate}`}>
                                    <td>{course.courseName}</td>
                                    <td>{course.courseCode || "-"}</td>
                                    <td className="scMuted">{course.description || "-"}</td>
                                    <td>
                                        {course.enrolledDate
                                            ? new Date(course.enrolledDate).toLocaleDateString()
                                            : "-"}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
};

export default StudentCoursesCard;