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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .searchWrapper {
          position: relative;
          width: 100%;
          max-width: 1200px;
          margin-bottom: 26px;
          z-index: 10;
          padding-left: 36px;
          padding-right: 36px;
          box-sizing: border-box;
        }

        .search {
          width: 100%;
          padding: 16px 54px 16px 20px;
          font-size: 1.05rem;

          background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04));
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);

          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 999px;

          outline: none;
          color: rgba(255,255,255,.92);

          box-shadow: 0 14px 36px rgba(0,0,0,0.22);
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }

        .search:focus {
          background: linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.05));
          border-color: rgba(99,102,241,.40);
          box-shadow: 0 18px 44px rgba(0,0,0,0.28), 0 0 0 4px rgba(99,102,241,.14);
        }

        .search::placeholder { color: rgba(255,255,255,0.60); }

        .clearSearch {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: calc(18px + 36px);

          width: 36px;
          height: 36px;
          border-radius: 999px;

          display:flex;
          align-items:center;
          justify-content:center;

          font-size: 1.05rem;
          color: rgba(255,255,255,.92);
          cursor: pointer;

          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.14);

          opacity: 0.85;
          transition: opacity 0.2s, transform 0.12s, background 0.2s, border-color 0.2s;
          user-select:none;
        }

        .clearSearch:hover {
          opacity: 1;
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.22);
          transform: translateY(-50%) scale(1.02);
        }

        .clearSearch:active {
          transform: translateY(-50%) scale(0.98);
        }

        @media (max-width: 640px) {
          .searchWrapper { padding-left: 24px; padding-right: 24px; }
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