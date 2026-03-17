import React, { useMemo, useState } from "react";
import type { Course } from "../../types/Course";

type Props = {
    courses: Course[];
    loading: boolean;
    onEdit: (course: Course) => void;
    onDeleteClick: (id: number, courseName: string) => void;
    onManageEnrollments: (course: Course) => void;
    onSort: (col: string) => void;
    sortIndicator: (col: string) => string;
};

const CoursesTableCard: React.FC<Props> = ({
                                               courses,
                                               loading,
                                               onEdit,
                                               onDeleteClick,
                                               onManageEnrollments,
                                               onSort,
                                               sortIndicator,
                                           }) => {
    const [pageSize, setPageSize] = useState<number>(10);
    const [page, setPage] = useState<number>(1);

    const totalItems = courses.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    const safePage = Math.min(Math.max(page, 1), totalPages);

    const paginatedCourses = useMemo(() => {
        const start = (safePage - 1) * pageSize;
        const end = start + pageSize;
        return courses.slice(start, end);
    }, [courses, safePage, pageSize]);

    const pageNumbers = useMemo(() => {
        const max = 5;
        const half = Math.floor(max / 2);
        let start = Math.max(1, safePage - half);
        const end = Math.min(totalPages, start + max - 1);
        start = Math.max(1, end - max + 1);
        const nums: number[] = [];
        for (let i = start; i <= end; i++) nums.push(i);
        return nums;
    }, [safePage, totalPages]);

    const onChangePageSize = (v: number) => {
        setPageSize(v);
        setPage(1);
    };

    return (
        <>
            <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700&display=swap');

  .ct * { font-family: 'Inter', sans-serif; }

  .card {
    margin-top: 18px;
    background: rgba(17, 25, 40, 0.6);
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 48px;
    padding: 20px;
    box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.6), inset 0 1px 2px rgba(255,255,255,0.05);
    position: relative;
    overflow: hidden;
  }

  .glow {
    position: absolute;
    inset: -140px;
    background: 
      radial-gradient(520px 260px at 15% 0%, rgba(96,165,250,0.1), transparent 60%),
      radial-gradient(520px 260px at 90% 10%, rgba(167,139,250,0.08), transparent 60%);
    pointer-events: none;
  }

  .topbar {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
    position: relative;
  }

  .titleWrap {
    display: grid;
    gap: 6px;
  }

  .title {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    font-weight: 700;
    background: linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.02em;
  }

  .meta {
    font-size: 12px;
    color: #94a3b8;
  }

  .controls {
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    color: #e2e8f0;
    font-size: 12px;
    white-space: nowrap;
  }

  .selectWrap {
    position: relative;
    display: inline-flex;
    align-items: center;
  }

  .select {
    background: rgba(255, 255, 255, 0.03);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 999px;
    padding: 8px 34px 8px 12px;
    outline: none;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    font-weight: 600;
  }
  .select option {
    background: #0b1120;
    color: #fff;
  }
  .selectWrap::after {
    content: "▾";
    position: absolute;
    right: 12px;
    pointer-events: none;
    color: #94a3b8;
    font-size: 12px;
  }

  .tableWrap {
    overflow: auto;
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    background: rgba(255, 255, 255, 0.02);
    position: relative;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    color: #fff;
    min-width: 1200px;
    table-layout: fixed;
  }

  thead th {
    position: sticky;
    top: 0;
    z-index: 1;
    background: rgba(17, 25, 40, 0.8);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  th, td {
    padding: 14px 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
    text-align: left;
    vertical-align: middle;
  }

  th {
    font-size: 12px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #94a3b8;
    font-weight: 600;
  }

  tr:hover td {
    background: rgba(255, 255, 255, 0.02);
  }

  .muted {
    color: #94a3b8;
    font-size: 13px;
  }

  .cellEllipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .actionsCell {
    display: flex;
    justify-content: flex-start;
    gap: 10px;
    flex-wrap: wrap;
  }

  .btn {
    border: 0;
    border-radius: 999px;
    padding: 8px 12px;
    cursor: pointer;
    color: #fff;
    font-weight: 600;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 8px 20px -6px rgba(0, 0, 0, 0.3);
  }
  .btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 25px -6px rgba(0, 0, 0, 0.4);
  }
  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .edit {
    background: linear-gradient(135deg, #475569 0%, #1e293b 100%);
  }
  .delete {
    background: linear-gradient(135deg, #ef4444, #b91c1c);
  }
  .manage {
    background: linear-gradient(135deg, #10b981, #059669);
  }

  .sortBtn {
    all: unset;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #94a3b8;
    transition: color 0.2s ease;
  }
  .sortBtn:hover {
    color: #fff;
  }

  .empty {
    padding: 18px;
    color: #94a3b8;
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: 12px;
    flex-wrap: wrap;
    position: relative;
  }

  .pager {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
  }

  .pageBtn {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.03);
    color: #e2e8f0;
    border-radius: 999px;
    padding: 8px 12px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s ease;
  }
  .pageBtn:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
  }
  .pageBtn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .pageBtnActive {
    border-color: #60a5fa;
    background: rgba(96, 165, 250, 0.15);
  }

  .range {
    color: #94a3b8;
    font-size: 12px;
  }
`}</style>

            <div className="ct card">
                <div className="glow"/>

                <div className="topbar">
                    <div className="titleWrap">
                        <h3 className="title">Courses</h3>
                        <div className="meta">
                            Click column headers to sort. Use pagination to browse results.
                        </div>
                    </div>

                    <div className="controls">
                        <span className="chip">{totalItems} total</span>

                        <span className="chip" title="Rows per page">
                            Rows:
                            <span className="selectWrap">
                                <select
                                    className="select"
                                    value={pageSize}
                                    onChange={(e) => onChangePageSize(Number(e.target.value))}
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                </select>
                            </span>
                        </span>
                    </div>
                </div>

                <div className="tableWrap">
                    <table>
                        <colgroup>
                            <col style={{width: "80px"}}/>
                            <col style={{width: "200px"}}/>
                            <col style={{width: "150px"}}/>
                            <col style={{width: "auto"}}/>
                            <col style={{width: "100px"}}/>
                            <col style={{width: "320px"}}/>
                        </colgroup>

                        <thead>
                        <tr>
                            <th>
                                <button type="button" className="sortBtn" onClick={() => onSort("id")}>
                                    ID{sortIndicator("id")}
                                </button>
                            </th>
                            <th>
                                <button type="button" className="sortBtn" onClick={() => onSort("courseName")}>
                                    Name{sortIndicator("courseName")}
                                </button>
                            </th>
                            <th>
                                <button type="button" className="sortBtn" onClick={() => onSort("courseCode")}>
                                    Course Code{sortIndicator("courseCode")}
                                </button>
                            </th>
                            <th>
                                <button type="button" className="sortBtn" onClick={() => onSort("description")}>
                                    Description{sortIndicator("description")}
                                </button>
                            </th>
                            <th>
                                <button type="button" className="sortBtn" onClick={() => onSort("students")}>
                                    Students{sortIndicator("students")}
                                </button>
                            </th>
                            <th>Actions</th>
                        </tr>
                        </thead>

                        <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="empty">
                                    Loading…
                                </td>
                            </tr>
                        ) : courses.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="empty">
                                    No courses yet.
                                </td>
                            </tr>
                        ) : (
                            paginatedCourses.map((c) => (
                                <tr key={c.id ?? c.courseName}>
                                    <td className="muted">{c.id ?? "-"}</td>
                                    <td className="cellEllipsis" title={c.courseName}>
                                        {c.courseName}
                                    </td>
                                    <td className="muted cellEllipsis" title={c.courseCode}>
                                        {c.courseCode || "-"}
                                    </td>
                                    <td className="muted cellEllipsis" title={c.description ?? ""}>
                                        {c.description ?? "-"}
                                    </td>
                                    <td className="muted">
                                        {c.studentCount ?? 0}
                                    </td>
                                    <td>
                                        <div className="actionsCell">
                                            <button className="btn manage" onClick={() => onManageEnrollments(c)}>
                                                Enrollments
                                            </button>

                                            <button className="btn edit" onClick={() => onEdit(c)}>
                                                Edit
                                            </button>

                                            <button
                                                className="btn delete"
                                                onClick={() => onDeleteClick(c.id ?? 0, c.courseName)}
                                                disabled={!c.id}
                                                title={!c.id ? "Cannot delete a course without an ID" : "Delete"}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>

                <div className="footer">
                    <div className="range">
                        {totalItems === 0 ? (
                            "Showing 0 of 0"
                        ) : (
                            <>
                                Showing {(safePage - 1) * pageSize + 1}–{Math.min(safePage * pageSize, totalItems)} of {totalItems}
                            </>
                        )}
                    </div>

                    <div className="pager">
                        <button
                            type="button"
                            className="pageBtn"
                            onClick={() => setPage(1)}
                            disabled={safePage === 1 || totalItems === 0}
                        >
                            « First
                        </button>

                        <button
                            type="button"
                            className="pageBtn"
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={safePage === 1 || totalItems === 0}
                        >
                            ‹ Prev
                        </button>

                        {pageNumbers[0] > 1 ? (
                            <>
                                <button
                                    type="button"
                                    className="pageBtn"
                                    onClick={() => setPage(1)}
                                    disabled={totalItems === 0}
                                >
                                    1
                                </button>
                                <span className="range">…</span>
                            </>
                        ) : null}

                        {pageNumbers.map((n) => (
                            <button
                                key={n}
                                type="button"
                                className={`pageBtn ${n === safePage ? "pageBtnActive" : ""}`}
                                onClick={() => setPage(n)}
                                disabled={totalItems === 0}
                            >
                                {n}
                            </button>
                        ))}

                        {pageNumbers[pageNumbers.length - 1] < totalPages ? (
                            <>
                                <span className="range">…</span>
                                <button
                                    type="button"
                                    className="pageBtn"
                                    onClick={() => setPage(totalPages)}
                                    disabled={totalItems === 0}
                                >
                                    {totalPages}
                                </button>
                            </>
                        ) : null}

                        <button
                            type="button"
                            className="pageBtn"
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={safePage === totalPages || totalItems === 0}
                        >
                            Next ›
                        </button>

                        <button
                            type="button"
                            className="pageBtn"
                            onClick={() => setPage(totalPages)}
                            disabled={safePage === totalPages || totalItems === 0}
                        >
                            Last »
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CoursesTableCard;