import React from "react";

type Props = {
    show: boolean;
    studentName: string;
    onCancel: () => void;
    onConfirm: () => void;
};

const DeleteConfirmModal: React.FC<Props> = ({show, studentName, onCancel, onConfirm}) => {
    if (!show) return null;

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700&display=swap');

        .modalOverlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;

          background: rgba(0,0,0,0.40);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);

          display: flex;
          justify-content: center;
          align-items: center;

          z-index: 1000;
          animation: fadeIn 0.18s ease;
          padding: 18px;
          box-sizing: border-box;
        }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .modal {
          width: 100%;
          max-width: 460px;

          background: linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.06));
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);

          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 28px;

          padding: 28px;

          box-shadow: 0 40px 90px rgba(0,0,0,0.55);
          color: rgba(255,255,255,.92);
        }

        .modalTitle {
          font-family: 'Poppins', sans-serif;
          font-size: 1.6rem;
          font-weight: 700;
          margin-top: 0;
          margin-bottom: 10px;
          letter-spacing: -0.01em;
        }

        .modalText {
          font-family: 'Inter', sans-serif;
          font-size: 1.05rem;
          margin-bottom: 22px;
          line-height: 1.6;
          color: rgba(255,255,255,0.86);
        }

        .modalActions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          flex-wrap: wrap;
        }

        .modalCancelBtn {
          padding: 12px 18px;

          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 999px;

          font-size: 0.98rem;
          font-weight: 700;
          color: rgba(255,255,255,.92);

          cursor: pointer;
          transition: transform 0.12s ease, background 0.18s ease, border-color 0.18s ease;
        }

        .modalCancelBtn:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.22);
          transform: translateY(-1px);
        }

        .modalConfirmBtn {
          padding: 12px 20px;

          background: linear-gradient(135deg, rgba(239,68,68,0.95), rgba(185,28,28,0.95));
          border: none;
          border-radius: 999px;

          font-size: 0.98rem;
          font-weight: 800;
          color: white;

          cursor: pointer;
          transition: transform 0.12s ease, filter 0.18s ease, box-shadow 0.18s ease;
          box-shadow: 0 14px 30px rgba(239,68,68,0.22);
        }

        .modalConfirmBtn:hover {
          transform: translateY(-1px);
          filter: brightness(1.04);
          box-shadow: 0 18px 42px rgba(239,68,68,0.28);
        }

        .modalConfirmBtn:active,
        .modalCancelBtn:active {
          transform: translateY(0px);
        }
      `}</style>

            <div className="modalOverlay" onClick={onCancel}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <h3 className="modalTitle">Confirm Deletion</h3>
                    <p className="modalText">
                        Are you sure you want to delete <strong>{studentName}</strong>? This action cannot be undone.
                    </p>
                    <div className="modalActions">
                        <button className="modalCancelBtn" onClick={onCancel}>Cancel</button>
                        <button className="modalConfirmBtn" onClick={onConfirm}>Delete</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DeleteConfirmModal;