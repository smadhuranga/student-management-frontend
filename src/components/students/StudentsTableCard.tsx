import React from "react";
import type {Student} from "../../types/Student";

type Props = {
    loading: boolean;
    studentsLength: number; // original students.length (for loading message logic)
    filteredLength: number;
    currentItems: Student[];
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;

    onEdit: (student: Student) => void;
    onDeleteClick: (id: number, firstName: string, lastName: string) => void;

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
                                                onSort,
                                                sortIndicator,
                                                onItemsPerPageChange,
                                                goToPage,
                                            }) => {
    return (
        <>
            <style>{`
        .tableWrapper { overflow-x: auto; border-radius: 24px; background: rgba(0,0,0,0.1); }

        .table { width: 100%; border-collapse: collapse; font-size: 1rem; color: white; }

        .th {
          text-align: left;
          padding: 18px 16px;
          background: rgba(255,255,255,0.08);
          font-weight: 600;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.9);
          cursor: pointer;
          user-select: none;
          transition: background 0.2s;
        }
        .th:hover { background: rgba(255,255,255,0.15); }

        .td { padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .rowHover:hover { background: rgba(255,255,255,0.1); transition: background 0.2s; }

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
        .editBtn:hover { background: rgba(255,255,255,0.25); border-color: rgba(255,255,255,0.4); }

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
        .deleteBtn:hover { background: rgba(231, 76, 60, 0.4); border-color: rgba(231, 76, 60, 0.6); color: white; }

        .loadingText, .emptyText {
          text-align: center;
          color: rgba(255,255,255,0.7);
          padding: 40px;
          font-size: 1.2rem;
        }

        .paginationContainer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .paginationControls { display: flex; gap: 12px; align-items: center; }

        .pageButton {
          padding: 10px 18px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 30px;
          font-size: 0.95rem;
          color: white;
          cursor: pointer;
          transition: all 0.2s;
          min-width: 40px;
        }

        .pageButton:hover:not(:disabled) {
          background: rgba(255,255,255,0.2);
          border-color: rgba(255,255,255,0.4);
        }
        .pageButton:disabled { opacity: 0.3; cursor: not-allowed; }

        .pageInfo { color: rgba(255,255,255,0.8); font-size: 0.95rem; margin: 0 12px; }

        .rowsPerPage { display: flex; align-items: center; gap: 10px; color: rgba(255,255,255,0.8); }
        .rowsSelect {
          padding: 8px 16px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 30px;
          color: white;
          font-size: 0.95rem;
          outline: none;
          cursor: pointer;
        }
        .rowsSelect option { background: #302b63; color: white; }

        @media (max-width: 640px) {
          .paginationContainer { flex-direction: column; align-items: flex-start; }
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
                                    <th className="th" onClick={() => onSort("id")}>ID{sortIndicator("id")}</th>
                                    <th className="th" onClick={() => onSort("name")}>Name{sortIndicator("name")}</th>
                                    <th className="th"
                                        onClick={() => onSort("email")}>Email{sortIndicator("email")}</th>
                                    <th className="th"
                                        onClick={() => onSort("dateOfBirth")}>Birthdate{sortIndicator("dateOfBirth")}</th>
                                    <th className="th"
                                        onClick={() => onSort("enrollmentDate")}>Enrollment{sortIndicator("enrollmentDate")}</th>
                                    <th className="th" style={{cursor: "default"}}>Actions</th>
                                </tr>
                                </thead>

                                <tbody>
                                {currentItems.map((student) => (
                                    <tr key={student.id} className="rowHover">
                                        <td className="td">{student.id}</td>
                                        <td className="td">{student.firstName} {student.lastName}</td>
                                        <td className="td">{student.email}</td>
                                        <td className="td">{student.dateOfBirth}</td>
                                        <td className="td">{student.enrollmentDate}</td>
                                        <td className="td">
                                            <button className="editBtn" onClick={() => onEdit(student)}>Edit</button>
                                            <button
                                                className="deleteBtn"
                                                onClick={() => onDeleteClick(student.id!, student.firstName, student.lastName)}
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
                                <select className="rowsSelect" value={itemsPerPage} onChange={onItemsPerPageChange}>
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                </select>
                            </div>

                            <div className="paginationControls">
                                <button className="pageButton" onClick={() => goToPage(1)}
                                        disabled={currentPage === 1}>«
                                </button>
                                <button className="pageButton" onClick={() => goToPage(currentPage - 1)}
                                        disabled={currentPage === 1}>‹
                                </button>
                                <span className="pageInfo">Page {currentPage} of {totalPages}</span>
                                <button className="pageButton" onClick={() => goToPage(currentPage + 1)}
                                        disabled={currentPage === totalPages}>›
                                </button>
                                <button className="pageButton" onClick={() => goToPage(totalPages)}
                                        disabled={currentPage === totalPages}>»
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