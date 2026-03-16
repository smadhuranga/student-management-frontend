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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700&display=swap');

        .modalOverlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px;
          z-index: 1000;
          animation: fadeIn 0.2s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal {
          width: min(520px, 100%);
          background: rgba(17, 25, 40, 0.6);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 48px;
          padding: 28px;
          box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.6), inset 0 1px 2px rgba(255,255,255,0.05);
          color: #fff;
          animation: slideUp 0.2s ease-out;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .modalTitle {
          font-family: 'Poppins', sans-serif;
          font-size: 1.6rem;
          font-weight: 700;
          margin: 0 0 10px 0;
          background: linear-gradient(135deg, #f87171, #ef4444);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.02em;
        }

        .modalText {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          margin-bottom: 22px;
          line-height: 1.6;
          color: #94a3b8;
        }

        .modalText strong {
          color: #fff;
        }

        .modalActions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          flex-wrap: wrap;
        }

        .modalCancelBtn {
          padding: 12px 18px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 999px;
          font-size: 0.98rem;
          font-weight: 600;
          color: #e2e8f0;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .modalCancelBtn:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-2px);
        }

        .modalConfirmBtn {
          padding: 12px 20px;
          background: linear-gradient(135deg, #ef4444, #b91c1c);
          border: none;
          border-radius: 999px;
          font-size: 0.98rem;
          font-weight: 800;
          color: white;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 10px 25px -8px rgba(239, 68, 68, 0.4);
        }
        .modalConfirmBtn:hover {
          background: linear-gradient(135deg, #f87171, #dc2626);
          transform: translateY(-2px);
          box-shadow: 0 15px 30px -8px rgba(239, 68, 68, 0.5);
        }

        .modalConfirmBtn:active,
        .modalCancelBtn:active {
          transform: translateY(0);
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