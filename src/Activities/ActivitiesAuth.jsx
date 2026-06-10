import React, { useContext, useEffect, useState } from "react";
import { MainLanguageContext } from "../context/MainLanguageContext";
import { Modal, Pagination, Space, Table } from "antd";
import useGet from "../customHooks/useGet";
import { Link } from "react-router-dom";

const ActivitiesAuth = () => {
  const { mainLanguage } = useContext(MainLanguageContext);
  const [resget, apiMethodGet] = useGet();
  const [datas, setDatas] = useState();
    const [openRowData, setOpenRowData] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (mainLanguage) {
      apiMethodGet(`activities/authHistory/12?page=1`);
    }
  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  const onChange = (current, pageSize) => {
    setCurrentPage(current);
    apiMethodGet(`activities/authHistory/10?page=${current}`);
  };

  useEffect(() => {
    if (resget.data) {
      const updatedData = resget?.data?.data?.map((item, index) => ({
        ...item,
        key: `item-${index}`, // Add a unique key to each object
      }));
      setDatas(updatedData);
    }
  }, [resget.data]);


    const showModal = (item) => {
    setOpenRowData(item)
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "User",
   render: (_, record) => (
              <>
              <div>{record?.user_name}</div>
              <div>{record?.user_email}</div>
              </>
            ),
  },
  {
    title: "Updated",
    dataIndex: "action", // example field
    key: "action",
  },
  {
    title: "Date",
    dataIndex: "created_at", // example field
    key: "created_at",
  },
];
  
  return (
    <div className="pr-10">
      <h2 className="font-Mluvka text-[1.938rem] max-lg:text-[1.1rem] mb-2">
        Activities Auth
      </h2>
      <div className="relative">
        {resget.isLoading ? (
          ""
        ) : (
          <div>
            <div className="bookingPagepagination overflow-auto">
              <Table
                scroll={{ x: 1300 }}
                dataSource={datas}
                columns={columns}
              />
            </div>

            {(datas?.length !== 0 || !resget?.error) && (
              <div className="my-4">
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
        )}
      </div>
    </div>
  );
};

export default ActivitiesAuth;
