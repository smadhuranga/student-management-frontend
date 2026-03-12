import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import type { Course } from "../../types/Course";
import type { Student } from "../../types/Student";
import type { CourseStudent } from "../../types/CourseStudent";
import { getStudents } from "../../services/studentservice";
import {
    enrollStudent,
    getCourseStudents,
    removeStudent,
} from "../../services/courseservice";

type Props = {
    show: boolean;
    course: Course | null;
    onClose: () => void;
    onUpdated?: () => Promise<void> | void;
};

type SortKey = "studentName" | "email" | "enrolledDate";
type SortDir = "asc" | "desc";

const CourseEnrollmentModal: React.FC<Props> = ({
                                                    show,
                                                    course,
                                                    onClose,
                                                    onUpdated,
                                                }) => {
    const [allStudents, setAllStudents] = useState<Student[]>([]);
    const [enrolledStudents, setEnrolledStudents] = useState<CourseStudent[]>([]);
    const [selectedStudentId, setSelectedStudentId] = useState<number | "">("");
    const [loading, setLoading] = useState(false);

    const [sortKey, setSortKey] = useState<SortKey>("enrolledDate");
    const [sortDir, setSortDir] = useState<SortDir>("desc");

    const [pageSize, setPageSize] = useState<number>(5);
    const [page, setPage] = useState<number>(1);

    const loadData = async () => {
        if (!course?.id) return;

        setLoading(true);
        try {
            const [students, enrolled] = await Promise.all([
                getStudents(),
                getCourseStudents(course.id),
            ]);

            setAllStudents(students);
            setEnrolledStudents(enrolled);
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to load enrollment data", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (show && course?.id) {
            void loadData();
        }
    }, [show, course?.id]);

    useEffect(() => {
        setPage(1);
    }, [sortKey, sortDir, pageSize, enrolledStudents.length]);

    const availableStudents = useMemo(() => {
        const enrolledIds = new Set(enrolledStudents.map((s) => s.studentId));
        return allStudents.filter((s) => s.id && !enrolledIds.has(s.id));
    }, [allStudents, enrolledStudents]);

    const handleEnroll = async () => {
        if (!course?.id || !selectedStudentId) {
            Swal.fire("Validation Error", "Please select a student", "warning");
            return;
        }

        setLoading(true);
        try {
            await enrollStudent(course.id, Number(selectedStudentId));
            Swal.fire("Success", "Student enrolled successfully", "success");
            setSelectedStudentId("");
            await loadData();
            await onUpdated?.();
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to enroll student", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (studentId: number, studentName: string) => {
        if (!course?.id) return;

        const result = await Swal.fire({
            title: "Remove student?",
            text: `Remove ${studentName} from ${course.courseName}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, remove",
        });

        if (!result.isConfirmed) return;

        setLoading(true);
        try {
            await removeStudent(course.id, studentId);
            Swal.fire("Removed", "Student removed from course", "success");
            await loadData();
            await onUpdated?.();
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to remove student", "error");
        } finally {
            setLoading(false);
        }
    };

    const toggleSort = (key: SortKey) => {
        setPage(1);
        if (sortKey === key) {
            setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortKey(key);
            setSortDir(key === "enrolledDate" ? "desc" : "asc");
        }
    };

    const sortIndicator = (key: SortKey) => {
        if (sortKey !== key) return "";
        return sortDir === "asc" ? " ▲" : " ▼";
    };

    const sortedStudents = useMemo(() => {
        const arr = [...enrolledStudents];
        const dir = sortDir === "asc" ? 1 : -1;

        arr.sort((a, b) => {
            if (sortKey === "studentName") {
                return a.studentName.toLowerCase().localeCompare(b.studentName.toLowerCase()) * dir;
            }

            if (sortKey === "email") {
                return a.email.toLowerCase().localeCompare(b.email.toLowerCase()) * dir;
            }

            const av = a.enrolledDate ? new Date(a.enrolledDate).getTime() : 0;
            const bv = b.enrolledDate ? new Date(b.enrolledDate).getTime() : 0;
            return (av - bv) * dir;
        });

        return arr;
    }, [enrolledStudents, sortKey, sortDir]);

    const totalItems = sortedStudents.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    const safePage = Math.min(Math.max(page, 1), totalPages);

    const paginatedStudents = useMemo(() => {
        const start = (safePage - 1) * pageSize;
        const end = start + pageSize;
        return sortedStudents.slice(start, end);
    }, [sortedStudents, safePage, pageSize]);

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

    if (!show || !course) return null;

    return (
        <>
            <style>{`
        .cemOverlay{
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,.66);
          display:flex;
          align-items:center;
          justify-content:center;
          padding: 20px;
          z-index: 70;
        }

        .cemModal{
          width: min(1080px, 100%);
          max-height: 90vh;
          overflow: auto;
          border-radius: 20px;
          padding: 20px;
          background: linear-gradient(180deg, rgba(17,24,39,.95), rgba(15,23,42,.92));
          border: 1px solid rgba(255,255,255,.12);
          box-shadow: 0 24px 70px rgba(0,0,0,.4);
          color: rgba(255,255,255,.92);
        }

        .cemHeader{
          display:flex;
          justify-content:space-between;
          gap:12px;
          align-items:flex-start;
          margin-bottom: 18px;
        }

        .cemTitle{
          margin:0;
          font-size: 22px;
          font-weight: 700;
        }

        .cemSub{
          margin:6px 0 0 0;
          color: rgba(255,255,255,.68);
          font-size: 13px;
          line-height: 1.6;
        }

        .cemCourseMeta{
          display:flex;
          flex-wrap:wrap;
          gap:10px;
          margin-top: 10px;
        }

        .cemBadge{
          display:inline-flex;
          align-items:center;
          gap:8px;
          padding: 7px 12px;
          border-radius: 999px;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.12);
          color: rgba(255,255,255,.84);
          font-size: 12px;
          font-weight: 600;
        }

        .cemClose{
          border: 1px solid rgba(255,255,255,.14);
          background: rgba(255,255,255,.06);
          color: white;
          border-radius: 999px;
          padding: 10px 14px;
          cursor: pointer;
        }

        .cemStack{
          display:grid;
          grid-template-columns: 1fr;
          gap: 18px;
        }

        .cemCard{
          border-radius: 18px;
          padding: 16px;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.10);
        }

        .cemCardTitle{
          margin:0 0 12px 0;
          font-size: 16px;
          font-weight: 700;
        }

        .cemEnrollGrid{
          display:grid;
          grid-template-columns: minmax(0, 1fr) 220px;
          gap: 12px;
          align-items:end;
        }

        .cemLabel{
          display:block;
          margin-bottom: 8px;
          font-size: 13px;
          color: rgba(255,255,255,.76);
        }

        .cemSelect{
          width:100%;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,.14);
          background: rgba(255,255,255,.06);
          color: white;
          padding: 12px;
          outline: none;
        }

        .cemSelect option{
          background: #0f172a;
          color: white;
        }

        .cemBtn{
          border: 0;
          border-radius: 999px;
          padding: 11px 14px;
          cursor:pointer;
          font-weight:700;
          color:white;
          background: linear-gradient(135deg, #6366f1, #2563eb);
          width: 100%;
        }

        .cemBtn[disabled]{
          opacity:.6;
          cursor:not-allowed;
        }

        .cemTableTopbar{
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:12px;
          flex-wrap:wrap;
          margin-bottom: 12px;
        }

        .cemTableMeta{
          color: rgba(255,255,255,.72);
          font-size: 13px;
        }

        .cemRowsWrap{
          display:flex;
          align-items:center;
          gap:10px;
          color: rgba(255,255,255,.76);
          font-size: 13px;
        }

        .cemRowsSelect{
          color-scheme: dark;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.14);
          color: white;
          border-radius: 999px;
          padding: 8px 12px;
          outline: none;
          cursor: pointer;
        }

        .cemRowsSelect option{
          background: #0f172a;
          color: white;
        }

        .cemTableWrap{
          overflow:auto;
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 16px;
        }

        .cemTable{
          width:100%;
          border-collapse: collapse;
          min-width: 760px;
          table-layout: fixed;
        }

        .cemTable col:nth-child(1){ width: 28%; }
        .cemTable col:nth-child(2){ width: 34%; }
        .cemTable col:nth-child(3){ width: 20%; }
        .cemTable col:nth-child(4){ width: 18%; }

        .cemTable th,
        .cemTable td{
          padding: 12px 14px;
          border-bottom: 1px solid rgba(255,255,255,.08);
          text-align: left;
          vertical-align: middle;
        }

        .cemTable th{
          background: rgba(255,255,255,.05);
          color: rgba(255,255,255,.75);
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: .04em;
          white-space: nowrap;
        }

        .cemSortBtn{
          all: unset;
          cursor: pointer;
          display:inline-flex;
          align-items:center;
          gap: 6px;
        }

        .cemSortBtn:hover{
          color: rgba(255,255,255,.92);
        }

        .cemStudentName{
          font-weight: 700;
          color: rgba(255,255,255,.95);
          line-height: 1.4;
          word-break: break-word;
        }

        .cemEmail{
          color: rgba(255,255,255,.84);
          line-height: 1.45;
          white-space: normal;
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        .cemDate{
          color: rgba(255,255,255,.84);
          white-space: nowrap;
        }

        .cemActionCell{
          white-space: nowrap;
        }

        .cemActionBtn{
          border: 0;
          border-radius: 999px;
          padding: 8px 12px;
          cursor:pointer;
          font-weight:700;
          color:white;
          background: linear-gradient(135deg, #ef4444, #b91c1c);
        }

        .cemActionBtn[disabled]{
          opacity:.6;
          cursor:not-allowed;
        }

        .cemFooter{
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 12px;
        }

        .cemRange{
          color: rgba(255,255,255,.70);
          font-size: 12px;
        }

        .cemPager{
          display:flex;
          gap: 8px;
          align-items:center;
          flex-wrap: wrap;
        }

        .cemPageBtn{
          border: 1px solid rgba(255,255,255,.14);
          background: rgba(255,255,255,.06);
          color: rgba(255,255,255,.86);
          border-radius: 999px;
          padding: 8px 12px;
          cursor:pointer;
          font-weight: 700;
          transition: transform .08s ease, opacity .15s ease, background .15s ease;
        }

        .cemPageBtn:active{ transform: translateY(1px); }
        .cemPageBtn[disabled]{ opacity:.55; cursor:not-allowed; }

        .cemPageBtnActive{
          border-color: rgba(99,102,241,.55);
          background: rgba(99,102,241,.14);
        }

        .cemEmpty{
          color: rgba(255,255,255,.7);
          font-size: 14px;
          padding: 8px 0;
        }

        @media (max-width: 860px){
          .cemModal{
            width: min(100%, 100%);
            padding: 16px;
          }

          .cemEnrollGrid{
            grid-template-columns: 1fr;
          }
        }
      `}</style>

            <div className="cemOverlay">
                <div className="cemModal">
                    <div className="cemHeader">
                        <div>
                            <h2 className="cemTitle">Manage Enrollments</h2>
                            <p className="cemSub">
                                Manage students enrolled in this course.
                            </p>

                            <div className="cemCourseMeta">
                                <span className="cemBadge">
                                    Course Name: <strong>{course.courseName}</strong>
                                </span>

                                <span className="cemBadge">
                                    Course Code: <strong>{course.courseCode || "-"}</strong>
                                </span>

                                {course.id && (
                                    <span className="cemBadge">
                                        Course ID: <strong>{course.id}</strong>
                                    </span>
                                )}
                            </div>
                        </div>

                        <button type="button" className="cemClose" onClick={onClose}>
                            Close
                        </button>
                    </div>

                    <div className="cemStack">
                        <div className="cemCard">
                            <h3 className="cemCardTitle">Enroll Student</h3>

                            <div className="cemEnrollGrid">
                                <div>
                                    <label className="cemLabel">Select student</label>
                                    <select
                                        className="cemSelect"
                                        value={selectedStudentId}
                                        onChange={(e) =>
                                            setSelectedStudentId(
                                                e.target.value ? Number(e.target.value) : ""
                                            )
                                        }
                                        disabled={loading}
                                    >
                                        <option value="">-- Select student --</option>
                                        {availableStudents.map((student) => (
                                            <option key={student.id} value={student.id}>
                                                {student.firstName} {student.lastName} ({student.email})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="cemLabel">&nbsp;</label>
                                    <button
                                        type="button"
                                        className="cemBtn"
                                        onClick={handleEnroll}
                                        disabled={loading || availableStudents.length === 0}
                                    >
                                        {loading ? "Working..." : "Enroll Student"}
                                    </button>
                                </div>
                            </div>

                            {availableStudents.length === 0 && (
                                <p className="cemEmpty" style={{ marginTop: 10 }}>
                                    No available students to enroll.
                                </p>
                            )}
                        </div>

                        <div className="cemCard">
                            <div className="cemTableTopbar">
                                <div>
                                    <h3 className="cemCardTitle" style={{ marginBottom: 4 }}>
                                        Enrolled Students
                                    </h3>
                                    <div className="cemTableMeta">
                                        {totalItems} total enrolled student{totalItems === 1 ? "" : "s"}
                                    </div>
                                </div>

                                <div className="cemRowsWrap">
                                    <span>Rows:</span>
                                    <select
                                        className="cemRowsSelect"
                                        value={pageSize}
                                        onChange={(e) => setPageSize(Number(e.target.value))}
                                    >
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={50}>50</option>
                                    </select>
                                </div>
                            </div>

                            {loading ? (
                                <p className="cemEmpty">Loading...</p>
                            ) : enrolledStudents.length === 0 ? (
                                <p className="cemEmpty">No students enrolled in this course yet.</p>
                            ) : (
                                <>
                                    <div className="cemTableWrap">
                                        <table className="cemTable">
                                            <colgroup>
                                                <col />
                                                <col />
                                                <col />
                                                <col />
                                            </colgroup>
                                            <thead>
                                            <tr>
                                                <th>
                                                    <button
                                                        type="button"
                                                        className="cemSortBtn"
                                                        onClick={() => toggleSort("studentName")}
                                                    >
                                                        Student{sortIndicator("studentName")}
                                                    </button>
                                                </th>
                                                <th>
                                                    <button
                                                        type="button"
                                                        className="cemSortBtn"
                                                        onClick={() => toggleSort("email")}
                                                    >
                                                        Email{sortIndicator("email")}
                                                    </button>
                                                </th>
                                                <th>
                                                    <button
                                                        type="button"
                                                        className="cemSortBtn"
                                                        onClick={() => toggleSort("enrolledDate")}
                                                    >
                                                        Enrolled Date{sortIndicator("enrolledDate")}
                                                    </button>
                                                </th>
                                                <th>Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {paginatedStudents.map((student) => (
                                                <tr key={student.studentId}>
                                                    <td>
                                                        <div className="cemStudentName">
                                                            {student.studentName}
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="cemEmail">
                                                            {student.email}
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="cemDate">
                                                            {student.enrolledDate
                                                                ? new Date(student.enrolledDate).toLocaleDateString()
                                                                : "-"}
                                                        </div>
                                                    </td>

                                                    <td className="cemActionCell">
                                                        <button
                                                            type="button"
                                                            className="cemActionBtn"
                                                            onClick={() =>
                                                                handleRemove(student.studentId, student.studentName)
                                                            }
                                                            disabled={loading}
                                                        >
                                                            Remove
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="cemFooter">
                                        <div className="cemRange">
                                            {totalItems === 0
                                                ? "Showing 0 of 0"
                                                : `Showing ${(safePage - 1) * pageSize + 1}-${Math.min(
                                                    safePage * pageSize,
                                                    totalItems
                                                )} of ${totalItems}`}
                                        </div>

                                        <div className="cemPager">
                                            <button
                                                type="button"
                                                className="cemPageBtn"
                                                onClick={() => setPage(1)}
                                                disabled={safePage === 1 || totalItems === 0}
                                            >
                                                « First
                                            </button>

                                            <button
                                                type="button"
                                                className="cemPageBtn"
                                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                                disabled={safePage === 1 || totalItems === 0}
                                            >
                                                ‹ Prev
                                            </button>

                                            {pageNumbers[0] > 1 ? (
                                                <>
                                                    <button
                                                        type="button"
                                                        className="cemPageBtn"
                                                        onClick={() => setPage(1)}
                                                        disabled={totalItems === 0}
                                                    >
                                                        1
                                                    </button>
                                                    <span className="cemRange">…</span>
                                                </>
                                            ) : null}

                                            {pageNumbers.map((n) => (
                                                <button
                                                    key={n}
                                                    type="button"
                                                    className={`cemPageBtn ${
                                                        n === safePage ? "cemPageBtnActive" : ""
                                                    }`}
                                                    onClick={() => setPage(n)}
                                                    disabled={totalItems === 0}
                                                >
                                                    {n}
                                                </button>
                                            ))}

                                            {pageNumbers[pageNumbers.length - 1] < totalPages ? (
                                                <>
                                                    <span className="cemRange">…</span>
                                                    <button
                                                        type="button"
                                                        className="cemPageBtn"
                                                        onClick={() => setPage(totalPages)}
                                                        disabled={totalItems === 0}
                                                    >
                                                        {totalPages}
                                                    </button>
                                                </>
                                            ) : null}

                                            <button
                                                type="button"
                                                className="cemPageBtn"
                                                onClick={() =>
                                                    setPage((p) => Math.min(totalPages, p + 1))
                                                }
                                                disabled={safePage === totalPages || totalItems === 0}
                                            >
                                                Next ›
                                            </button>

                                            <button
                                                type="button"
                                                className="cemPageBtn"
                                                onClick={() => setPage(totalPages)}
                                                disabled={safePage === totalPages || totalItems === 0}
                                            >
                                                Last »
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CourseEnrollmentModal;