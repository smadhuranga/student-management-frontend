import React from "react";

type Props = {
    search: string;
    onSearchChange: (value: string) => void;
    onClear: () => void;
};

const StudentsSearchBar: React.FC<Props> = ({search, onSearchChange, onClear}) => {
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        .searchWrapper {
          position: relative;
          width: 100%;
          max-width: 1200px;
          margin-bottom: 26px;
          z-index: 10;
          padding: 0 36px;
          box-sizing: border-box;
        }

        .search {
          width: 100%;
          padding: 16px 54px 16px 24px;
          font-size: 1rem;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 999px;
          outline: none;
          color: #fff;
          box-shadow: 0 10px 25px -8px rgba(0, 0, 0, 0.4);
          transition: all 0.2s ease;
        }
        .search:focus {
          border-color: #60a5fa;
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 15px 30px -8px rgba(0, 0, 0, 0.5), 0 0 0 4px rgba(96, 165, 250, 0.15);
        }
        .search::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .clearSearch {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: calc(18px + 36px);
          width: 36px;
          height: 36px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          color: #e2e8f0;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.2s ease;
          user-select: none;
        }
        .clearSearch:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-50%) scale(1.05);
        }
        .clearSearch:active {
          transform: translateY(-50%) scale(0.98);
        }

        @media (max-width: 640px) {
          .searchWrapper { padding: 0 24px; }
          .clearSearch { right: calc(18px + 24px); }
        }
      `}</style>

            <div className="searchWrapper">
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="search"
                />
                {search && (
                    <span className="clearSearch" onClick={onClear}>
            ✕
          </span>
                )}
            </div>
        </>
    );
};

export default StudentsSearchBar;