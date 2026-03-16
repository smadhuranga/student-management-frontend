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

  .cf * { font-family: 'Inter', sans-serif; }

  .cfCard {
    background: rgba(17, 25, 40, 0.6);
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 48px;
    box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.6), inset 0 1px 2px rgba(255,255,255,0.05);
    padding: 24px;
    position: relative;
    overflow: hidden;
  }

  .cfGlow {
    position: absolute;
    inset: -120px;
    background: 
      radial-gradient(500px 240px at 20% 10%, rgba(96,165,250,0.15), transparent 60%),
      radial-gradient(520px 260px at 90% 0%, rgba(167,139,250,0.1), transparent 60%),
      radial-gradient(520px 260px at 55% 120%, rgba(244,114,182,0.08), transparent 60%);
    pointer-events: none;
  }

  .cfHeader {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 14px;
    position: relative;
  }

  .cfTitle {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .cfSub {
    margin: 6px 0 0 0;
    font-size: 13px;
    color: #94a3b8;
    line-height: 1.45;
  }

  .cfBadge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    color: #e2e8f0;
    font-size: 12px;
    white-space: nowrap;
  }

  .cfDot {
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1);
  }

  .cfDotLive {
    background: #60a5fa;
    box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.3);
  }

  .cfDivider {
    height: 1px;
    background: rgba(255, 255, 255, 0.05);
    margin: 16px 0;
  }

  .cfForm {
    display: grid;
    gap: 14px;
    position: relative;
  }

  .cfFieldGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .cfField {
    display: grid;
    gap: 8px;
  }

  .cfLabelRow {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }

  .cfLabel {
    font-size: 13px;
    font-weight: 600;
    color: #e2e8f0;
  }

  .cfHint {
    font-size: 12px;
    color: #94a3b8;
  }

  .cfInput, .cfTextarea {
    width: 95%;
    border-radius: 40px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.03);
    color: #fff;
    padding: 12px 16px;
    outline: none;
    transition: border-color 0.2s ease, background 0.2s ease;
  }
  .cfInput:focus, .cfTextarea:focus {
    border-color: #60a5fa;
    background: rgba(255, 255, 255, 0.05);
  }
  .cfInput::placeholder, .cfTextarea::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  .cfTextarea {
    min-height: 96px;
    resize: vertical;
    border-radius: 24px;
  }

  .cfActions {
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 2px;
  }

  .cfBtn {
    border: 0;
    border-radius: 999px;
    padding: 10px 14px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }

  .cfPrimary {
    color: #fff;
    background: linear-gradient(135deg, #475569 0%, #1e293b 100%);
    box-shadow: 0 10px 25px -8px rgba(0, 0, 0, 0.4);
  }
  .cfPrimary:hover:not(:disabled) {
    background: linear-gradient(135deg, #5f6b7a, #2d3748);
    transform: translateY(-2px);
    box-shadow: 0 15px 30px -8px rgba(0, 0, 0, 0.5);
  }

  .cfGhost {
    color: #e2e8f0;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  .cfGhost:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
  }

  .cfBtn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 720px) {
    .cfFieldGrid {
      grid-template-columns: 1fr;
    }
  }
`}</style>

            <div className="cf cfCard">
                <div className="cfGlow"/>

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
                            <span className="cfDot cfDotLive"/>
                            Editing ID: {editingId}
                        </span>
                    ) : (
                        <span className="cfBadge">
                            <span className="cfDot"/>
                            New course
                        </span>
                    )}
                </div>

                <div className="cfDivider"/>

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