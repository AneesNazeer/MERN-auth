import { Axios } from "utils";

export const getDashBoardList = async (payload) => {
  const { pageNo, pageSize, searchTerm } = payload;

  const res = await Axios.get(
    `dashboard/items?pageNo=${pageNo}&pageSize=${pageSize}&searchTerm=${searchTerm}`
  );
  return res.data;
};

export const createDashBoardList = async (payload) => {
  const res = await Axios.post("dashboard/items/", payload);
  return res.data;
};

export const getDashBoardListItem = async (id) => {
  const res = await Axios.get(`dashboard/items/${id}`);
  return res.data;
};

export const putDashBoardListItem = async ({ id, payload }) => {
  const res = await Axios.put(`dashboard/items/${id}`, payload);
  return res.data;
};

export const deletedItemDashBoardListItem = async (id) => {
  const res = await Axios.delete(`dashboard/items/${id}`);
  return res.data;
};
