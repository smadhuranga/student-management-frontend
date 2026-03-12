import React, { useMemo, useState } from "react";
import type { Course } from "../../types/Course";

type Props = {
    courses: Course[];
    loading: boolean;
    onEdit: (course: Course) => void;
    onDeleteClick: (id: number, courseName: string) => void;
    onManageEnrollments: (course: Course) => void;
};

type SortKey = "id" | "courseName" | "courseCode" | "description";
type SortDir = "asc" | "desc";

const CoursesTableCard: React.FC<Props> = ({
                                               courses,
                                               loading,
                                               onEdit,
                                               onDeleteClick,
                                               onManageEnrollments,
                                           }) => {
    const [sortKey, setSortKey] = useState<SortKey>("id");
    const [sortDir, setSortDir] = useState<SortDir>("asc");
    const [pageSize, setPageSize] = useState<number>(10);
    const [page, setPage] = useState<number>(1);

    const toggleSort = (key: SortKey) => {
        setPage(1);
        setSortKey((prevKey) => {
            if (prevKey === key) {
                setSortDir((d) => (d === "asc" ? "desc" : "asc"));
                return prevKey;
            }
            setSortDir("asc");
            return key;
        });
    };

    const sortIndicator = (key: SortKey) => {
        if (sortKey !== key) return "";
        return sortDir === "asc" ? " ▲" : " ▼";
    };

    const sortedCourses = useMemo(() => {
        const arr = [...courses];
        const dir = sortDir === "asc" ? 1 : -1;

        arr.sort((a, b) => {
            if (sortKey === "id") {
                const av = a.id ?? Number.POSITIVE_INFINITY;
                const bv = b.id ?? Number.POSITIVE_INFINITY;
                return (av - bv) * dir;
            }

            if (sortKey === "courseName") {
                const av = (a.courseName ?? "").toLowerCase();
                const bv = (b.courseName ?? "").toLowerCase();
                return av.localeCompare(bv) * dir;
            }

            if (sortKey === "courseCode") {
                const av = (a.courseCode ?? "").toLowerCase();
                const bv = (b.courseCode ?? "").toLowerCase();
                return av.localeCompare(bv) * dir;
            }

            const av = (a.description ?? "").toLowerCase();
            const bv = (b.description ?? "").toLowerCase();
            return av.localeCompare(bv) * dir;
        });

        return arr;
    }, [courses, sortKey, sortDir]);

    const totalItems = sortedCourses.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    const safePage = Math.min(Math.max(page, 1), totalPages);

    const paginatedCourses = useMemo(() => {
        const start = (safePage - 1) * pageSize;
        const end = start + pageSize;
        return sortedCourses.slice(start, end);
    }, [sortedCourses, safePage, pageSize]);
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

        :root{
          --card: rgba(255,255,255,.06);
          --stroke: rgba(255,255,255,.12);
          --stroke2: rgba(255,255,255,.16);
          --text: rgba(255,255,255,.92);
          --muted: rgba(255,255,255,.65);
          --shadow: 0 20px 60px rgba(0,0,0,.45);
          --radius: 18px;
          --primaryA:#6366f1;
          --primaryB:#2563eb;
          --dangerA:#ef4444;
          --dangerB:#b91c1c;
          --successA:#10b981;
          --successB:#059669;
          --dropdownBg: rgba(15, 23, 42, .96);
          --dropdownText: rgba(255,255,255,.90);
          --dropdownBorder: rgba(255,255,255,.16);
        }

        .ct *{ font-family: 'Inter', sans-serif; }

        .card{
          margin-top: 18px;
          background: linear-gradient(180deg, rgba(17,24,39,.72), rgba(15,23,42,.55));
          border: 1px solid var(--stroke);
          border-radius: var(--radius);
          padding: 18px;
          box-shadow: var(--shadow);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          position: relative;
          overflow: hidden;
        }

        .glow{
          position:absolute;
          inset:-140px;
          background:
            radial-gradient(520px 260px at 15% 0%, rgba(99,102,241,.14), transparent 60%),
            radial-gradient(520px 260px at 90% 10%, rgba(37,99,235,.12), transparent 60%);
          pointer-events:none;
        }

        .topbar{
          display:flex;
          align-items:flex-end;
          justify-content:space-between;
          gap:12px;
          margin-bottom: 12px;
          position: relative;
        }

        .titleWrap{ display:grid; gap: 6px; }

        .title{
          margin:0;
          font-family: 'Poppins', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--text);
          letter-spacing:.2px;
        }

        .meta{
          font-size: 12px;
          color: rgba(255,255,255,.70);
        }

        .controls{
          display:flex;
          gap:10px;
          align-items:center;
          flex-wrap: wrap;
        }

        .chip{
          display:inline-flex;
          align-items:center;
          gap:10px;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(255,255,255,.06);
          border: 1px solid var(--stroke2);
          color: rgba(255,255,255,.78);
          font-size: 12px;
          user-select:none;
          white-space: nowrap;
        }

        .select{
          color-scheme: dark;
          background-color: var(--dropdownBg);
          color: var(--dropdownText);
          border: 1px solid var(--dropdownBorder);
          border-radius: 999px;
          padding: 8px 34px 8px 12px;
          outline: none;
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          line-height: 1.2;
          font-weight: 700;
        }

        .selectWrap{
          position: relative;
          display:inline-flex;
          align-items:center;
        }

        .selectWrap::after{
          content: "▾";
          position: absolute;
          right: 12px;
          pointer-events: none;
          color: rgba(255,255,255,.75);
          font-size: 12px;
        }

        .select option{
          background-color: rgba(15, 23, 42, 1);
          color: rgba(255,255,255,.92);
        }

        .tableWrap{
          overflow:auto;
          border-radius: 14px;
          border: 1px solid var(--stroke);
          background: rgba(255,255,255,.03);
          position: relative;
        }

        table{
          width:100%;
          border-collapse: collapse;
          color: var(--text);
          min-width: 1100px;
          table-layout: fixed;
        }

        thead th{
          position: sticky;
          top: 0;
          z-index: 1;
          background: rgba(15, 23, 42, .86);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255,255,255,.10);
        }

        th, td{
          padding: 14px 14px;
          border-bottom: 1px solid rgba(255,255,255,.08);
          text-align: left;
          vertical-align: middle;
        }

        th{
          font-size: 12px;
          letter-spacing: .22px;
          text-transform: uppercase;
          color: rgba(255,255,255,.72);
          user-select:none;
        }

        tr:hover td{
          background: rgba(255,255,255,.03);
        }

        .muted{
          color: var(--muted);
          font-size: 13px;
        }

        .cellEllipsis{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .actionsCell{
          display:flex;
          justify-content:flex-start;
          gap:10px;
          flex-wrap: wrap;
        }

        .btn{
          border: 0;
          border-radius: 999px;
          padding: 8px 12px;
          cursor: pointer;
          color: white;
          font-weight: 700;
          letter-spacing: .2px;
          transition: transform .08s ease, opacity .15s ease, box-shadow .15s ease;
          display:inline-flex;
          align-items:center;
          gap:8px;
        }

        .btn:active{ transform: translateY(1px); }
        .btn[disabled]{ opacity:.55; cursor:not-allowed; }

        .edit{
          background: linear-gradient(135deg, var(--primaryA), var(--primaryB));
          box-shadow: 0 12px 30px rgba(37,99,235,.18);
        }

        .delete{
          background: linear-gradient(135deg, var(--dangerA), var(--dangerB));
          box-shadow: 0 12px 30px rgba(239,68,68,.14);
        }

        .manage{
          background: linear-gradient(135deg, var(--successA), var(--successB));
          box-shadow: 0 12px 30px rgba(16,185,129,.18);
        }

        .sortBtn{
          all: unset;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .sortBtn:hover{
          color: rgba(255,255,255,.9);
        }

        .empty{
          padding: 18px;
          color: rgba(255,255,255,.72);
        }

        .footer{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap: 12px;
          margin-top: 12px;
          flex-wrap: wrap;
          position: relative;
        }

        .pager{
          display:flex;
          gap: 8px;
          align-items:center;
          flex-wrap: wrap;
        }

        .pageBtn{
          border: 1px solid var(--stroke2);
          background: rgba(255,255,255,.06);
          color: rgba(255,255,255,.86);
          border-radius: 999px;
          padding: 8px 12px;
          cursor:pointer;
          font-weight: 700;
          transition: transform .08s ease, opacity .15s ease, background .15s ease;
        }

        .pageBtn:active{ transform: translateY(1px); }
        .pageBtn[disabled]{ opacity:.55; cursor:not-allowed; }

        .pageBtnActive{
          border-color: rgba(99,102,241,.55);
          background: rgba(99,102,241,.14);
        }

        .range{
          color: rgba(255,255,255,.70);
          font-size: 12px;
        }
      `}</style>

            <div className="ct card">
                <div className="glow" />

                <div className="topbar">
                    <div className="titleWrap">
                        <h3 className="title">Courses</h3>
                        <div className="meta">
                            Click column headers to sort. Use pagination to browse results.
                        </div>
                    </div>

                    <div className="controls">
                        <span className="chip">{sortedCourses.length} total</span>

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
                            <col style={{ width: "90px" }} />
                            <col style={{ width: "240px" }} />
                            <col style={{ width: "180px" }} />
                            <col style={{ width: "auto" }} />
                            <col style={{ width: "360px" }} />
                        </colgroup>

                        <thead>
                        <tr>
                            <th>
                                <button type="button" className="sortBtn" onClick={() => toggleSort("id")}>
                                    ID{sortIndicator("id")}
                                </button>
                            </th>
                            <th>
                                <button type="button" className="sortBtn" onClick={() => toggleSort("courseName")}>
                                    Name{sortIndicator("courseName")}
                                </button>
                            </th>
                            <th>
                                <button type="button" className="sortBtn" onClick={() => toggleSort("courseCode")}>
                                    Course Code{sortIndicator("courseCode")}
                                </button>
                            </th>
                            <th>
                                <button type="button" className="sortBtn" onClick={() => toggleSort("description")}>
                                    Description{sortIndicator("description")}
                                </button>
                            </th>
                            <th>Actions</th>
                        </tr>
                        </thead>

                        <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="empty">
                                    Loading…
                                </td>
                            </tr>
                        ) : sortedCourses.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="empty">
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
                        {sortedCourses.length === 0 ? (
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