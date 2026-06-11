import React, { useContext, useEffect, useMemo, useState } from "react";
import { MainLanguageContext } from "../context/MainLanguageContext";
import { Modal, Pagination, Table } from "antd";
import { Link } from "react-router-dom";
import { FiActivity, FiArrowUpRight, FiClock, FiEye, FiUser } from "react-icons/fi";
import useGet from "../customHooks/useGet";
import SkeletonActivitiesTable from "./SkeletonActivitiesTable";

const ActivitiesLogs = () => {
  const { mainLanguage } = useContext(MainLanguageContext);
  const [resget, apiMethodGet] = useGet();
  const [datas, setDatas] = useState([]);
  const [openRowData, setOpenRowData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (mainLanguage) {
      apiMethodGet(`activities/adminSideAllLogs/12?page=1`);
    }
  }, [mainLanguage]);

  const onChange = (current) => {
    setCurrentPage(current);
    apiMethodGet(`activities/adminSideAllLogs/10?page=${current}`);
  };

  useEffect(() => {
    if (resget.data) {
      const updatedData = resget?.data?.data?.map((item, index) => ({
        ...item,
        key: `item-${index}`,
      }));
      setDatas(updatedData || []);
    }
  }, [resget.data]);

  const showModal = (item) => {
    setOpenRowData(item);
    setIsModalOpen(true);
  };

  const columns = useMemo(
    () => [
      {
        title: "Activity",
        key: "activity",
        width: 320,
        render: (_, record) => (
          <div className="roles-table__identity">
            <span className="roles-table__icon">
              <FiActivity />
            </span>
            <div>
              <div className="roles-table__primary">{record?.row_identity || "Unknown record"}</div>
              <div className="roles-table__secondary">{record?.table_name || "No table name"}</div>
            </div>
          </div>
        ),
      },
      {
        title: "User",
        key: "user",
        width: 260,
        render: (_, record) => (
          <div className="roles-table__identity">
            <span className="roles-table__icon">
              <FiUser />
            </span>
            <div>
              <div className="roles-table__primary">{record?.user_name || "Unknown user"}</div>
              <div className="roles-table__secondary">{record?.user_email || "No email"}</div>
            </div>
          </div>
        ),
      },
      {
        title: "Action",
        key: "action",
        width: 180,
        render: (_, record) => <span className="roles-table__badge">{record?.action || "Unknown"}</span>,
      },
      {
        title: "Date",
        key: "date",
        width: 220,
        render: (_, record) => (
          <div className="roles-table__identity">
            <span className="roles-table__icon">
              <FiClock />
            </span>
            <div className="roles-table__secondary">{record?.created_at || "No date"}</div>
          </div>
        ),
      },
      {
        title: "Record",
        key: "record",
        width: 120,
        render: (_, record) => <span className="users-table__record">#{record.id}</span>,
      },
      {
        title: "Action",
        key: "view",
        width: 190,
        render: (_, record) => (
          <div className="users-table__actions">
            <Link to="#" onClick={() => showModal(record)} className="users-table__actionLink">
              <FiEye />
              <span>View</span>
            </Link>
            <Link to="#" onClick={() => showModal(record)} className="users-table__actionIcon" aria-label={`Open activity ${record.id}`}>
              <FiArrowUpRight />
            </Link>
          </div>
        ),
      },
    ],
    []
  );

  if (resget.isLoading && !datas?.length) {
    return <SkeletonActivitiesTable title="Activity Logs" columns={6} />;
  }

  return (
    <section className="users-table-page roles-table-page">
      <div className="users-table-page__top bg-white rounded-3xl p-4 flex justify-between items-center gap-4">
        <div>
          <h6 className="text-[1rem] mb-2 relative font-Mluvka capitalize">
            <span>{resget.data?.pagination?.total ?? datas?.length ?? 0}</span> Activity Logs
          </h6>
          <p className="users-table-page__subtitle">
            Track admin-side updates in a cleaner table view with quick access to record-level changes.
          </p>
        </div>
      </div>

      <div className="users-table-page__panel">
        <div className="users-table-page__stats">
          <article>
            <span>Total logs</span>
            <strong>{resget.data?.pagination?.total ?? datas?.length ?? 0}</strong>
          </article>
          <article>
            <span>Visible on page</span>
            <strong>{Array.isArray(datas) ? datas.length : 0}</strong>
          </article>
          <article>
            <span>Tracked tables</span>
            <strong>{Array.isArray(datas) ? new Set(datas.map((item) => item.table_name).filter(Boolean)).size : 0}</strong>
          </article>
        </div>

        <div className="users-table-page__tableWrap">
          <Table
            rowKey={(record) => record.key || record.id}
            scroll={{ x: 1180 }}
            dataSource={Array.isArray(datas) ? datas : []}
            columns={columns}
            pagination={false}
          />
        </div>

        {(datas?.length !== 0 || !resget?.error) && (
          <div className="mt-4">
            <Pagination
              onChange={onChange}
              current={currentPage}
              total={resget.data?.pagination?.total}
              pageSize={10}
              showSizeChanger={false}
            />
          </div>
        )}
      </div>

      {openRowData && (
        <Modal
          width={"70%"}
          title={openRowData?.user_name || "Activity Details"}
          open={isModalOpen}
          onOk={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
        >
          <div className="venderview">
            <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1">
              <div className="venderview py-2 px-3 bg-[#ddd] rounded-md">
                <label><b>Id</b>: </label>
                <span>{openRowData.id}</span>
              </div>
              <div className="venderview py-2 px-3 bg-[#ddd] rounded-md">
                <label><b>Email</b>: </label>
                <span>{openRowData.user_email}</span>
              </div>
              <div className="venderview py-2 px-3 bg-[#ddd] rounded-md">
                <label><b>Identity</b>: </label>
                <span>{openRowData.row_identity}</span>
              </div>
              <div className="venderview py-2 px-3 bg-[#ddd] rounded-md">
                <label><b>Table Name</b>: </label>
                <span>{openRowData.table_name}</span>
              </div>
              <div className="venderview py-2 px-3 bg-[#ddd] rounded-md">
                <label><b>Updated</b>: </label>
                <span>{openRowData.action}</span>
              </div>
              <div className="venderview py-2 px-3 bg-[#ddd] rounded-md">
                <label><b>Date</b>: </label>
                <span>{openRowData.created_at}</span>
              </div>
            </div>
            <div className="venderview mt-4 py-2 px-3 bg-[#ddd] rounded-md overflow-auto">
              <label><b>Changes</b>: </label>
              <pre className="whitespace-pre-wrap break-words">{JSON.stringify(openRowData?.changes, null, 2)}</pre>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default ActivitiesLogs;
