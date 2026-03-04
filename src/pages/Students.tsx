import React, { useEffect, useState } from "react";
import type { Student } from "../types/Student";
import Swal from "sweetalert2";
import {
    createStudent,
    deleteStudent,
    getStudents,
    updateStudent,
} from "../services/studentservice";
import { useNavigate } from "react-router-dom";

import StudentsLayout from "../components/students/StudentsLayout";
import StudentsHeader from "../components/students/StudentsHeader";
import StudentFormCard from "../components/students/StudentFormCard";
import StudentsSearchBar from "../components/students/StudentsSearchBar";
import StudentsTableCard from "../components/students/StudentsTableCard";
import DeleteConfirmModal from "../components/students/DeleteConfirmModal";

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
    });

    const [loading, setLoading] = useState(false);
    const [deleteModal, setDeleteModal] = useState<{
        show: boolean;
        studentId: number | null;
        studentName: string;
    }>({ show: false, studentId: null, studentName: "" });

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Sorting
    const [sortColumn, setSortColumn] = useState<string>("id");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    useEffect(() => {
        (async () => {
            await loadStudents();
        })();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    const loadStudents = async () => {
        setLoading(true);
        try {
            const data = await getStudents();
            if (Array.isArray(data)) setStudents(data);
            else setStudents([]);
        } catch (error) {
            console.error("Error loading students", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, email: e.target.value.toLowerCase() });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(formData.email)) {
            await Swal.fire({
                icon: "error",
                title: "Invalid Email",
                text: "Please enter a valid email address (e.g., name@example.com).",
            });
            return;
        }

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

            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                dateOfBirth: "",
                enrollmentDate: "",
            });
            setEditingId(null);

            await loadStudents();
        } catch (error: unknown) {
            console.error("Submit error", error);

            if (
                error &&
                typeof error === "object" &&
                "response" in error &&
                (error as any).response &&
                typeof (error as any).response === "object" &&
                "status" in (error as any).response
            ) {
                const err = error as { response: { status: number; data?: { message?: string } } };
                if (err.response.status === 409) {
                    await Swal.fire({
                        icon: "error",
                        title: "Email already exists",
                        text:
                            err.response.data?.message ||
                            "This email is already registered. Please use a different email.",
                    });
                } else {
                    await Swal.fire({ icon: "error", title: "Oops...", text: "An error occurred. Please try again." });
                }
            } else {
                await Swal.fire({ icon: "error", title: "Oops...", text: "An error occurred. Please try again." });
            }
        } finally {
            setLoading(false);
        }
    };

    function formatDateForInput(dateString: string): string {
        if (!dateString) return "";
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    const handleEdit = (student: Student) => {
        const formattedDOB = formatDateForInput(student.dateOfBirth);
        const formattedEnrollment = formatDateForInput(student.enrollmentDate);

        setFormData({
            ...student,
            dateOfBirth: formattedDOB,
            enrollmentDate: formattedEnrollment,
        });

        setEditingId(student.id || null);
        window.scrollTo({ top: 0, behavior: "smooth" });
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
            await loadStudents();
        } catch (error) {
            console.error("Delete error", error);
            await Swal.fire({ icon: "error", title: "Error", text: "Could not delete student." });
        } finally {
            setLoading(false);
            setDeleteModal({ show: false, studentId: null, studentName: "" });
        }
    };

    const cancelDelete = () => {
        setDeleteModal({ show: false, studentId: null, studentName: "" });
    };

    // Filter
    const filteredStudents = Array.isArray(students)
        ? students.filter((student) =>
            `${student.firstName} ${student.lastName} ${student.email}`
                .toLowerCase()
                .includes(search.toLowerCase())
        )
        : [];

    // Sort
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

    // Pagination
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
                onChange={handleChange}
                onEmailChange={handleEmailChange}
                onSubmit={handleSubmit}
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
                onSort={handleSort}
                sortIndicator={getSortIndicator}
                onItemsPerPageChange={handleItemsPerPageChange}
                goToPage={goToPage}
            />
        </StudentsLayout>
    );
};

export default Students;