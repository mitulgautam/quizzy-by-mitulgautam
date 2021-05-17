/* eslint-disable arrow-parens */
import React, { useState, useEffect } from "react";
import { tableColumns } from "./columns";
import { useTable } from "react-table";
import { useHistory } from "react-router-dom";

const QuizList = ({
  quizzes,
  modalIsOpen,
  setModalIsOpen,
  setSelectedQuizID,
}) => {
  const data = React.useMemo(() => quizzes, [quizzes]);
  const columns = React.useMemo(() => tableColumns, []);
  const tableInstance = useTable({ columns, data });
  const { getTableBodyProps, getTableProps, headerGroups, rows, prepareRow } =
    tableInstance;
  const history = useHistory();

  const _handleDeleteQuiz = (row) => {
    setSelectedQuizID(row.original.id);
    setModalIsOpen(true);
  };

  return (
    <div>
      {quizzes.length === 0 ? (
        <div className="mx-auto text-xl text-gray-700">
          You have not created any quiz.
        </div>
      ) : (
        <div>
          <table className="h-auto w-11/12 m-0 md:m-8" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup, i) => {
                <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, i) => {
                    <th key={i} {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>;
                  })}
                </tr>;
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
                          <button
                            className="hover:bg-gray-200 w-full py-1 px-4"
                            onClick={() => {
                              history.push(`/quiz/${row.original.id}`);
                            }}
                          >
                            <div className="text-2xl font-medium text-gray-700 overflow-ellipsis">
                              <div className="flex flex-row">
                                <div className="flex w-3/4">
                                  {cell.render("Cell")}
                                </div>
                                <div className="pl-4">
                                  <button
                                    onClick={() => {
                                      history.push(
                                        `/update-quiz/${row.original.id}`
                                      );
                                    }}
                                    className=" hover:bg-gray-200 text-blue-800 font-medium px-4 rounded inline-flex items-center"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-6 w-6"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                      />
                                    </svg>
                                    <span>Edit</span>
                                  </button>
                                </div>
                                <div className="pl-4">
                                  <button
                                    onClick={() => _handleDeleteQuiz(row)}
                                    className=" hover:bg-gray-200 text-red-800 font-medium px-4 rounded inline-flex items-center"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-6 w-6"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      />
                                    </svg>
                                    <span>Delete</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default QuizList;
