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

  .dm * { font-family: 'Inter', sans-serif; }

  .dmOverlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 18px;
    z-index: 60;
    animation: fadeIn 0.2s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .dmModal {
    width: min(520px, 100%);
    background: rgba(17, 25, 40, 0.6);
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 48px;
    box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.6), inset 0 1px 2px rgba(255,255,255,0.05);
    padding: 24px;
    position: relative;
    overflow: hidden;
    animation: slideUp 0.2s ease-out;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .dmGlow {
    position: absolute;
    inset: -120px;
    background: radial-gradient(520px 260px at 20% 0%, rgba(239,68,68,0.15), transparent 60%);
    pointer-events: none;
  }

  .dmTitle {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    font-weight: 700;
    background: linear-gradient(135deg, #f87171, #ef4444);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.02em;
    position: relative;
  }

  .dmDesc {
    margin: 10px 0 0 0;
    color: #94a3b8;
    line-height: 1.55;
    font-size: 13px;
    position: relative;
  }

  .dmName {
    color: #fff;
    font-weight: 700;
  }

  .dmActions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin-top: 16px;
    flex-wrap: wrap;
    position: relative;
  }

  .dmBtn {
    border: 0;
    border-radius: 999px;
    padding: 10px 14px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s ease;
    user-select: none;
  }
  .dmBtn:active { transform: translateY(1px); }
  .dmBtn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .dmCancel {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #e2e8f0;
  }
  .dmCancel:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
  }

  .dmDanger {
    color: #fff;
    background: linear-gradient(135deg, #ef4444, #b91c1c);
    box-shadow: 0 10px 25px -8px rgba(239, 68, 68, 0.4);
  }
  .dmDanger:hover:not(:disabled) {
    background: linear-gradient(135deg, #f87171, #dc2626);
    transform: translateY(-2px);
    box-shadow: 0 15px 30px -8px rgba(239, 68, 68, 0.5);
  }
`}</style>

            <div className="dm dmOverlay" role="dialog" aria-modal="true">
                <div className="dmModal">
                    <div className="dmGlow"/>

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