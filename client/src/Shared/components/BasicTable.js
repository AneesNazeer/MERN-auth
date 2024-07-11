import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import React from "react";

export const BasicTable = ({
  columns,
  data,
  totalPages,
  totalCount,
  page,
  setPage,
  handleInputChange,
}) => {
  const { pageNo, pageSize, searchTerm } = page;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    initialState: {
      pageIndex: pageNo,
      pageSize: pageSize,
    },
  });

  const startDataIndex = pageNo - 1;
  const startCount = startDataIndex * pageSize + 1;

  return (
    <div className="w3-container">
      <div className="table-footer">
        <select
          value={pageSize}
          onChange={(e) => {
            setPage((draft) => {
              draft.pageSize = Number(e.target.value);
              draft.pageNo = 1;
              return draft;
            });
          }}
        >
          {[1, 2, 5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
          <option key={totalCount} value={totalCount}>
            Show All
          </option>
        </select>
        <div className="table-footer">
          {searchTerm.length > 0 && (
            <div>
              Showing results for :- {searchTerm}{" "}
              <button
                onClick={() =>
                  setPage((draft) => {
                    draft.searchTerm = "";
                    return draft;
                  })
                }
              >
                🗑️
              </button>
            </div>
          )}
          <input
            type="search"
            onChange={(e) => handleInputChange(e.target.value)}
          />
        </div>
      </div>
      <table className="w3-table-all my-2">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-buttons table-footer">
        <div className="table-pagination-label">{`Showing ${startCount} to ${
          startCount + table.getRowModel().rows.length - 1
        } of ${totalCount} entries`}</div>
        <div>
          <button
            disabled={pageNo === 1}
            onClick={() =>
              setPage((draft) => {
                draft.pageNo = 1;
                return draft;
              })
            }
          >
            1️⃣
          </button>
          <button
            disabled={pageNo <= 1}
            onClick={() =>
              setPage((draft) => {
                draft.pageNo = draft.pageNo - 1;
                return draft;
              })
            }
          >
            ⏮️
          </button>
          <button
            disabled={pageNo >= totalPages}
            onClick={() =>
              setPage((draft) => {
                draft.pageNo = draft.pageNo + 1;
                return draft;
              })
            }
          >
            ⏭️
          </button>
          <button
            disabled={pageNo === totalPages}
            onClick={() =>
              setPage((draft) => {
                draft.pageNo = totalPages;
                return draft;
              })
            }
          >
            🔚
          </button>
        </div>
      </div>
    </div>
  );
};
