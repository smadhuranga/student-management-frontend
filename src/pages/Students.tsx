import React, {useEffect, useState} from "react";
import type {Student} from "../types/Student";
import Swal from 'sweetalert2';
import {createStudent, deleteStudent, getStudents, updateStudent,} from "../services/studentservice";
import {useNavigate} from "react-router-dom";

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
    }>({show: false, studentId: null, studentName: ""});

    useEffect(() => {
        loadStudents();
    }, []);

    // Function to load students
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

    // Function to handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingId) {
                await updateStudent(editingId, formData);
                await Swal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: 'Student updated successfully.',
                    timer: 2000,
                    showConfirmButton: false,
                });
            } else {
                await createStudent(formData);
                await Swal.fire({
                    icon: 'success',
                    title: 'Created!',
                    text: 'New student added successfully.',
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
        } catch (error) {
            console.error("Submit error", error);
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'An error occurred. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };

// Convert various date formats to "YYYY-MM-DD"
    function formatDateForInput(dateString: string): string {
        if (!dateString) return "";

        const date = new Date(dateString);

        // get year, month, day
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

// Function to handle edit
    const handleEdit = (student: Student) => {
        const formattedDOB = formatDateForInput(student.dateOfBirth);
        const formattedEnrollment = formatDateForInput(student.enrollmentDate);

        setFormData({
            ...student,
            dateOfBirth: formattedDOB,
            enrollmentDate: formattedEnrollment,
        });

        setEditingId(student.id || null);
        window.scrollTo({top: 0, behavior: "smooth"});
    };

// Function to handle delete
    const handleDeleteClick = (id: number, firstName: string, lastName: string) => {
        setDeleteModal({
            show: true,
            studentId: id,
            studentName: `${firstName} ${lastName}`,
        });
    };

    // Function to confirm delete
    const confirmDelete = async () => {
        if (!deleteModal.studentId) return;
        setLoading(true);
        try {
            await deleteStudent(deleteModal.studentId);
            await Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Student has been removed.',
                timer: 2000,
                showConfirmButton: false,
            });
            await loadStudents();
        } catch (error) {
            console.error("Delete error", error);
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Could not delete student.',
            });
        } finally {
            setLoading(false);
            setDeleteModal({show: false, studentId: null, studentName: ""});
        }
    };

// Function to cancel delete
    const cancelDelete = () => {
        setDeleteModal({show: false, studentId: null, studentName: ""});
    };

    const filteredStudents = Array.isArray(students)
        ? students.filter((student) =>
            `${student.firstName} ${student.lastName} ${student.email}`
                .toLowerCase()
                .includes(search.toLowerCase())
        )
        : [];

    return (
        <>
            <style>{`
        /* ===== Global Styles & Animations ===== */
        .students-page {
          min-height: 100vh;
          padding: 40px 20px;
          background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Animated background blobs */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          z-index: 0;
          animation: float 20s infinite ease-in-out;
        }

        .blob1 {
          width: 600px;
          height: 600px;
          background: linear-gradient(135deg, #ff6ec4, #7873f5);
          top: -200px;
          left: -200px;
          animation-delay: 0s;
        }

        .blob2 {
          width: 700px;
          height: 700px;
          background: linear-gradient(135deg, #3b9ae1, #9750dd);
          bottom: -300px;
          right: -200px;
          animation-delay: 5s;
        }

        .blob3 {
          width: 500px;
          height: 500px;
          background: linear-gradient(135deg, #f093fb, #f5576c);
          top: 40%;
          left: 30%;
          animation-delay: 10s;
          opacity: 0.6;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(50px, -30px) scale(1.1); }
          50% { transform: translate(-20px, 50px) scale(0.9); }
          75% { transform: translate(30px, 20px) scale(1.05); }
        }

        /* Header */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 1200px;
          margin-bottom: 30px;
          flex-wrap: wrap;
          gap: 15px;
          position: relative;
          z-index: 10;
        }

        .title {
          font-size: 2.8rem;
          font-weight: 700;
          background: linear-gradient(145deg, #fff8e7, #ffe6b0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
          letter-spacing: -0.02em;
          text-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }

        .backBtn {
          padding: 12px 28px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 40px;
          font-size: 1rem;
          font-weight: 500;
          color: white;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
        }

        .backBtn:hover {
          background: rgba(255,255,255,0.2);
          transform: translateY(-2px);
          border-color: rgba(255,255,255,0.4);
        }

        /* Search */
        .searchWrapper {
          position: relative;
          width: 100%;
          max-width: 1200px;
          margin-bottom: 30px;
          z-index: 10;
        }

        .search {
          width: 100%;
          padding: 18px 30px;
          font-size: 1.1rem;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 60px;
          outline: none;
          color: white;
          box-shadow: 0 8px 25px rgba(0,0,0,0.2);
          transition: all 0.3s;
        }

        .search:focus {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.3);
          box-shadow: 0 12px 30px rgba(0,0,0,0.3);
        }

        .search::placeholder {
          color: rgba(255,255,255,0.6);
        }

        .clearSearch {
          position: absolute;
          right: 25px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.2rem;
          color: white;
          cursor: pointer;
          opacity: 0.7;
          transition: opacity 0.2s;
        }

        .clearSearch:hover {
          opacity: 1;
        }

        /* Glass Cards */
        .glassCard {
          width: 100%;
          max-width: 1200px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 40px;
          padding: 36px;
          margin-bottom: 40px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.1);
          z-index: 10;
          animation: fadeInUp 0.6s ease-out;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .cardTitle {
          font-size: 2rem;
          font-weight: 600;
          color: white;
          margin-top: 0;
          margin-bottom: 28px;
          letter-spacing: -0.01em;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* Form */
        .form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .label {
          font-size: 0.95rem;
          font-weight: 500;
          color: rgba(255,255,255,0.8);
          margin-left: 8px;
        }

        .input {
          padding: 16px 20px;
          font-size: 1rem;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 30px;
          outline: none;
          color: white;
          transition: all 0.2s;
        }

        .input:focus {
          background: rgba(255,255,255,0.15);
          border-color: rgba(255,255,255,0.4);
        }

        .input::placeholder {
          color: rgba(255,255,255,0.5);
        }

        .primaryButton {
          padding: 18px 28px;
          background: linear-gradient(145deg, #667eea, #764ba2);
          border: none;
          border-radius: 40px;
          font-size: 1.2rem;
          font-weight: 600;
          color: white;
          cursor: pointer;
          box-shadow: 0 12px 30px rgba(102,126,234,0.4);
          transition: transform 0.2s, box-shadow 0.2s;
          margin-top: 16px;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .primaryButton:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 18px 40px rgba(102,126,234,0.6);
        }

        .primaryButton:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Table */
        .tableWrapper {
          overflow-x: auto;
          border-radius: 24px;
          background: rgba(0,0,0,0.1);
        }

        .table {
          width: 100%;
          border-collapse: collapse;
          font-size: 1rem;
          color: white;
        }

        .th {
          text-align: left;
          padding: 18px 16px;
          background: rgba(255,255,255,0.08);
          font-weight: 600;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.9);
        }

        .td {
          padding: 16px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .rowHover:hover {
          background: rgba(255,255,255,0.1);
          transition: background 0.2s;
        }

        .editBtn {
          padding: 8px 20px;
          margin-right: 10px;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 30px;
          font-size: 0.9rem;
          font-weight: 500;
          color: white;
          cursor: pointer;
          transition: all 0.2s;
        }

        .editBtn:hover {
          background: rgba(255,255,255,0.25);
          border-color: rgba(255,255,255,0.4);
        }

        .deleteBtn {
          padding: 8px 20px;
          background: rgba(231, 76, 60, 0.2);
          border: 1px solid rgba(231, 76, 60, 0.3);
          border-radius: 30px;
          font-size: 0.9rem;
          font-weight: 500;
          color: #ff8a80;
          cursor: pointer;
          transition: all 0.2s;
        }

        .deleteBtn:hover {
          background: rgba(231, 76, 60, 0.4);
          border-color: rgba(231, 76, 60, 0.6);
          color: white;
        }

        .loadingText, .emptyText {
          text-align: center;
          color: rgba(255,255,255,0.7);
          padding: 40px;
          font-size: 1.2rem;
        }

        /* Modal */
        .modalOverlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.3);
          backdrop-filter: blur(12px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          animation: fadeIn 0.2s ease;
        }

        .modal {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 48px;
          padding: 40px;
          max-width: 420px;
          width: 90%;
          box-shadow: 0 40px 80px rgba(0,0,0,0.5);
          color: white;
        }

        .modalTitle {
          font-size: 2rem;
          font-weight: 600;
          margin-top: 0;
          margin-bottom: 16px;
        }

        .modalText {
          font-size: 1.1rem;
          margin-bottom: 32px;
          line-height: 1.6;
          color: rgba(255,255,255,0.9);
        }

        .modalActions {
          display: flex;
          justify-content: flex-end;
          gap: 16px;
        }

        .modalCancelBtn {
          padding: 14px 28px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 40px;
          font-size: 1rem;
          font-weight: 500;
          color: white;
          cursor: pointer;
          transition: all 0.2s;
        }

        .modalCancelBtn:hover {
          background: rgba(255,255,255,0.2);
        }

        .modalConfirmBtn {
          padding: 14px 32px;
          background: linear-gradient(145deg, #e74c3c, #c0392b);
          border: none;
          border-radius: 40px;
          font-size: 1rem;
          font-weight: 600;
          color: white;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 10px 20px rgba(231,76,60,0.3);
        }

        .modalConfirmBtn:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(231,76,60,0.5);
        }

        @media (max-width: 640px) {
          .title { font-size: 2rem; }
          .glassCard { padding: 24px; }
          .row { grid-template-columns: 1fr; }
        }
      `}</style>

            <div className="students-page">
                {/* Animated blobs */}
                <div className="blob blob1"></div>
                <div className="blob blob2"></div>
                <div className="blob blob3"></div>

                {/* Delete Modal */}
                {deleteModal.show && (
                    <div className="modalOverlay" onClick={cancelDelete}>
                        <div className="modal" onClick={(e) => e.stopPropagation()}>
                            <h3 className="modalTitle">Confirm Deletion</h3>
                            <p className="modalText">
                                Are you sure you want to delete <strong>{deleteModal.studentName}</strong>? This action
                                cannot be undone.
                            </p>
                            <div className="modalActions">
                                <button className="modalCancelBtn" onClick={cancelDelete}>
                                    Cancel
                                </button>
                                <button className="modalConfirmBtn" onClick={confirmDelete}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="header">
                    <h1 className="title">🎓 Student Portal</h1>
                    <button className="backBtn" onClick={() => navigate("/dashboard")}>
                        ← Dashboard
                    </button>
                </div>

                {/* Search */}
                <div className="searchWrapper">
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="search"
                    />
                    {search && (
                        <span className="clearSearch" onClick={() => setSearch("")}>
              ✕
            </span>
                    )}
                </div>

                {/* Form Card */}
                <div className="glassCard">
                    <h2 className="cardTitle">
                        {editingId ? "✏️ Edit Student" : "➕ Add New Student"}
                    </h2>
                    <form onSubmit={handleSubmit} className="form">
                        <div className="row">
                            <div className="field">
                                <label className="label">First name</label>
                                <input
                                    name="firstName"
                                    placeholder="John"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    className="input"
                                />
                            </div>
                            <div className="field">
                                <label className="label">Last name</label>
                                <input
                                    name="lastName"
                                    placeholder="Doe"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    className="input"
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Email address</label>
                            <input
                                name="email"
                                type="email"
                                placeholder="john.doe@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="input"
                            />
                        </div>

                        <div className="row">
                            <div className="field">
                                <label className="label">Date of birth</label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    required
                                    className="input"
                                />
                            </div>
                            <div className="field">
                                <label className="label">Enrollment date</label>
                                <input
                                    type="date"
                                    name="enrollmentDate"
                                    value={formData.enrollmentDate}
                                    onChange={handleChange}
                                    required
                                    className="input"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="primaryButton"
                            disabled={loading}
                        >
                            {loading ? "Processing..." : editingId ? "Update Student" : "Add Student"}
                        </button>
                    </form>
                </div>

                {/* Table Card */}
                <div className="glassCard">
                    <h2 className="cardTitle">📋 Registered Students</h2>
                    {loading && students.length === 0 ? (
                        <p className="loadingText">Loading students...</p>
                    ) : filteredStudents.length === 0 ? (
                        <p className="emptyText">No students found.</p>
                    ) : (
                        <div className="tableWrapper">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th className="th">ID</th>
                                    <th className="th">Name</th>
                                    <th className="th">Email</th>
                                    <th className="th">Birthdate</th>
                                    <th className="th">Enrollment</th>
                                    <th className="th">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredStudents.map((student) => (
                                    <tr key={student.id} className="rowHover">
                                        <td className="td">{student.id}</td>
                                        <td className="td">
                                            {student.firstName} {student.lastName}
                                        </td>
                                        <td className="td">{student.email}</td>
                                        <td className="td">{student.dateOfBirth}</td>
                                        <td className="td">{student.enrollmentDate}</td>
                                        <td className="td">
                                            <button
                                                className="editBtn"
                                                onClick={() => handleEdit(student)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="deleteBtn"
                                                onClick={() =>
                                                    handleDeleteClick(
                                                        student.id!,
                                                        student.firstName,
                                                        student.lastName
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Students;