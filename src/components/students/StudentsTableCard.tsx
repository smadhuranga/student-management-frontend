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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700&display=swap');

        .tableWrapper {
          overflow-x: auto;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(255, 255, 255, 0.02);
        }

        .table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.95rem;
          color: #e2e8f0;
          min-width: 980px;
        }

        .th {
          text-align: left;
          padding: 16px 16px;
          background: rgba(255, 255, 255, 0.03);
          font-weight: 600;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          color: #94a3b8;
          cursor: pointer;
          user-select: none;
          transition: all 0.2s ease;
          position: sticky;
          top: 0;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .th:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
        }

        .td {
          padding: 14px 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          color: #e2e8f0;
          vertical-align: top;
        }

        .rowHover:hover td {
          background: rgba(255, 255, 255, 0.02);
        }

        .studentLink {
          color: #fff;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .studentLink:hover {
          color: #60a5fa;
          text-decoration: underline;
        }

        .courseTag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(96, 165, 250, 0.1);
          border: 1px solid rgba(96, 165, 250, 0.2);
          border-radius: 999px;
          padding: 4px 10px;
          margin: 2px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #e2e8f0;
          white-space: nowrap;
        }

        .detailsBtn {
          padding: 8px 16px;
          margin-right: 8px;
          margin-bottom: 8px;
          background: rgba(96, 165, 250, 0.1);
          border: 1px solid rgba(96, 165, 250, 0.2);
          border-radius: 999px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #e2e8f0;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .detailsBtn:hover {
          background: rgba(96, 165, 250, 0.2);
          border-color: rgba(96, 165, 250, 0.3);
          transform: translateY(-1px);
        }

        .editBtn {
          padding: 8px 16px;
          margin-right: 8px;
          margin-bottom: 8px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 999px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #e2e8f0;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .editBtn:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
        }

        .deleteBtn {
          padding: 8px 16px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 999px;
          font-size: 0.9rem;
          font-weight: 700;
          color: #f87171;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .deleteBtn:hover {
          background: rgba(239, 68, 68, 0.2);
          border-color: rgba(239, 68, 68, 0.3);
          color: #fff;
          transform: translateY(-1px);
        }

        .loadingText, .emptyText {
          text-align: center;
          color: #94a3b8;
          padding: 36px 10px;
          font-size: 1rem;
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
          gap: 8px;
          align-items: center;
          flex-wrap: wrap;
        }

        .pageButton {
          padding: 10px 14px;
          min-width: 44px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 999px;
          font-size: 0.95rem;
          color: #e2e8f0;
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
          font-size: 0.95rem;
          margin: 0 8px;
        }

        .rowsPerPage {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #94a3b8;
        }

        .rowsSelect {
          padding: 8px 14px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 999px;
          font-size: 0.95rem;
          outline: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .rowsSelect:focus {
          border-color: #60a5fa;
          box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.15);
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