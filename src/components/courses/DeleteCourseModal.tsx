import React from "react";

type Props = {
    show: boolean;
    courseName: string;
    loading?: boolean;
    onCancel: () => void;
    onConfirm: () => void;
};

const DeleteCourseModal: React.FC<Props> = ({
                                                show,
                                                courseName,
                                                loading = false,
                                                onCancel,
                                                onConfirm,
                                            }) => {
    if (!show) return null;

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700&display=swap');

        :root{
          --panel: rgba(17,24,39,.80);
          --panel2: rgba(15,23,42,.62);
          --stroke: rgba(255,255,255,.12);
          --stroke2: rgba(255,255,255,.16);
          --text: rgba(255,255,255,.92);
          --muted: rgba(255,255,255,.68);
          --shadow: 0 34px 95px rgba(0,0,0,.70);
          --radius: 18px;
          --dangerA:#ef4444;
          --dangerB:#b91c1c;
        }

        .dm *{ font-family: 'Inter', sans-serif; }

        .dmOverlay{
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,.62);
          display:flex;
          align-items:center;
          justify-content:center;
          padding: 18px;
          z-index: 60;
        }

        .dmModal{
          width: min(520px, 100%);
          background: linear-gradient(180deg, var(--panel), var(--panel2));
          border: 1px solid var(--stroke);
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          padding: 18px;
          position: relative;
          overflow: hidden;
        }

        .dmGlow{
          position:absolute;
          inset:-120px;
          background:
            radial-gradient(520px 260px at 20% 0%, rgba(239,68,68,.18), transparent 60%),
            radial-gradient(520px 260px at 90% 0%, rgba(185,28,28,.14), transparent 60%);
          pointer-events:none;
        }

        .dmTitle{
          margin:0;
          font-family:'Poppins', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--text);
          letter-spacing: .3px;
          position: relative;
        }

        .dmDesc{
          margin: 10px 0 0 0;
          color: var(--muted);
          line-height: 1.55;
          font-size: 13px;
          position: relative;
        }

        .dmName{
          color: rgba(255,255,255,.92);
          font-weight: 800;
        }

        .dmActions{
          display:flex;
          gap:10px;
          justify-content:flex-end;
          margin-top: 16px;
          flex-wrap: wrap;
          position: relative;
        }

        .dmBtn{
          border: 0;
          border-radius: 999px;
          padding: 10px 14px;
          cursor: pointer;
          font-weight: 800;
          letter-spacing: .2px;
          transition: transform .08s ease, opacity .15s ease, box-shadow .15s ease;
          user-select:none;
        }

        .dmBtn:active{ transform: translateY(1px); }
        .dmBtn[disabled]{ opacity:.6; cursor:not-allowed; }

        .dmCancel{
          background: rgba(255,255,255,.06);
          border: 1px solid var(--stroke2);
          color: rgba(255,255,255,.86);
        }

        .dmDanger{
          color: white;
          background: linear-gradient(135deg, var(--dangerA), var(--dangerB));
          box-shadow: 0 14px 40px rgba(239,68,68,.20);
        }
      `}</style>

            <div className="dm dmOverlay" role="dialog" aria-modal="true">
                <div className="dmModal">
                    <div className="dmGlow" />

                    <h3 className="dmTitle">Delete course</h3>
                    <p className="dmDesc">
                        Are you sure you want to delete <span className="dmName">{courseName}</span>?
                        This action can’t be undone.
                    </p>

                    <div className="dmActions">
                        <button className="dmBtn dmCancel" onClick={onCancel} disabled={loading}>
                            Cancel
                        </button>
                        <button className="dmBtn dmDanger" onClick={onConfirm} disabled={loading}>
                            {loading ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DeleteCourseModal;