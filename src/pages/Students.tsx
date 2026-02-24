import React, { useEffect, useState } from "react";
import type { Student } from "../types/Student";
import {
  getStudents,
  deleteStudent,
  createStudent,
  updateStudent,
} from "../services/studentservice";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const data = await getStudents();
      if (Array.isArray(data)) setStudents(data);
      else setStudents([]);
    } catch (error) {
      console.error("Error loading students", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateStudent(editingId, formData);
    } else {
      await createStudent(formData);
    }
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      dateOfBirth: "",
      enrollmentDate: "",
    });
    setEditingId(null);
    loadStudents();
  };

  const handleEdit = (student: Student) => {
    setFormData(student);
    setEditingId(student.id || null);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      await deleteStudent(id);
      loadStudents();
    }
  };

  const filteredStudents = Array.isArray(students)
    ? students.filter((student) =>
        `${student.firstName} ${student.lastName} ${student.email}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    : [];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎓 Student Management</h1>

      
      <button style={styles.backBtn} onClick={() => navigate("/dashboard")}>
        ← Go Back to Dashboard
      </button>

    
      <input
        type="text"
        placeholder="Search students..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      
      <div style={styles.card}>
        <h2>{editingId ? "Update Student" : "Add New Student"}</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label>Name</label>
            <input
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.field}>
            <label>Email</label>
            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.field}>
            <label>Birthdate</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.field}>
            <label>Enrollment Date</label>
            <input
              type="date"
              name="enrollmentDate"
              value={formData.enrollmentDate}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" style={styles.primaryButton}>
            {editingId ? "Update Student" : "Add Student"}
          </button>
        </form>
      </div>

      
      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Birthdate</th>
              <th>Enrollment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.firstName} {student.lastName}</td>
                <td>{student.email}</td>
                <td>{student.dateOfBirth}</td>
                <td>{student.enrollmentDate}</td>
                <td>
                  <button style={styles.editBtn} onClick={() => handleEdit(student)}>
                    Edit
                  </button>
                  <button style={styles.deleteBtn} onClick={() => handleDelete(student.id!)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


const styles = {
  container: {
    padding: "40px",
    minHeight: "100vh",
    background: "linear-gradient(to right, #8e2de2, #4a00e0)",
    fontFamily: "'Arial', sans-serif",
  },
  title: {
    textAlign: "center" as const,
    color: "white",
    marginBottom: "20px",
    fontSize: "2.5rem",
  },
  backBtn: {
    marginBottom: "20px",
    padding: "10px 20px",
    backgroundColor: "#ffb347",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    color: "#333",
    fontWeight: "bold" as const,
  },
  search: {
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "none",
  },
  card: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "12px",
    marginBottom: "30px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  },
  form: {
    display: "grid",
    gap: "15px",
  },
  field: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
    marginBottom: "10px",
  },
  primaryButton: {
    padding: "12px",
    backgroundColor: "#764ba2",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold" as const,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
  },
  editBtn: {
    marginRight: "10px",
    padding: "6px 12px",
    backgroundColor: "#f6c23e",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  deleteBtn: {
    padding: "6px 12px",
    backgroundColor: "#e74a3b",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Students;