import React from "react";
import type {Student} from "../../types/Student";

type Props = {
    editingId: number | null;
    formData: Student;
    loading: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
};

const StudentFormCard: React.FC<Props> = ({
                                              editingId,
                                              formData,
                                              loading,
                                              onChange,
                                              onEmailChange,
                                              onSubmit,
                                          }) => {
    return (
        <>
            <style>{`
        .form { display: flex; flex-direction: column; gap: 24px; }
        .row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .field { display: flex; flex-direction: column; gap: 8px; }
        .label { font-size: 0.95rem; font-weight: 500; color: rgba(255,255,255,0.8); margin-left: 8px; }

        .input {
          padding: 16px 20px;
          font-size: 1rem;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 30px;
          outline: none;
          color: white;
          transition: all 0.2s;
          box-sizing: border-box;
          width: 100%;
        }

        .input:focus {
          background: rgba(255,255,255,0.15);
          border-color: rgba(255,255,255,0.4);
        }

        .input::placeholder { color: rgba(255,255,255,0.5); }

        .primaryButton {
          padding: 18px 28px;
          background: linear-gradient(145deg, #667eea, #764ba2);
          border: none;
          border-radius: 40px;
          font-size: 1.2rem;
          font-weight: 600;
          color: white;
          cursor: pointer;
          box-shadow: 0 12px 30px rgba(102,126,234,0.4);
          transition: transform 0.2s, box-shadow 0.2s;
          margin-top: 16px;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .primaryButton:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 18px 40px rgba(102,126,234,0.6);
        }

        .primaryButton:disabled { opacity: 0.6; cursor: not-allowed; }

        @media (max-width: 640px) { .row { grid-template-columns: 1fr; } }
      `}</style>

            <div className="glassCard">
                <h2 className="cardTitle">{editingId ? "✏️ Edit Student" : "➕ Add New Student"}</h2>

                <form onSubmit={onSubmit} className="form">
                    <div className="row">
                        <div className="field">
                            <label className="label">First name</label>
                            <input
                                name="firstName"
                                placeholder="John"
                                value={formData.firstName}
                                onChange={onChange}
                                required
                                className="input"
                            />
                        </div>

                        <div className="field">
                            <label className="label">Last name</label>
                            <input
                                name="lastName"
                                placeholder="Doe"
                                value={formData.lastName}
                                onChange={onChange}
                                required
                                className="input"
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Email address</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="john.doe@example.com"
                            value={formData.email}
                            onChange={onEmailChange}
                            required
                            className="input"
                        />
                    </div>

                    <div className="row">
                        <div className="field">
                            <label className="label">Date of birth</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={onChange}
                                required
                                className="input"
                            />
                        </div>

                        <div className="field">
                            <label className="label">Enrollment date</label>
                            <input
                                type="date"
                                name="enrollmentDate"
                                value={formData.enrollmentDate}
                                onChange={onChange}
                                required
                                className="input"
                            />
                        </div>
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