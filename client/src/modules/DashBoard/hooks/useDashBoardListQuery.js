import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getDashBoardList, GET_DASHBOARD_LIST } from "..";
import { useImmer } from "use-immer";

export const useDashBoardListQuery = ({ load = false }) => {
  const [page, setPage] = useImmer({
    pageNo: 1,
    pageSize: 10,
    searchTerm: "",
  });

  return {
    query: useQuery({
      queryKey: [GET_DASHBOARD_LIST, page],
      queryFn: () => getDashBoardList(page),
      enabled: load,
    }),
    page,
    setPage,
  };
};
