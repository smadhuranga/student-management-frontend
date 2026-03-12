import React from "react";
import type { Student } from "../../types/Student";

type Props = {
    loading: boolean;
    studentsLength: number;
    filteredLength: number;
    currentItems: Student[];
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;

    onEdit: (student: Student) => void;
    onDeleteClick: (id: number, firstName: string, lastName: string) => void;
    onViewDetails: (studentId: number) => void;

    onSort: (col: string) => void;
    sortIndicator: (col: string) => string;

    onItemsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    goToPage: (page: number) => void;
};

const StudentsTableCard: React.FC<Props> = ({
                                                loading,
                                                studentsLength,
                                                filteredLength,
                                                currentItems,
                                                currentPage,
                                                totalPages,
                                                itemsPerPage,
                                                onEdit,
                                                onDeleteClick,
                                                onViewDetails,
                                                onSort,
                                                sortIndicator,
                                                onItemsPerPageChange,
                                                goToPage,
                                            }) => {
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .tableWrapper {
          overflow-x: auto;
          border-radius: 22px;
          background: rgba(0,0,0,0.12);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.98rem;
          color: rgba(255,255,255,.92);
          min-width: 980px;
        }

        .th {
          text-align: left;
          padding: 16px 16px;
          background: rgba(255,255,255,0.06);
          font-weight: 700;
          border-bottom: 1px solid rgba(255,255,255,0.10);
          color: rgba(255,255,255,0.88);
          cursor: pointer;
          user-select: none;
          transition: background 0.18s ease, color 0.18s ease;
          position: sticky;
          top: 0;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .th:hover {
          background: rgba(255,255,255,0.10);
          color: rgba(255,255,255,.95);
        }

        .td {
          padding: 14px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          color: rgba(255,255,255,.90);
          vertical-align: top;
        }

        .rowHover:hover {
          background: rgba(255,255,255,0.06);
          transition: background 0.18s ease;
        }

        .studentLink {
          color: rgba(255,255,255,.96);
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          transition: color 0.18s ease, opacity 0.18s ease;
        }

        .studentLink:hover {
          color: #c4b5fd;
          text-decoration: underline;
        }

        .courseTag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(99,102,241,0.14);
          border: 1px solid rgba(99,102,241,0.28);
          border-radius: 999px;
          padding: 4px 10px;
          margin: 2px;
          font-size: 0.82rem;
          font-weight: 700;
          color: rgba(255,255,255,.90);
          white-space: nowrap;
        }

        .detailsBtn {
          padding: 8px 16px;
          margin-right: 10px;
          margin-bottom: 10px;
          background: rgba(99, 102, 241, 0.16);
          border: 1px solid rgba(99, 102, 241, 0.28);
          border-radius: 999px;
          font-size: 0.9rem;
          font-weight: 700;
          color: rgba(255,255,255,.95);
          cursor: pointer;
          transition: transform 0.12s ease, background 0.18s ease, border-color 0.18s ease;
        }

        .detailsBtn:hover {
          background: rgba(99, 102, 241, 0.24);
          border-color: rgba(99, 102, 241, 0.42);
          transform: translateY(-1px);
        }

        .detailsBtn:active { transform: translateY(0px); }

        .editBtn {
          padding: 8px 16px;
          margin-right: 10px;
          margin-bottom: 10px;
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.16);
          border-radius: 999px;
          font-size: 0.9rem;
          font-weight: 700;
          color: rgba(255,255,255,.92);
          cursor: pointer;
          transition: transform 0.12s ease, background 0.18s ease, border-color 0.18s ease;
        }

        .editBtn:hover {
          background: rgba(255,255,255,0.14);
          border-color: rgba(255,255,255,0.24);
          transform: translateY(-1px);
        }

        .editBtn:active { transform: translateY(0px); }

        .deleteBtn {
          padding: 8px 16px;
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.22);
          border-radius: 999px;
          font-size: 0.9rem;
          font-weight: 800;
          color: rgba(255, 138, 128, 0.95);
          cursor: pointer;
          transition: transform 0.12s ease, background 0.18s ease, border-color 0.18s ease, color 0.18s ease;
        }

        .deleteBtn:hover {
          background: rgba(239, 68, 68, 0.22);
          border-color: rgba(239, 68, 68, 0.34);
          color: rgba(255,255,255,.95);
          transform: translateY(-1px);
        }

        .deleteBtn:active { transform: translateY(0px); }

        .loadingText, .emptyText {
          text-align: center;
          color: rgba(255,255,255,0.70);
          padding: 36px 10px;
          font-size: 1.05rem;
        }

        .paginationContainer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 18px;
          flex-wrap: wrap;
          gap: 14px;
        }

        .paginationControls {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .pageButton {
          padding: 10px 14px;
          min-width: 44px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 999px;
          font-size: 0.95rem;
          color: rgba(255,255,255,.92);
          cursor: pointer;
          transition: transform 0.12s ease, background 0.18s ease, border-color 0.18s ease;
        }

        .pageButton:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.22);
          transform: translateY(-1px);
        }

        .pageButton:disabled {
          opacity: 0.35;
          cursor: not-allowed;
          transform: none;
        }

        .pageInfo {
          color: rgba(255,255,255,0.78);
          font-size: 0.95rem;
          margin: 0 8px;
        }

        .rowsPerPage {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,0.78);
        }

        .rowsSelect {
          padding: 8px 14px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 999px;
          color: rgba(255,255,255,.92);
          font-size: 0.95rem;
          outline: none;
          cursor: pointer;
          transition: background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
        }

        .rowsSelect:focus {
          border-color: rgba(99,102,241,.40);
          box-shadow: 0 0 0 4px rgba(99,102,241,.14);
        }
      `}</style>

            <div className="glassCard">
                <h2 className="cardTitle">📋 Registered Students</h2>

                {loading && studentsLength === 0 ? (
                    <p className="loadingText">Loading students...</p>
                ) : filteredLength === 0 ? (
                    <p className="emptyText">No students found.</p>
                ) : (
                    <>
                        <div className="tableWrapper">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th className="th" onClick={() => onSort("id")}>
                                        ID{sortIndicator("id")}
                                    </th>
                                    <th className="th" onClick={() => onSort("name")}>
                                        Name{sortIndicator("name")}
                                    </th>
                                    <th className="th" onClick={() => onSort("email")}>
                                        Email{sortIndicator("email")}
                                    </th>
                                    <th className="th" onClick={() => onSort("dateOfBirth")}>
                                        Birthdate{sortIndicator("dateOfBirth")}
                                    </th>
                                    <th className="th" onClick={() => onSort("enrollmentDate")}>
                                        Enrollment{sortIndicator("enrollmentDate")}
                                    </th>
                                    <th className="th">Courses</th>
                                    <th className="th" style={{ cursor: "default" }}>
                                        Actions
                                    </th>
                                </tr>
                                </thead>

                                <tbody>
                                {currentItems.map((student) => (
                                    <tr key={student.id} className="rowHover">
                                        <td className="td">{student.id}</td>

                                        <td className="td">
                                            <span
                                                className="studentLink"
                                                onClick={() => student.id && onViewDetails(student.id)}
                                                title="Open student details"
                                            >
                                                {student.firstName} {student.lastName}
                                            </span>
                                        </td>

                                        <td className="td">{student.email}</td>
                                        <td className="td">{String(student.dateOfBirth).split("T")[0]}</td>
                                        <td className="td">{String(student.enrollmentDate).split("T")[0]}</td>

                                        <td className="td">
                                            {student.courses && student.courses.length > 0 ? (
                                                student.courses.map((course) => (
                                                    <span key={course.id} className="courseTag">
                                                        {course.name}
                                                    </span>
                                                ))
                                            ) : (
                                                <span style={{opacity: 0.6}}>No courses</span>
                                            )}
                                        </td>

                                        <td className="td">
                                            {student.id && (
                                                <button
                                                    className="detailsBtn"
                                                    onClick={() => onViewDetails(student.id!)}
                                                >
                                                    Details
                                                </button>
                                            )}

                                            <button
                                                className="editBtn"
                                                onClick={() => onEdit(student)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="deleteBtn"
                                                onClick={() =>
                                                    onDeleteClick(
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

                        <div className="paginationContainer">
                            <div className="rowsPerPage">
                                <span>Rows per page:</span>
                                <select
                                    className="rowsSelect"
                                    value={itemsPerPage}
                                    onChange={onItemsPerPageChange}
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                </select>
                            </div>

                            <div className="paginationControls">
                                <button
                                    className="pageButton"
                                    onClick={() => goToPage(1)}
                                    disabled={currentPage === 1}
                                >
                                    «
                                </button>

                                <button
                                    className="pageButton"
                                    onClick={() => goToPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    ‹
                                </button>

                                <span className="pageInfo">
                                    Page {currentPage} of {totalPages}
                                </span>

                                <button
                                    className="pageButton"
                                    onClick={() => goToPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    ›
                                </button>

                                <button
                                    className="pageButton"
                                    onClick={() => goToPage(totalPages)}
                                    disabled={currentPage === totalPages}
                                >
                                    »
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default StudentsTableCard;