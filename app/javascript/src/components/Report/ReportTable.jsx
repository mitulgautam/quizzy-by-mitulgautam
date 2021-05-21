/* eslint-disable arrow-parens */
import React, { useEffect, useState } from "react";
import { tableColumns } from "./columns";
import { useTable } from "react-table";
import Logger from "js-logger";

const ReportTable = ({ report }) => {
  const data = React.useMemo(() => report, []);
  const columns = React.useMemo(() => tableColumns, []);
  const tableInstance = useTable({ columns, data });
  const { getTableBodyProps, getTableProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="flex flex-col">
      {
        <div>
          <table className="h-auto w-11/12 m-0 md:m-8" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup, i) => {
                return (
                  <tr
                    className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
                    key={i}
                    {...headerGroup.getHeaderGroupProps()}
                  >
                    {headerGroup.headers.map((column, i) => {
                      return (
                        <th
                          className="py-3 px-6 text-left"
                          key={i}
                          {...column.getHeaderProps()}
                        >
                          {column.render("Header")}
                        </th>
                      );
                    })}
                  </tr>
                );
              })}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr key={i} {...row.getRowProps()}>
                    {row.cells.map((cell, i) => {
                      return (
                        <td key={i} {...cell.getCellProps()}>
                          <div className="text-gray-700 overflow-ellipsis px-6">
                            <div className="flex flex-row">
                              <div className="flex w-3/4">
                                {cell.render("Cell")}
                              </div>
                            </div>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      }
    </div>
  );
};

export default ReportTable;
