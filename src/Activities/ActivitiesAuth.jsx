import React, { useContext, useEffect, useMemo, useState } from "react";
import { MainLanguageContext } from "../context/MainLanguageContext";
import { Pagination, Table } from "antd";
import { FiClock, FiLogIn, FiUser } from "react-icons/fi";
import useGet from "../customHooks/useGet";
import SkeletonActivitiesTable from "./SkeletonActivitiesTable";
import ListPageHero from "../components/ListPageHero";

const ActivitiesAuth = () => {
  const { mainLanguage } = useContext(MainLanguageContext);
  const [resget, apiMethodGet] = useGet();
  const [datas, setDatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (mainLanguage) {
      apiMethodGet(`activities/authHistory/12?page=1`);
    }
  }, [mainLanguage]);

  const onChange = (current) => {
    setCurrentPage(current);
    apiMethodGet(`activities/authHistory/10?page=${current}`);
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

  const columns = useMemo(
    () => [
      {
        title: "User",
        key: "user",
        width: 320,
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
        title: "Auth Action",
        key: "action",
        width: 220,
        render: (_, record) => (
          <div className="roles-table__identity">
            <span className="roles-table__icon">
              <FiLogIn />
            </span>
            <div>
              <div className="roles-table__primary">{record?.action || "Unknown"}</div>
              <div className="roles-table__secondary">Authentication event</div>
            </div>
          </div>
        ),
      },
      {
        title: "Date",
        key: "date",
        width: 240,
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
    ],
    []
  );

  if (resget.isLoading && !datas?.length) {
    return <SkeletonActivitiesTable title="Auth Activities" columns={4} />;
  }

  return (
    <section className="users-table-page roles-table-page">
      <ListPageHero
        title="Auth Activities"
        count={resget.data?.pagination?.total ?? datas?.length ?? 0}
        subtitle="Review authentication history in the same cleaner table layout used across the refreshed admin pages."
        stats={[
          { label: 'Total auth logs', value: resget.data?.pagination?.total ?? datas?.length ?? 0 },
          { label: 'Visible on page', value: Array.isArray(datas) ? datas.length : 0 },
          { label: 'Unique users', value: Array.isArray(datas) ? new Set(datas.map((item) => item.user_email).filter(Boolean)).size : 0 },
        ]}
      />

      <div className="users-table-page__panel">
        <div className="users-table-page__tableWrap">
          <Table
            rowKey={(record) => record.key || record.id}
            scroll={{ x: 920 }}
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
    </section>
  );
};

export default ActivitiesAuth;
