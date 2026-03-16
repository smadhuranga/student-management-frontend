import React, { useEffect, useState } from "react";
import type { Student } from "../types/Student";
import type { Course } from "../types/Course";
import { type AxiosError } from "axios";
import Swal from "sweetalert2";
import {
    createStudent,
    deleteStudent,
    getStudents,
    updateStudent,
} from "../services/studentservice";
import { getCourses } from "../services/courseservice";
import { useNavigate } from "react-router-dom";
import StudentsLayout from "../components/students/StudentsLayout";
import StudentsHeader from "../components/students/StudentsHeader";
import StudentFormCard from "../components/students/StudentFormCard";
import StudentsSearchBar from "../components/students/StudentsSearchBar";
import StudentsTableCard from "../components/students/StudentsTableCard";
import DeleteConfirmModal from "../components/students/DeleteConfirmModal";
import { getCoursesByStudent } from "../services/enrollmentservice";

const Students: React.FC = () => {
    const navigate = useNavigate();

    const [students, setStudents] = useState<Student[]>([]);
    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);

    const [formData, setFormData] = useState<Student>({
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        enrollmentDate: "",
        courseIds: [],
        courses: [],
    });

    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(false);

    const [deleteModal, setDeleteModal] = useState<{
        show: boolean;
        studentId: number | null;
        studentName: string;
    }>({ show: false, studentId: null, studentName: "" });

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Default sort: ID descending (newest first)
    const [sortColumn, setSortColumn] = useState<string>("id");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

    // Validation states
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    useEffect(() => {
        (async () => {
            await loadCourses();
            await loadStudentsWithCourses();
        })();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    const handleCourseIdsChange = (selectedIds: number[]) => {
        setFormData(prev => ({ ...prev, courseIds: selectedIds }));
    };

    const loadCourses = async () => {
        try {
            const data = await getCourses();
            setCourses(data);
        } catch (error) {
            console.error("Error loading courses", error);
        }
    };

    const loadStudentsWithCourses = async () => {
        setLoading(true);
        try {
            const data = await getStudents();
            const baseStudents: Student[] = Array.isArray(data) ? data : [];

            const enriched = await Promise.all(
                baseStudents.map(async (s) => {
                    if (!s.id) return s;

                    try {
                        const enrolledCourses = await getCoursesByStudent(s.id);
                        const simpleCourses = (enrolledCourses || []).map((c) => ({
                            id: c.id!,
                            name: c.courseName,
                        }));

                        return {
                            ...s,
                            courses: simpleCourses,
                            courseIds: simpleCourses.map((c) => c.id),
                        } satisfies Student;
                    } catch (e) {
                        console.error("Failed to load courses for student", s.id, e);
                        return s;
                    }
                })
            );

            setStudents(enriched);
        } catch (error) {
            console.error("Error loading students", error);
            setStudents([]);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear all validation errors when user types
        setValidationErrors([]);
        setErrorMessages([]);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        setFormData({ ...formData, email: value });
        setValidationErrors([]);
        setErrorMessages([]);
    };

    const resetForm = () => {
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            dateOfBirth: "",
            enrollmentDate: "",
            courseIds: [],
            courses: [],
        });
        setEditingId(null);
        setValidationErrors([]);
        setErrorMessages([]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const fieldErrors: string[] = [];
        const messages: string[] = [];
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!formData.firstName.trim()) {
            fieldErrors.push('firstName');
            messages.push('First name is required');
        }
        if (!formData.lastName.trim()) {
            fieldErrors.push('lastName');
            messages.push('Last name is required');
        }
        if (!formData.email.trim()) {
            fieldErrors.push('email');
            messages.push('Email is required');
        } else if (!emailRegex.test(formData.email)) {
            fieldErrors.push('email');
            messages.push('Please enter a valid email address');
        }
        if (!formData.dateOfBirth) {
            fieldErrors.push('dateOfBirth');
            messages.push('Date of birth is required');
        }
        if (!formData.enrollmentDate) {
            fieldErrors.push('enrollmentDate');
            messages.push('Enrollment date is required');
        }

        if (fieldErrors.length > 0) {
            setValidationErrors(fieldErrors);
            setErrorMessages(messages);
            return;
        }

        setValidationErrors([]);
        setErrorMessages([]);
        setLoading(true);

        try {
            if (editingId) {
                await updateStudent(editingId, formData);
                await Swal.fire({
                    icon: "success",
                    title: "Updated!",
                    text: "Student updated successfully.",
                    timer: 2000,
                    showConfirmButton: false,
                });
            } else {
                await createStudent(formData);
                await Swal.fire({
                    icon: "success",
                    title: "Created!",
                    text: "New student added successfully.",
                    timer: 2000,
                    showConfirmButton: false,
                });
            }

            resetForm();
            await loadStudentsWithCourses();
        } catch (error: unknown) {
            console.error("Submit error", error);
            const axiosError = error as AxiosError<{ message?: string }>;

            if (axiosError.response?.status === 409) {
                await Swal.fire({
                    icon: "error",
                    title: "Email already exists",
                    text:
                        axiosError.response.data?.message ||
                        "This email is already registered. Please use a different email.",
                });
            } else {
                await Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "An error occurred. Please try again.",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    function formatDateOnly(dateString: string): string {
        if (!dateString) return "";
        return dateString.split("T")[0];
    }

    const handleEdit = (student: Student) => {
        const formattedDOB = formatDateOnly(student.dateOfBirth);
        const formattedEnrollment = formatDateOnly(student.enrollmentDate);

        setFormData({
            ...student,
            dateOfBirth: formattedDOB,
            enrollmentDate: formattedEnrollment,
            courseIds: student.courseIds ?? student.courses?.map((c) => c.id) ?? [],
        });

        setEditingId(student.id || null);
        setValidationErrors([]);
        setErrorMessages([]);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleViewDetails = (studentId: number) => {
        navigate(`/students/${studentId}`);
    };

    const handleDeleteClick = (id: number, firstName: string, lastName: string) => {
        setDeleteModal({
            show: true,
            studentId: id,
            studentName: `${firstName} ${lastName}`,
        });
    };

    const confirmDelete = async () => {
        if (!deleteModal.studentId) return;

        setLoading(true);
        try {
            await deleteStudent(deleteModal.studentId);
            await Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "Student has been removed.",
                timer: 2000,
                showConfirmButton: false,
            });
            await loadStudentsWithCourses();
        } catch (error) {
            console.error("Delete error", error);
            await Swal.fire({
                icon: "error",
                title: "Error",
                text: "Could not delete student.",
            });
        } finally {
            setLoading(false);
            setDeleteModal({ show: false, studentId: null, studentName: "" });
        }
    };

    const cancelDelete = () => {
        setDeleteModal({ show: false, studentId: null, studentName: "" });
    };

    const filteredStudents = Array.isArray(students)
        ? students.filter((student) =>
            `${student.firstName} ${student.lastName} ${student.email}`
                .toLowerCase()
                .includes(search.toLowerCase())
        )
        : [];

    const sortedStudents = [...filteredStudents].sort((a, b) => {
        let aValue: string | number;
        let bValue: string | number;

        switch (sortColumn) {
            case "id":
                aValue = a.id ?? 0;
                bValue = b.id ?? 0;
                break;
            case "name":
                aValue = `${a.firstName} ${a.lastName}`.toLowerCase();
                bValue = `${b.firstName} ${b.lastName}`.toLowerCase();
                break;
            case "email":
                aValue = a.email?.toLowerCase() ?? "";
                bValue = b.email?.toLowerCase() ?? "";
                break;
            case "dateOfBirth":
                aValue = a.dateOfBirth ?? "";
                bValue = b.dateOfBirth ?? "";
                break;
            case "enrollmentDate":
                aValue = a.enrollmentDate ?? "";
                bValue = b.enrollmentDate ?? "";
                break;
            default:
                aValue = "";
                bValue = "";
        }

        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedStudents.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedStudents.length / itemsPerPage);

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const handleSort = (column: string) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
        setCurrentPage(1);
    };

    const getSortIndicator = (column: string) => {
        if (sortColumn !== column) return " ↕️";
        return sortDirection === "asc" ? " ↑" : " ↓";
    };

    return (
        <StudentsLayout>
            <DeleteConfirmModal
                show={deleteModal.show}
                studentName={deleteModal.studentName}
                onCancel={cancelDelete}
                onConfirm={confirmDelete}
            />

            <StudentsHeader onBack={() => navigate("/dashboard")} />

            <StudentFormCard
                editingId={editingId}
                formData={formData}
                loading={loading}
                courses={courses}
                onChange={handleChange}
                onEmailChange={handleEmailChange}
                onSubmit={handleSubmit}
                onCourseIdsChange={handleCourseIdsChange}
                validationErrors={validationErrors}
                errorMessages={errorMessages}
            />

            <StudentsSearchBar
                search={search}
                onSearchChange={setSearch}
                onClear={() => setSearch("")}
            />

            <StudentsTableCard
                loading={loading}
                studentsLength={students.length}
                filteredLength={filteredStudents.length}
                currentItems={currentItems}
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                onEdit={handleEdit}
                onDeleteClick={handleDeleteClick}
                onViewDetails={handleViewDetails}
                onSort={handleSort}
                sortIndicator={getSortIndicator}
                onItemsPerPageChange={handleItemsPerPageChange}
                goToPage={goToPage}
            />
        </StudentsLayout>
    );
};

export default Students;