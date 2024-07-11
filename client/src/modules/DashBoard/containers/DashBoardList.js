import React from "react";
import { useDashBoard } from "..";
import { BasicTable } from "Shared";
import { useImmer } from "use-immer";
import { useAuth } from "master";

export const DashBoardList = () => {
  const [moadal, setModal] = useImmer({
    isEdit: false,
    id: null,
  });
  const {
    query,
    page,
    setPage,
    handleInputChange,
    onInputChange,
    single,
    createSingleData,
    updateSingleData,
    deleteSingleData,
    modalClose,
  } = useDashBoard({
    load: true,
    id: moadal.id,
  });

  const { logoutFn, logoutFromAllFn } = useAuth();

  const { data, isLoading } = !!query && query;

  const {
    data: dashBoadList,
    pageNo,
    pageSize,
    totalCount,
    totalPages,
  } = !!data && data;

  const ActionButtons = ({ row }) => {
    const id = row.original._id;
    return (
      <>
        <button
          className="btn"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => {
            setModal((draft) => {
              draft.isEdit = true;
              draft.id = id;
            });
          }}
        >
          ✏️
        </button>
        <button onClick={() => deleteSingleData.mutate(id)} className="btn">
          🗑️
        </button>
      </>
    );
  };

  const columns = [
    { header: "Name", accessorKey: "name" },

    {
      header: "Description",
      accessorKey: "description",
    },
    { header: "Price", accessorKey: "price" },
    {
      header: "Actions",
      accessorKey: "_id",
      cell: ActionButtons,
    },
  ];

  const addItem = () => {
    createSingleData.mutate(single);
  };

  const updateItem = () => {
    updateSingleData.mutate({ id: moadal.id, payload: single });
  };

  return (
    <div>
      <div className="d-flex justify-content-end me-3 mt-3">
        <button
          className="btn btn-outline-danger me-2"
          onClick={() => logoutFn()}
        >
          Logout
        </button>
        <button
          className="btn btn-outline-danger"
          onClick={() => logoutFromAllFn()}
        >
          Logout from all device
        </button>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="container">
          <h1>DashBoard Table</h1>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-primary my-2"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => {
                setModal((draft) => {
                  draft.isEdit = false;
                  draft.id = null;
                });
              }}
            >
              Add New
            </button>
          </div>
          <BasicTable
            columns={columns}
            data={dashBoadList}
            totalPages={totalPages}
            totalCount={totalCount}
            pageIndex={pageNo}
            pageSize={pageSize}
            page={page}
            setPage={setPage}
            handleInputChange={handleInputChange}
          />
        </div>
      )}
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        data-bs-backdrop="static"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {moadal.isEdit ? "Edit Item" : "Add New Item"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="modal-close-btn"
                onClick={modalClose}
              ></button>
            </div>
            <div className="modal-body">
              <>
                <div className="mb-3">
                  <label for="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={single.name}
                    id="name"
                    name="name"
                    placeholder="Enter name"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label for="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="3"
                    name="description"
                    value={single.description}
                    placeholder="Enter description"
                    onChange={(e) => onInputChange(e)}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label for="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    placeholder="Enter price"
                    name="price"
                    value={single.price}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={moadal.isEdit ? updateItem : addItem}
              >
                {moadal.isEdit ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
