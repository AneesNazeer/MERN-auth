import React, { useEffect } from "react";
import { useDashBoardListQuery } from ".";
import { useImmer } from "use-immer";
import { debounceFunction, errorFormatter, successMessage } from "utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GET_DASHBOARD_LIST,
  createDashBoardList,
  deletedItemDashBoardListItem,
  getDashBoardListItem,
  putDashBoardListItem,
} from "..";

export const useDashBoard = ({ load = false, id = null }) => {
  const queryClient = useQueryClient();
  const init = {
    name: "",
    description: "",
    price: "",
  };
  const [single, setSingle] = useImmer(init);

  const { query, page, setPage } = useDashBoardListQuery({ load });
  const getProgramById = useQuery({
    queryKey: ["GET_PROGRAM_BY_ID", id],
    queryFn: () => getDashBoardListItem(id),
    enabled: load && !!id,
  });

  const { data } = !!getProgramById && getProgramById;

  useEffect(() => {
    setSingle((draft) => {
      draft.name = data?.name;
      draft.description = data?.description;
      draft.price = data?.price;
      return draft;
    });
  }, [data]);

  const handleInputChange = debounceFunction((e) => {
    if (e) {
      setPage((draft) => {
        draft.searchTerm = e;
        draft.pageNo = 1;
      });
    } else {
      setPage((draft) => {
        draft.searchTerm = "";
        draft.pageNo = 1;
      });
    }
  }, 300);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setSingle((draft) => {
      draft[name] = value;
      return draft;
    });
  };

  const createSingleData = useMutation({
    mutationFn: createDashBoardList,
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries([GET_DASHBOARD_LIST, page]);
      document.getElementById("modal-close-btn").click();
    },
    onError: (e) => {
      errorFormatter(e);
    },
  });

  const updateSingleData = useMutation({
    mutationFn: putDashBoardListItem,
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries([GET_DASHBOARD_LIST, page]);
      document.getElementById("modal-close-btn").click();
    },
    onError: (e) => {
      errorFormatter(e);
    },
  });

  const deleteSingleData = useMutation({
    mutationFn: deletedItemDashBoardListItem,
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries([GET_DASHBOARD_LIST, page]);
    },
    onError: (e) => {
      errorFormatter(e);
    },
  });

  const modalClose = () => {
    setSingle(init);
  };

  return {
    query,
    page,
    setPage,
    single,
    onInputChange,
    handleInputChange,
    createSingleData,
    updateSingleData,
    deleteSingleData,
    modalClose,
  };
};
