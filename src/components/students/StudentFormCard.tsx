import React, { useState } from "react";
import type { Student } from "../../types/Student";
import type { Course } from "../../types/Course";

type Props = {
    editingId: number | null;
    formData: Student;
    loading: boolean;
    courses: Course[];

    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    // New prop: receives full array of selected course IDs
    onCourseIdsChange: (selectedIds: number[]) => void;
};

const StudentFormCard: React.FC<Props> = ({
                                              editingId,
                                              formData,
                                              loading,
                                              courses,
                                              onChange,
                                              onEmailChange,
                                              onSubmit,
                                              onCourseIdsChange,
                                          }) => {
    // State for dropdown open/close and pagination
    const [isOpen, setIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5; // Show 5 courses per page

    // Selected IDs from formData
    const selectedIds = formData.courseIds || [];

    // Toggle a single course selection
    const toggleCourse = (courseId: number) => {
        const newSelected = selectedIds.includes(courseId)
            ? selectedIds.filter(id => id !== courseId)
            : [...selectedIds, courseId];
        onCourseIdsChange(newSelected);
    };

    // Pagination logic
    const totalPages = Math.ceil(courses.length / pageSize);
    const paginatedCourses = courses.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    // Get display text for button
    const selectedCount = selectedIds.length;
    const buttonText = selectedCount === 0
        ? "Select courses"
        : `${selectedCount} course${selectedCount > 1 ? 's' : ''} selected`;

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700&display=swap');

        .sf * { font-family: 'Inter', sans-serif; box-sizing: border-box; }

        .card {
          width: 92%;
          max-width: 1200px;
          margin: 0 auto 34px auto;
          position: relative;
          overflow: hidden;
          border-radius: 48px;
          padding: 30px;
          background: rgba(17, 25, 40, 0.6);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.6), inset 0 1px 2px rgba(255,255,255,0.05);
        }

        .glow {
          position: absolute;
          inset: -220px;
          background: 
            radial-gradient(520px 320px at 12% 0%, rgba(96,165,250,0.15), transparent 62%),
            radial-gradient(520px 320px at 92% 10%, rgba(167,139,250,0.1), transparent 62%),
            radial-gradient(520px 340px at 45% 120%, rgba(244,114,182,0.08), transparent 64%);
          pointer-events: none;
        }

        .title {
          position: relative;
          margin: 0 0 18px 0;
          font-family: 'Poppins', sans-serif;
          font-size: 1.8rem;
          font-weight: 700;
          background: linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.02em;
        }

        .form {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .input {
          width: 100%;
          padding: 14px 16px;
          border-radius: 40px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.03);
          color: #fff;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
        }
        .input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
        .input:focus {
          border-color: #60a5fa;
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.15);
        }

        .input[type="date"] {
          color-scheme: dark;
        }

        /* Dropdown container */
        .dropdown {
          position: relative;
          width: 100%;
        }

        .dropdownButton {
          width: 100%;
          padding: 14px 16px;
          border-radius: 40px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.03);
          color: #fff;
          font-size: 1rem;
          text-align: left;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.2s ease;
        }
        .dropdownButton:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.15);
        }
        .dropdownButton:focus {
          border-color: #60a5fa;
          box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.15);
          outline: none;
        }

        .arrow {
          border: solid #94a3b8;
          border-width: 0 2px 2px 0;
          display: inline-block;
          padding: 3px;
          transform: rotate(45deg);
          transition: transform 0.2s ease;
        }
        .arrow.open {
          transform: rotate(-135deg);
        }

        .dropdownPanel {
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          background: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 16px;
          z-index: 20;
          box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.6);
          max-height: 400px;
          overflow-y: auto;
        }

        .courseOption {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 16px;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .courseOption:hover {
          background: rgba(255, 255, 255, 0.06);
        }

        .courseOption input[type="checkbox"] {
          width: 18px;
          height: 18px;
          accent-color: #60a5fa;
          cursor: pointer;
        }

        .courseInfo {
          flex: 1;
          min-width: 0;
        }
        .courseName {
          color: #e2e8f0;
          font-size: 0.95rem;
          font-weight: 600;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .courseCode {
          color: #94a3b8;
          font-size: 0.85rem;
          margin-top: 2px;
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin-top: 16px;
          padding-top: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .pageButton {
          padding: 6px 12px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.03);
          color: #e2e8f0;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .pageButton:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-1px);
        }
        .pageButton:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .pageInfo {
          color: #94a3b8;
          font-size: 0.9rem;
        }

        .primaryButton {
          width: 35%;
          margin: auto;
          padding: 14px 18px;
          border-radius: 999px;
          border: none;
          background: linear-gradient(135deg, #475569 0%, #1e293b 100%);
          color: #fff;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 10px 25px -8px rgba(0, 0, 0, 0.4);
        }
        .primaryButton:hover:not(:disabled) {
          background: linear-gradient(135deg, #5f6b7a, #2d3748);
          transform: translateY(-2px);
          box-shadow: 0 15px 30px -8px rgba(0, 0, 0, 0.5);
        }
        .primaryButton:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 900px) {
          .card { padding: 24px; border-radius: 32px; }
          .primaryButton { width: 50%; }
        }

        @media (max-width: 640px) {
          .row { grid-template-columns: 1fr; }
          .title { font-size: 1.5rem; }
          .primaryButton { width: 100%; }
        }
      `}</style>

            <div className="sf card">
                <div className="glow" />

                <h2 className="title">
                    {editingId ? "Edit Student" : "Add New Student"}
                </h2>

                <form onSubmit={onSubmit} className="form">
                    <div className="row">
                        <input
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={onChange}
                            required
                            className="input"
                        />

                        <input
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={onChange}
                            required
                            className="input"
                        />
                    </div>

                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={onEmailChange}
                        required
                        className="input"
                    />

                    <div className="row">
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={onChange}
                            required
                            className="input"
                        />

                        <input
                            type="date"
                            name="enrollmentDate"
                            value={formData.enrollmentDate}
                            onChange={onChange}
                            required
                            className="input"
                        />
                    </div>

                    {/* Custom multi-select dropdown with pagination */}
                    <div className="dropdown">
                        <button
                            type="button"
                            className="dropdownButton"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span>{buttonText}</span>
                            <span className={`arrow ${isOpen ? 'open' : ''}`} />
                        </button>

                        {isOpen && (
                            <div className="dropdownPanel">
                                {paginatedCourses.map(course => (
                                    <label key={course.id} className="courseOption">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(course.id!)}
                                            onChange={() => toggleCourse(course.id!)}
                                        />
                                        <div className="courseInfo">
                                            <div className="courseName">{course.courseName}</div>
                                            {course.courseCode && (
                                                <div className="courseCode">{course.courseCode}</div>
                                            )}
                                        </div>
                                    </label>
                                ))}

                                {totalPages > 1 && (
                                    <div className="pagination">
                                        <button
                                            type="button"
                                            className="pageButton"
                                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                        >
                                            ‹ Prev
                                        </button>
                                        <span className="pageInfo">
                                            Page {currentPage} of {totalPages}
                                        </span>
                                        <button
                                            type="button"
                                            className="pageButton"
                                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                            disabled={currentPage === totalPages}
                                        >
                                            Next ›
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <button type="submit" className="primaryButton" disabled={loading}>
                        {loading ? "Processing..." : editingId ? "Update Student" : "Add Student"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default StudentFormCard;