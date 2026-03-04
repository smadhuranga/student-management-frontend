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
        .searchWrapper {
          position: relative;
          width: 100%;
          max-width: 1200px;
          margin-bottom: 30px;
          z-index: 10;
          padding-left: 36px;
          padding-right: 36px;
          box-sizing: border-box;
        }

        .search {
          width: 100%;
          padding: 18px 30px;
          font-size: 1.1rem;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 60px;
          outline: none;
          color: white;
          box-shadow: 0 8px 25px rgba(0,0,0,0.2);
          transition: all 0.3s;
          box-sizing: border-box;
        }

        .search:focus {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.3);
          box-shadow: 0 12px 30px rgba(0,0,0,0.3);
        }

        .search::placeholder { color: rgba(255,255,255,0.6); }

        .clearSearch {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.2rem;
          color: white;
          cursor: pointer;
          opacity: 0.7;
          transition: opacity 0.2s;
          right: calc(25px + 36px);
        }

        .clearSearch:hover { opacity: 1; }

        @media (max-width: 640px) {
          .searchWrapper { padding-left: 24px; padding-right: 24px; }
          .clearSearch { right: calc(25px + 24px); }
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