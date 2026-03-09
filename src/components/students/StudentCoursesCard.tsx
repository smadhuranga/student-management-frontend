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
        .scCard{
          background: linear-gradient(180deg, rgba(17,24,39,.72), rgba(15,23,42,.55));
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 18px;
          padding: 18px;
          box-shadow: 0 20px 60px rgba(0,0,0,.35);
          color: rgba(255,255,255,.92);
          overflow: hidden;
        }

        .scTitle{
          margin:0 0 8px 0;
          font-size: 18px;
          font-weight: 700;
        }

        .scSub{
          margin:0 0 14px 0;
          color: rgba(255,255,255,.68);
          font-size: 13px;
        }

        .scTableWrap{
          overflow:auto;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,.10);
        }

        .scTable{
          width:100%;
          border-collapse: collapse;
          min-width: 680px;
        }

        .scTable th,
        .scTable td{
          padding: 12px 14px;
          border-bottom: 1px solid rgba(255,255,255,.08);
          text-align: left;
        }

        .scTable th{
          background: rgba(255,255,255,.04);
          color: rgba(255,255,255,.72);
          text-transform: uppercase;
          font-size: 12px;
        }

        .scEmpty{
          color: rgba(255,255,255,.72);
          font-size: 14px;
          padding: 10px 0;
        }

        .scMuted{
          color: rgba(255,255,255,.68);
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