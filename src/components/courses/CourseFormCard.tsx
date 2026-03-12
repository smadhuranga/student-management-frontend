import React from "react";
import type { Course } from "../../types/Course";

type Props = {
    editingId: number | null;
    formData: Course;
    loading: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onCancelEdit?: () => void;
};

const CourseFormCard: React.FC<Props> = ({
                                             editingId,
                                             formData,
                                             loading,
                                             onChange,
                                             onSubmit,
                                             onCancelEdit,
                                         }) => {
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700&display=swap');

        :root{
          --bg:#0b1224;
          --panel: rgba(17,24,39,.72);
          --panel2: rgba(15,23,42,.55);
          --stroke: rgba(255,255,255,.10);
          --stroke2: rgba(255,255,255,.14);
          --text: rgba(255,255,255,.92);
          --muted: rgba(255,255,255,.65);
          --muted2: rgba(255,255,255,.5);
          --shadow: 0 18px 55px rgba(0,0,0,.45);
          --radius: 18px;
          --radius2: 14px;
          --primaryA:#6366f1;
          --primaryB:#2563eb;
        }

        .cf *{ font-family: 'Inter', sans-serif; }

        .cfCard{
          background: linear-gradient(180deg, var(--panel), var(--panel2));
          border: 1px solid var(--stroke);
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          padding: 22px;
          position: relative;
          overflow: hidden;
        }

        .cfGlow{
          position:absolute;
          inset:-120px;
          background:
            radial-gradient(500px 240px at 20% 10%, rgba(99,102,241,.18), transparent 60%),
            radial-gradient(520px 260px at 90% 0%, rgba(37,99,235,.16), transparent 60%),
            radial-gradient(520px 260px at 55% 120%, rgba(168,85,247,.12), transparent 60%);
          pointer-events:none;
        }

        .cfHeader{
          display:flex;
          align-items:flex-start;
          justify-content:space-between;
          gap: 14px;
          position: relative;
        }

        .cfTitle{
          margin: 0;
          font-family: 'Poppins', sans-serif;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: .3px;
          color: var(--text);
        }

        .cfSub{
          margin: 6px 0 0 0;
          font-size: 13px;
          color: var(--muted);
          line-height: 1.45;
        }

        .cfBadge{
          display:inline-flex;
          align-items:center;
          gap:8px;
          padding: 8px 10px;
          border-radius: 999px;
          background: rgba(255,255,255,.06);
          border: 1px solid var(--stroke2);
          color: rgba(255,255,255,.78);
          font-size: 12px;
          white-space: nowrap;
          user-select:none;
        }

        .cfForm{
          margin-top: 16px;
          display:grid;
          gap: 14px;
          position: relative;
        }

        .cfField{
          display:grid;
          gap: 8px;
        }

        .cfFieldGrid{
          display:grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .cfLabelRow{
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:10px;
        }

        .cfLabel{
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,.78);
        }

        .cfHint{
          font-size: 12px;
          color: var(--muted2);
        }

        .cfInput, .cfTextarea{
          margin:auto;
          width: 95%;
          border-radius: var(--radius2);
          border: 1px solid var(--stroke);
          background: rgba(255,255,255,.06);
          color: var(--text);
          padding: 12px 12px;
          outline: none;
          transition: border-color .15s ease, background .15s ease;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.06);
        }

        .cfInput::placeholder, .cfTextarea::placeholder{
          color: rgba(255,255,255,.42);
        }

        .cfInput:focus, .cfTextarea:focus{
          border-color: rgba(99,102,241,.55);
          background: rgba(255,255,255,.08);
        }

        .cfTextarea{
          min-height: 96px;
          resize: vertical;
        }

        .cfActions{
          display:flex;
          gap: 10px;
          align-items:center;
          flex-wrap: wrap;
          margin-top: 2px;
        }

        .cfBtn{
          border: 0;
          border-radius: 999px;
          padding: 10px 14px;
          cursor: pointer;
          font-weight: 700;
          letter-spacing: .2px;
          transition: transform .08s ease, opacity .15s ease, box-shadow .15s ease;
          display:inline-flex;
          align-items:center;
          gap: 10px;
          user-select:none;
        }

        .cfBtn:active{ transform: translateY(1px); }

        .cfPrimary{
          color: white;
          background: linear-gradient(135deg, var(--primaryA), var(--primaryB));
          box-shadow: 0 12px 30px rgba(37,99,235,.22);
        }

        .cfPrimary:hover{
          box-shadow: 0 14px 40px rgba(37,99,235,.28);
        }

        .cfGhost{
          color: rgba(255,255,255,.86);
          background: rgba(255,255,255,.06);
          border: 1px solid var(--stroke2);
        }

        .cfBtn[disabled]{
          opacity:.6;
          cursor:not-allowed;
          filter: grayscale(.2);
        }

        .cfDot{
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: rgba(255,255,255,.7);
          box-shadow: 0 0 0 4px rgba(255,255,255,.10);
        }

        .cfDotLive{
          background: rgba(99,102,241,.95);
          box-shadow: 0 0 0 4px rgba(99,102,241,.18);
        }

        .cfDivider{
          height: 1px;
          background: rgba(255,255,255,.08);
          margin-top: 14px;
        }

        @media (max-width: 720px){
          .cfFieldGrid{
            grid-template-columns: 1fr;
          }
        }
      `}</style>

            <div className="cf cfCard">
                <div className="cfGlow" />

                <div className="cfHeader">
                    <div>
                        <h2 className="cfTitle">{editingId ? "Edit Course" : "Create Course"}</h2>
                        <p className="cfSub">
                            {editingId
                                ? "Update the course details and save changes."
                                : "Add a new course to your catalog."}
                        </p>
                    </div>

                    {editingId ? (
                        <span className="cfBadge">
                            <span className="cfDot cfDotLive" />
                            Editing ID: {editingId}
                        </span>
                    ) : (
                        <span className="cfBadge">
                            <span className="cfDot" />
                            New course
                        </span>
                    )}
                </div>

                <div className="cfDivider" />

                <form onSubmit={onSubmit} className="cfForm">
                    <div className="cfFieldGrid">
                        <div className="cfField">
                            <div className="cfLabelRow">
                                <div className="cfLabel">Course name</div>
                                <div className="cfHint">Required</div>
                            </div>
                            <input
                                className="cfInput"
                                name="courseName"
                                placeholder="e.g. Advanced Web Development"
                                value={formData.courseName}
                                onChange={onChange}
                                autoComplete="off"
                            />
                        </div>

                        <div className="cfField">
                            <div className="cfLabelRow">
                                <div className="cfLabel">Course code</div>
                                <div className="cfHint">Required</div>
                            </div>
                            <input
                                className="cfInput"
                                name="courseCode"
                                placeholder="e.g. CSE101"
                                value={formData.courseCode}
                                onChange={onChange}
                                autoComplete="off"
                            />
                        </div>
                    </div>

                    <div className="cfField">
                        <div className="cfLabelRow">
                            <div className="cfLabel">Description</div>
                            <div className="cfHint">Optional</div>
                        </div>
                        <textarea
                            className="cfTextarea"
                            name="description"
                            placeholder="Write a short description about the course…"
                            value={formData.description ?? ""}
                            onChange={onChange}
                        />
                    </div>

                    <div className="cfActions">
                        <button type="submit" className="cfBtn cfPrimary" disabled={loading}>
                            {loading ? "Please wait…" : editingId ? "Update course" : "Create course"}
                        </button>

                        {editingId && onCancelEdit ? (
                            <button
                                type="button"
                                className="cfBtn cfGhost"
                                onClick={onCancelEdit}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                        ) : null}
                    </div>
                </form>
            </div>
        </>
    );
};

export default CourseFormCard;