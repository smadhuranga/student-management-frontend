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
        .modalOverlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.3);
          backdrop-filter: blur(12px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .modal {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 48px;
          padding: 40px;
          max-width: 420px;
          width: 90%;
          box-shadow: 0 40px 80px rgba(0,0,0,0.5);
          color: white;
        }

        .modalTitle {
          font-size: 2rem;
          font-weight: 600;
          margin-top: 0;
          margin-bottom: 16px;
        }

        .modalText {
          font-size: 1.1rem;
          margin-bottom: 32px;
          line-height: 1.6;
          color: rgba(255,255,255,0.9);
        }

        .modalActions {
          display: flex;
          justify-content: flex-end;
          gap: 16px;
        }

        .modalCancelBtn {
          padding: 14px 28px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 40px;
          font-size: 1rem;
          font-weight: 500;
          color: white;
          cursor: pointer;
          transition: all 0.2s;
        }

        .modalCancelBtn:hover { background: rgba(255,255,255,0.2); }

        .modalConfirmBtn {
          padding: 14px 32px;
          background: linear-gradient(145deg, #e74c3c, #c0392b);
          border: none;
          border-radius: 40px;
          font-size: 1rem;
          font-weight: 600;
          color: white;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 10px 20px rgba(231,76,60,0.3);
        }

        .modalConfirmBtn:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(231,76,60,0.5);
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