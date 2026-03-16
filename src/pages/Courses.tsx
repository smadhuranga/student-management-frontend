import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import type { Course } from "../types/Course";

import {
    createCourse,
    deleteCourse,
    getCourses,
    updateCourse,
    getCourseStudents,  // <-- import to fetch enrolled students
} from "../services/courseservice";

import CourseFormCard from "../components/courses/CourseFormCard";
import CoursesTableCard from "../components/courses/CoursesTableCard";
import DeleteCourseModal from "../components/courses/DeleteCourseModal";
import CourseEnrollmentModal from "../components/courses/CourseEnrollmentModal";

const Courses: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [selectedCourseForEnrollment, setSelectedCourseForEnrollment] = useState<Course | null>(null);

    const [formData, setFormData] = useState<Course>({
        courseName: "",
        courseCode: "",
        description: "",
    });

    const [loading, setLoading] = useState(false);
    // State to store enrollment counts per course
    const [enrollmentCounts, setEnrollmentCounts] = useState<Record<number, number>>({});

    const [deleteModal, setDeleteModal] = useState<{
        show: boolean;
        courseId: number | null;
        courseName: string;
    }>({
        show: false,
        courseId: null,
        courseName: "",
    });

    useEffect(() => {
        void loadCourses();
    }, []);

    // Fetch enrollment counts for all courses
    const loadEnrollmentCounts = async (coursesList: Course[]) => {
        const counts: Record<number, number> = {};
        await Promise.all(
            coursesList.map(async (course) => {
                if (!course.id) return;
                try {
                    const students = await getCourseStudents(course.id);
                    counts[course.id] = students.length;
                } catch (error) {
                    console.error(`Failed to load enrollment count for course ${course.id}`, error);
                    counts[course.id] = 0;
                }
            })
        );
        setEnrollmentCounts(counts);
    };

    const loadCourses = async () => {
        setLoading(true);
        try {
            const data = await getCourses();
            setCourses(data);
            await loadEnrollmentCounts(data); // fetch counts after courses are loaded
        } catch (e) {
            console.error(e);
            Swal.fire("Error", "Failed to load courses", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setFormData({ courseName: "", courseCode: "", description: "" });
        setEditingId(null);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.courseName.trim() === "") {
            Swal.fire("Validation Error", "Course name required", "error");
            return;
        }

        if (formData.courseCode.trim() === "") {
            Swal.fire("Validation Error", "Course code required", "error");
            return;
        }

        setLoading(true);
        try {
            if (editingId) {
                await updateCourse(editingId, formData);
                Swal.fire("Updated", "Course updated successfully", "success");
            } else {
                await createCourse(formData);
                Swal.fire("Created", "Course created successfully", "success");
            }

            resetForm();
            await loadCourses(); // reload courses and counts
        } catch (error) {
            console.error("Course operation failed:", error);
            Swal.fire("Error", "Course operation failed", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (course: Course) => {
        setFormData({
            id: course.id,
            courseName: course.courseName,
            courseCode: course.courseCode ?? "",
            description: course.description ?? "",
        });
        setEditingId(course.id ?? null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDeleteClick = (id: number, courseName: string) => {
        if (!id) return;
        setDeleteModal({ show: true, courseId: id, courseName });
    };

    const confirmDelete = async () => {
        if (!deleteModal.courseId) return;

        setLoading(true);
        try {
            await deleteCourse(deleteModal.courseId);
            Swal.fire("Deleted", "Course removed successfully", "success");
            setDeleteModal({ show: false, courseId: null, courseName: "" });

            if (editingId === deleteModal.courseId) {
                resetForm();
            }

            await loadCourses(); // reload courses and counts
        } catch (e) {
            console.error(e);
            Swal.fire("Error", "Failed to delete course", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700&display=swap');

  .page {
    min-height: 100vh;
    padding: 24px 18px;
    background: linear-gradient(145deg, #0b1120 0%, #192132 100%);
    position: relative;
    overflow: hidden;
    font-family: 'Inter', sans-serif;
  }

  /* subtle animated blobs (background effect) */
  .page::before {
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

  .page::after {
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

  .container {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    gap: 18px;
    position: relative;
    z-index: 10;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 14px;
    padding: 6px 2px;
  }

  .pageTitle {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 4px 20px rgba(96, 165, 250, 0.3);
  }

  .pageSub {
    margin: 6px 0 0 0;
    color: #94a3b8;
    font-size: 13px;
    line-height: 1.5;
  }

  .statusPill {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    color: #e2e8f0;
    font-size: 12px;
    user-select: none;
    white-space: nowrap;
    box-shadow: 0 10px 25px -8px rgba(0, 0, 0, 0.4);
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1);
  }

  .dotLive {
    background: #60a5fa;
    box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.3);
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
`}</style>

            <div className="page">
                <div className="container">
                    <div className="header">
                        <div>
                            <h1 className="pageTitle">Course Management</h1>
                            <p className="pageSub">
                                Create, update, delete, and manage enrollments for courses.
                            </p>
                        </div>

                        {/*<span className="statusPill" title="UI state">*/}
                        {/*    <span className={`dot ${loading ? "dotLive" : ""}`}/>*/}
                        {/*    {loading ? "Working…" : "Ready"}*/}
                        {/*</span>*/}
                    </div>

                    <DeleteCourseModal
                        show={deleteModal.show}
                        courseName={deleteModal.courseName}
                        loading={loading}
                        onCancel={() =>
                            setDeleteModal({show: false, courseId: null, courseName: ""})
                        }
                        onConfirm={confirmDelete}
                    />

                    <CourseEnrollmentModal
                        show={!!selectedCourseForEnrollment}
                        course={selectedCourseForEnrollment}
                        onClose={() => setSelectedCourseForEnrollment(null)}
                        onUpdated={loadCourses}
                    />

                    <CourseFormCard
                        editingId={editingId}
                        formData={formData}
                        loading={loading}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        onCancelEdit={resetForm}
                    />

                    <CoursesTableCard
                        courses={courses}
                        loading={loading}
                        onEdit={handleEdit}
                        onDeleteClick={handleDeleteClick}
                        onManageEnrollments={(course) => setSelectedCourseForEnrollment(course)}
                        enrollmentCounts={enrollmentCounts}  // <-- new prop
                    />
                </div>
            </div>
        </>
    );
};

export default Courses;