import React from "react";
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
    onCourseChange: (courseId: number) => void;
};

const StudentFormCard: React.FC<Props> = ({
                                              editingId,
                                              formData,
                                              loading,
                                              courses,
                                              onChange,
                                              onEmailChange,
                                              onSubmit,
                                              onCourseChange,
                                          }) => {
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700&display=swap');

        :root{
          /* tuned to match your StudentsLayout glassCard */
          --cardBgA: rgba(255,255,255,.07);
          --cardBgB: rgba(255,255,255,.04);
          --stroke: rgba(255,255,255,.10);
          --stroke2: rgba(255,255,255,.16);
          --text: rgba(255,255,255,.94);
          --muted: rgba(255,255,255,.70);

          --shadow:
            0 34px 70px rgba(0,0,0,0.34),
            inset 0 1px 2px rgba(255,255,255,0.08);

          --radius: 32px;

          --primaryA:#6d28d9;
          --primaryB:#2563eb;
          --ring: rgba(99,102,241,.18);
        }

        .sf * { font-family: 'Inter', sans-serif; box-sizing: border-box; }

        /* match .glassCard proportions */
        .card{
          width: 92%;
          max-width: 1200px;
          margin: 0 auto 34px auto;

          position: relative;
          overflow: hidden;

          border-radius: var(--radius);
          padding: 30px;

          background: linear-gradient(180deg, var(--cardBgA), var(--cardBgB));
          border: 1px solid var(--stroke);
          box-shadow: var(--shadow);

          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .glow{
          position:absolute;
          inset:-220px;
          background:
            radial-gradient(520px 320px at 12% 0%, rgba(109,40,217,.18), transparent 62%),
            radial-gradient(520px 320px at 92% 10%, rgba(37,99,235,.16), transparent 62%),
            radial-gradient(520px 340px at 45% 120%, rgba(99,102,241,.10), transparent 64%);
          pointer-events:none;
          filter: blur(6px);
          opacity: .95;
        }

        .title{
          position: relative;
          margin: 0 0 18px 0;
          font-family: 'Poppins', sans-serif;
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.01em;
          text-shadow: 0 10px 24px rgba(0,0,0,.25);
        }

        .form{
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .row{
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .label{
          font-size: 0.95rem;
          color: rgba(255,255,255,.86);
          font-weight: 700;
          margin-bottom: 10px;
          display: inline-block;
          letter-spacing: .2px;
        }

        /* inputs need to look like your search bar / table controls */
        .input{
          width: 100%;
          padding: 14px 16px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.14);

          background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04));
          color: rgba(255,255,255,.92);
          font-size: 1rem;
          font-weight: 600;
          outline: none;

          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.08),
            0 14px 36px rgba(0,0,0,0.18);

          transition: border-color .18s ease, background .18s ease, box-shadow .18s ease, transform .08s ease;
        }

        .input::placeholder{
          color: rgba(255,255,255,.58);
          font-weight: 500;
        }

        .input:focus{
          border-color: rgba(99,102,241,.45);
          background: linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.05));
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.10),
            0 18px 44px rgba(0,0,0,0.24),
            0 0 0 4px var(--ring);
        }

        /* date input icon visibility on dark */
        .input[type="date"]{
          color-scheme: dark;
        }

        .coursesGrid{
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 12px;
          margin-top: 10px;
        }

        /* larger, cleaner course chips/cards */
        .courseItem{
          display:flex;
          align-items:flex-start;
          gap:12px;

          padding: 12px 14px;
          border-radius: 18px;

          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);

          cursor:pointer;
          user-select:none;
          min-height: 56px;

          transition: transform .10s ease, background .18s ease, border-color .18s ease, box-shadow .18s ease;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.06);
        }

        .courseItem:hover{
          background: rgba(255,255,255,0.09);
          border-color: rgba(255,255,255,0.18);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.08),
            0 18px 40px rgba(0,0,0,.20);
          transform: translateY(-1px);
        }

        .courseItem:active{
          transform: translateY(0px);
        }

        .courseItem input[type="checkbox"]{
          width: 18px;
          height: 18px;
          margin-top: 2px;
          accent-color: var(--primaryA);
          cursor: pointer;
          flex: 0 0 auto;
        }

        .courseText{
          color: rgba(255,255,255,.94);
          font-size: 0.95rem;
          font-weight: 800;
          line-height: 1.2;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .courseSub{
          color: rgba(255,255,255,.68);
          font-size: 0.85rem;
          margin-top: 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 600;
        }

        /* button sized like the rest of the page */
        .primaryButton{
          width:35%;
          margin: auto;
          padding: 14px 18px;
          border-radius: 999px;
          border: none;

          background: linear-gradient(135deg, var(--primaryA), var(--primaryB));
          color: white;
          font-size: 1rem;
          font-weight: 900;
          letter-spacing: .2px;

          cursor: pointer;
          transition: transform .10s ease, box-shadow .18s ease, filter .18s ease, opacity .18s ease;

          box-shadow: 0 18px 46px rgba(37,99,235,.22);
        }

        .primaryButton:hover{
          filter: brightness(1.05);
          box-shadow: 0 22px 56px rgba(37,99,235,.28), 0 0 0 4px rgba(99,102,241,.12);
          transform: translateY(-1px);
        }

        .primaryButton:active{
          transform: translateY(0px);
        }

        .primaryButton:disabled{
          opacity: 0.62;
          cursor:not-allowed;
          transform:none;
          filter:none;
          box-shadow: 0 14px 34px rgba(37,99,235,.14);
        }

        @media(max-width:900px){
          .card{ padding: 24px; border-radius: 28px; }
          .coursesGrid{ grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); }
        }

        @media(max-width:640px){
          .row{ grid-template-columns:1fr; }
          .coursesGrid{ grid-template-columns: 1fr; }
          .title{ font-size: 1.35rem; }
        }
      `}</style>

            <div className="sf card">
                <div className="glow" />

                <h2 className="title">
                    {editingId ? "Edit Student" : "Add New Student"}
                </h2>

                <form onSubmit={onSubmit} className="form">
                    {/* FIRST + LAST NAME */}
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

                    {/* EMAIL */}
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={onEmailChange}
                        required
                        className="input"
                    />

                    {/* DATES */}
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

                    {/* COURSE SELECTION */}
                    <div>
                        <label className="label">Select Courses</label>

                        <div className="coursesGrid">
                            {courses.map((course) => {
                                if (course.id === undefined) return null;

                                const checked = formData.courseIds?.includes(course.id) ?? false;

                                return (
                                    <label key={course.id} className="courseItem">
                                        <input
                                            type="checkbox"
                                            checked={checked}
                                            onChange={() => onCourseChange(course.id!)}
                                        />

                                        <div style={{ minWidth: 0 }}>
                                            <div className="courseText" title={course.courseName}>
                                                {course.courseName}
                                            </div>

                                            {course.description ? (
                                                <div className="courseSub" title={course.description}>
                                                    {course.description}
                                                </div>
                                            ) : null}
                                        </div>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    {/* SUBMIT */}
                    <button type="submit" className="primaryButton" disabled={loading}>
                        {loading ? "Processing..." : editingId ? "Update Student" : "Add Student"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default StudentFormCard;