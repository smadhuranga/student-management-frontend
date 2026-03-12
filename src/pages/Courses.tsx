import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import type { Course } from "../types/Course";

import {
    createCourse,
    deleteCourse,
    getCourses,
    updateCourse,
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

    const loadCourses = async () => {
        setLoading(true);
        try {
            const data = await getCourses();
            setCourses(data);
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
            await loadCourses();
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

            await loadCourses();
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

        .page{
          min-height: 100vh;
          padding: 24px 18px;
          background:
            radial-gradient(1200px 700px at 20% -10%, rgba(99,102,241,.22), transparent 60%),
            radial-gradient(900px 600px at 90% 10%, rgba(37,99,235,.18), transparent 55%),
            radial-gradient(900px 600px at 50% 110%, rgba(168,85,247,.14), transparent 55%),
            #070b16;
        }

        .container{
          max-width: 1100px;
          margin: 0 auto;
          display:grid;
          gap: 18px;
          font-family: 'Inter', sans-serif;
        }

        .header{
          display:flex;
          justify-content:space-between;
          align-items:flex-end;
          gap: 14px;
          padding: 6px 2px;
        }

        .pageTitle{
          margin: 0;
          font-family: 'Poppins', sans-serif;
          color: rgba(255,255,255,.92);
          font-size: 24px;
          font-weight: 700;
          letter-spacing: .3px;
        }

        .pageSub{
          margin: 6px 0 0 0;
          color: rgba(255,255,255,.68);
          font-size: 13px;
          line-height: 1.5;
        }

        .statusPill{
          display:inline-flex;
          align-items:center;
          gap:10px;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.12);
          color: rgba(255,255,255,.78);
          font-size: 12px;
          user-select:none;
          white-space: nowrap;
        }

        .dot{
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: rgba(255,255,255,.7);
          box-shadow: 0 0 0 4px rgba(255,255,255,.10);
        }

        .dotLive{
          background: rgba(99,102,241,.95);
          box-shadow: 0 0 0 4px rgba(99,102,241,.18);
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

                        <span className="statusPill" title="UI state">
                            <span className={`dot ${loading ? "dotLive" : ""}`} />
                            {loading ? "Working…" : "Ready"}
                        </span>
                    </div>

                    <DeleteCourseModal
                        show={deleteModal.show}
                        courseName={deleteModal.courseName}
                        loading={loading}
                        onCancel={() =>
                            setDeleteModal({ show: false, courseId: null, courseName: "" })
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
                    />
                </div>
            </div>
        </>
    );
};

export default Courses;